import BusinessBar from "@/components/profile/BusinessBar";
import Footer from "@/components/reusable-ui/Footer";
import BusinessProfileForm from "@/components/profile/BusinessProfileForm";
import PersonalBar from "@/components/profile/PersonalBar";
import PersonalProfileForm from "@/components/profile/PersonalProfileForm";
import { DashboardMainNavClient } from "@/components/navs/DashboardMainNavClient";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (<p>
      Data fetch failed.
    </p>)
  }
  const userData = {
        email: session?.user?.email,
        firstName: session?.user?.firstName,
        lastName: session?.user?.lastName,
        roles: session?.user?.roles,
        token: session.sessionToken,
      }

  return (
    <>
      <DashboardMainNavClient userData={userData} />
      {userData?.roles === "Personal Profile" ? (
        <>
          <PersonalBar />
          <PersonalProfileForm userData={userData} />
        </>
      ) : (
        <>
          <BusinessBar />
          <BusinessProfileForm userData={userData} />
        </>
      )}
      <Footer />
    </>
  );
}

export default page;
