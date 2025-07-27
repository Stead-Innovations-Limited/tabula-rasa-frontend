export const dynamic = "force-dynamic";

import DashboardBanner from "@/components/dashboard/DashboardBanner";
import { authOptions } from "@/lib/auth";
import { User } from "@/lib/types";
import getPractitioners from "@/server-actions/getPractitioners";
import { getServerSession } from "next-auth";
import PracticionersContainerWrapper from "@/components/practicioners/PractitionersContainerWrapper";

export default async function page() {
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
    <>
      <DashboardBanner />
      <PracticionersContainerWrapper practitioners={filteredUsers} />
    </>
  )
}