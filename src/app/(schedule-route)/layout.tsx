"use client"
import FullUserNavBarSearch from "@/components/navs/FullUserNavBarSearch";
import UserDashboardMenu from "@/components/Menus/UserDashboardMenu";

import Footer from "@/components/reusable-ui/Footer";
import ScheduleBar from "@/components/schedule/ScheduleBar";

export default function Layout({
   children
}: {
   children: React.ReactNode;
}) {
  return (
    <>
      <FullUserNavBarSearch renderMenu={(blur) => <UserDashboardMenu blur={blur}/>}/>
      <ScheduleBar />
      {children}
      <Footer />
    </>
  );
}
