import NavBarSearch from "@/components/navs/NavBarSearch";
import DashboardNav from "@/components/navs/DashboardNav";
import Footer from "@/components/reusable-ui/Footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Layout({
  children,
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
      <NavBarSearch userData={userData} />
      <DashboardNav />
      {children}
      <Footer />
    </>
  );
}
