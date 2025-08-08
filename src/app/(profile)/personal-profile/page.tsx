export const dynamic = "force-dynamic";

import Footer from "@/components/reusable-ui/Footer";
import PersonalBar from "@/components/profile/PersonalBar";
import PersonalProfileForm from "@/components/profile/PersonalProfileForm";
import NavBarNoSearch from "@/components/navs/NavBarNoSearch";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Failed to fetch page")
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
  if (userData.roles !== "Personal Account") redirect("/business-profile");
  return (
    <>
      <NavBarNoSearch />
      <PersonalBar />
      <PersonalProfileForm userData={userData} />
      <Footer />
    </>
  );
}

export default page;
