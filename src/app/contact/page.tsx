import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import ContactBar from "@/components/contact/ContactBar"
import ContactContainer from "@/components/contact/ContactContainer"
import Footer from "@/components/reusable-ui/Footer";

function page() {
  return (
    <>
    <NavBarNoSearch />
    <ContactBar />
    <ContactContainer/>
    <Footer />
    </>
  )
}

export default page