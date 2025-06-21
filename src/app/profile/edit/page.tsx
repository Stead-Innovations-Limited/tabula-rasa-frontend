import AuthNavNoSearch from "@/components/navs/AuthNavNoSearch";
// import BusinessBar from "@/components/profile/BusinessBar";
import Footer from "@/components/reusable-ui/Footer";
// import BusinessProfileForm from "@/components/profile/BusinessProfileForm";
import PersonalBar from "@/components/profile/PersonalBar";
import PersonalProfileForm from "@/components/profile/PersonalProfileForm";

function page() {
  return (
    <>
      <AuthNavNoSearch />
      <PersonalBar />
      <PersonalProfileForm />
      <Footer />
    </>
  );
}

export default page;
