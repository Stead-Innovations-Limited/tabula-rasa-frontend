import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import SavedBar from "@/components/saved/SavedBar";

import Footer from "@/components/reusable-ui/Footer";
export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarNoSearch />
      <SavedBar />
      {children}
      <Footer />
    </>
  );
}
