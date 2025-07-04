import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import SavedBar from "@/components/saved/SavedBar";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import Footer from "@/components/reusable-ui/Footer";
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Data fetch failed.</p>;
  }
  const userData = {
    email: session?.user?.email,
    firstName: session?.user?.firstName,
    lastName: session?.user?.lastName,
    roles: session?.user?.roles,
    token: session.sessionToken,
  };

  return (
    <>
      <NavBarNoSearch userData={userData}/>
      <SavedBar />
      {children}
      <Footer />
    </>
  );
}
