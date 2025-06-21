import DashboardBanner from "@/components/dashboard/DashboardBanner";
import EventsContainer from "@/components/dashboard/EventsContainer";
import PracticionersContainer from "@/components/dashboard/PracticionersContainer";
import VenueContainer from "@/components/dashboard/VenueContainer";

 export default function page() {
  return (
    <>
     <DashboardBanner />
     <EventsContainer />
     <VenueContainer />
     <PracticionersContainer />
    </>
  )
}
