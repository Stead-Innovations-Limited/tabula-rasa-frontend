import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import Footer from "@/components/reusable-ui/Footer";

export default async function Layout({
   children
}: {
   children: React.ReactNode;
}) {
  return (
    <>
      <NavBarNoSearch/>
      {children}
      <Footer />
    </>
  );
}
