import { User } from "@/lib/types";
import getPractitioners from "@/server-actions/getPractitioners";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import PracticionersCards from "../reusable-ui/PracticionersCard";
import { cn } from "@/lib/utils";

export default async function PracticionersContainer() {
  const userProfiles = (await getPractitioners()) as User[] | { error: boolean; errorData?: string; message?: string };
  if(!Array.isArray(userProfiles)) {
    return (
      <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
        {userProfiles.message || "Failed to fetch Practitioners."}
      </div>
    );
  }
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className='flex justify-center items-center my-10 text-center'>
        No Practicioner data available.
      </div>
    );
  }
  const sessionId = session.user.id;

  const filteredUsers = userProfiles.filter((ele) => ele.id !== sessionId);

  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Practicioners</h4>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8",
            filteredUsers.length === 0 && "!grid-cols-1"
          )}
        >
          {/* The Event Cards */}
          {filteredUsers.length > 0 ? (
            filteredUsers.map((data, index) => (
              <PracticionersCards
                key={index}
                userId={data.id}
                // imgUrl={data.imgUrl}
                imgAlt={data.business_name.String}
                name={data.business_name.String}
                specialty={data.field.String}
                // stars={data.stars}
                address={data.address.String}
              />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              No Practicioners available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
