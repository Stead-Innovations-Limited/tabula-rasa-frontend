import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import Footer from "@/components/reusable-ui/Footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Layout({
   children
}: {
   children: React.ReactNode;
}) {
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
      {children}
      <Footer />
    </>
  );
}
