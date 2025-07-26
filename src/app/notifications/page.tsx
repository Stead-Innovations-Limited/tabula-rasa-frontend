import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import NotificationsBar from "@/components/notifications/NotificationsBar";
import NotificationsContainer from "@/components/notifications/NotificationsContainer";
import Footer from "@/components/reusable-ui/Footer";

function page() {
  return (
    <main className='flex flex-col min-h-screen'>
    <NavBarNoSearch />
    <NotificationsBar />
    <NotificationsContainer />
    <Footer />
    </main>
  )
}

export default page