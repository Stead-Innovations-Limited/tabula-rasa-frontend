import InsufficientFundsBar from "@/components/insufficient-funds/InsufficientFundsBar";
import InsufficientFundsContainer from "@/components/insufficient-funds/InsufficientFundsContainer";
import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import Footer from "@/components/reusable-ui/Footer";
export default function page() {
  return (
    <>
      <NavBarNoSearch />
      <InsufficientFundsBar/>
      <InsufficientFundsContainer />
      <Footer />
    </>
  )
}
