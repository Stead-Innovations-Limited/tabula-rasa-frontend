import DashboardNav from "@/components/navs/DashboardNav";
import FullUserNavBarSearch from "@/components/navs/FullUserNavBarSearch";

import Footer from "@/components/reusable-ui/Footer";
export default async function Layout({
   children
}: {
   children: React.ReactNode;
}) {
  return (
    <>
      <FullUserNavBarSearch />
      <DashboardNav />
      {children}
      <Footer />
    </>
  );
}
