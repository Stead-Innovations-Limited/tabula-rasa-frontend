import DashboardNav from "@/components/navs/DashboardNav";

import Footer from "@/components/reusable-ui/Footer";
import { DashboardMainNavClient } from "@/components/navs/DashboardMainNavClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const userData = session?.user
    ? {
        email: session?.user?.email,
        firstName: session?.user?.firstName,
        lastName: session?.user?.lastName,
        roles: session?.user?.roles,
      }
    : undefined;
  return (
    <>
      <DashboardMainNavClient userData={userData} />
      <DashboardNav />
      {children}
      <Footer />
    </>
  );
}
