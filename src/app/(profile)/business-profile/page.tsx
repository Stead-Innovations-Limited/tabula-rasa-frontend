export const dynamic = "force-dynamic";

import BusinessBar from "@/components/profile/BusinessBar";
import Footer from "@/components/reusable-ui/Footer";
import BusinessProfileForm from "@/components/profile/BusinessProfileForm";
import NavBarNoSearch from "@/components/navs/NavBarNoSearch";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Failed to fetch user details")
  }
  const userData = {
    email: session?.user?.email,
    firstName: session?.user?.firstName,
    lastName: session?.user?.lastName,
    profileImage:
      session?.user?.profileImage ||
      "https://res.cloudinary.com/drlrawk5w/image/upload/v1724100934/profilePic_gxon9j.webp",
    roles: session?.user?.roles,
    field: session?.user?.field || "",
    token: session.sessionToken,
  };

  return (
    <>
      <NavBarNoSearch />
      <BusinessBar />
      <BusinessProfileForm userData={userData} />
      <Footer />
    </>
  );
}

export default page;
