import { User } from "@/lib/types";
import getUsers from "@/server-actions/getUsers";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import PracticionersCards from "../reusable-ui/PracticionersCard";

export default async function PracticionersContainer() {
  const userProfiles = (await getUsers()) as User[];
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8'>
          {/* The Event Cards */}
          {filteredUsers.map((data, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
