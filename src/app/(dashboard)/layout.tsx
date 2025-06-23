"use client"
import DashboardNav from "@/components/navs/DashboardNav";
import FullUserNavBarSearch from "@/components/navs/FullUserNavBarSearch";
import UserDashboardMenu from "@/components/Menus/UserDashboardMenu";

import Footer from "@/components/reusable-ui/Footer";
export default function Layout({
   children
}: {
   children: React.ReactNode;
}) {
  return (
    <>
      <FullUserNavBarSearch renderMenu={(blur) => <UserDashboardMenu blur={blur}/>}/>
      <DashboardNav />
      {children}
      <Footer />
    </>
  );
}
