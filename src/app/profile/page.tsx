import AuthNavNoSearch from "@/components/navs/AuthNavNoSearch";
import BusinessBar from "@/components/profile/BusinessBar";
import Footer from "@/components/reusable-ui/Footer";
import BusinessProfileForm from "@/components/profile/BusinessProfileForm";

function page() {
  return (
    <>
      <AuthNavNoSearch />
      <BusinessBar />
      <BusinessProfileForm />
      <Footer />
    </>
  );
}

export default page;
