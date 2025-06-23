"use client";

import FullUserNavBarSearch from "@/components/navs/FullUserNavBarSearch";
import SavedBar from "@/components/saved/SavedBar";
import BusinessDashboardMenu from "@/components/Menus/BusinessDashboardMenu";

import Footer from "@/components/reusable-ui/Footer";
export default function Layout({
   children
}: {
   children: React.ReactNode;
}) {
  return (
    <>
      <FullUserNavBarSearch renderMenu={(blur) => <BusinessDashboardMenu blur={blur}/>} />
      <SavedBar />
      {children}
      <Footer />
    </>
  );
}
