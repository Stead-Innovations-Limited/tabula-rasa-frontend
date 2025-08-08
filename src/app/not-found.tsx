
import NotFoundBar from "@/components/not-found/NotFoundBar";
import NotFoundContainer from "@/components/not-found/NotFoundContainer";
import Footer from "@/components/reusable-ui/Footer";
import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
 
export default function GlobalNotFound() {
  return (
    <>
      <NavBarNoSearch />
      <NotFoundBar />
      <NotFoundContainer />
      <Footer />
    </>
  );
}
