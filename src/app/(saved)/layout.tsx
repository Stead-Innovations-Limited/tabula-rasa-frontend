import FullUserNavBarSearch from "@/components/navs/FullUserNavBarSearch";
import SavedBar from "@/components/saved/SavedBar";

import Footer from "@/components/reusable-ui/Footer";
export default async function Layout({
   children
}: {
   children: React.ReactNode;
}) {
  return (
    <>
      <FullUserNavBarSearch />
      <SavedBar />
      {children}
      <Footer />
    </>
  );
}
