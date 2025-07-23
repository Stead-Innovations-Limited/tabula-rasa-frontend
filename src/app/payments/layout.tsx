import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import PaymentsBar from "@/components/payments/PaymentsBar";
import Footer from "@/components/reusable-ui/Footer";
export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarNoSearch />
      <PaymentsBar />
      {children}
      <Footer />
    </>
  );
}
