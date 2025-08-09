import NavBar from "@/components/navs/NavBar";
import Hero from "@/components/home/Hero";
import AfterHero from "@/components/home/AfterHero";
import RetreatSection from "@/components/home/RetreatSection";
import Rooms from "@/components/home/Rooms";
import GallerySlides from "@/components/home/GallerySlides";
import Subscription from "@/components/home/Subscription";
import Footer from "@/components/reusable-ui/Footer";
import { Event, Venue } from "@/lib/types";
import getRandomEventsAndVenues from "@/server-actions/getRandomEventsAndVenues";


export interface UserData {
  email: string,
  firstName: string,
  lastName: string,
  profileImage: string,
  roles: string,
  field: string,
  token?: string,
}

interface RandomEventsAndVenues {
  events: Event[];
  venues: Venue[];
}
export default async function Home() {
  const randomEventsAndVenues = await getRandomEventsAndVenues() as RandomEventsAndVenues | { error: true; errorData: string; message: string };
  if("error" in randomEventsAndVenues) {
    throw new Error("Failed to fetch data necessary to view the page")
  }
  const events = randomEventsAndVenues.events;
  const venues = randomEventsAndVenues.venues;

  return (
    <main className='w-full bg-cream'>
      <NavBar/>
      <Hero />
      <AfterHero/>
      <RetreatSection events={events}/>
      <Rooms venues={venues} />
      <GallerySlides />
      <Subscription/>
      <Footer />
    </main>
  );
}
