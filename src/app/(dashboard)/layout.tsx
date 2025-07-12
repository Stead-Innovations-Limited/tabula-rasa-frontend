import NavBarSearch from "@/components/navs/NavBarSearch";
import DashboardNav from "@/components/navs/DashboardNav";
import Footer from "@/components/reusable-ui/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
   

  return (
    <>
      <NavBarSearch />
      <DashboardNav />
      {children}
      <Footer />
    </>
  );
}
