"use client"
import FullUserNavBarSearch from "@/components/navs/FullUserNavBarSearch";
import MyPagesDropMenu from "@/components/Menus/MyPagesDropMenu";

import Footer from "@/components/reusable-ui/Footer";
export default function Layout({
   children
}: {
   children: React.ReactNode;
}) {
  return (
    <>
      <FullUserNavBarSearch renderMenu={(blur) => <MyPagesDropMenu blur={blur}/>}/>
      {children}
      <Footer />
    </>
  );
}
