import NavBarNoSearch from "@/components/navs/NavBarNoSearch";

import Footer from "@/components/reusable-ui/Footer";
import ScheduleBar from "@/components/schedule/ScheduleBar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
     <NavBarNoSearch />
      <ScheduleBar />
      {children}
      <Footer />
    </>
  );
}
