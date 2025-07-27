export const dynamic = "force-dynamic";

import DashboardBanner from "@/components/dashboard/DashboardBanner";
import getEvents from "@/server-actions/getEvents";
import { Event, Venue } from "@/lib/types";
import getVenues from "@/server-actions/getVenues";
import EventsContainerWrapper from "@/components/events/EventsContainerWrapper";

export default async function page() {
  const events = (await getEvents()) as
    | Event[]
    | { error: boolean; errorData?: string; message?: string };
  const venuesData = (await getVenues()) as
    | Venue[]
    | { error: boolean; errorData?: string; message?: string };
  if (!Array.isArray(events) || !Array.isArray(venuesData)) {
    return (
      <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
        {"Failed to fetch events or venues."}
      </div>
    );
  }
  // We filter the venues to only include those that are available
  const venues = venuesData.filter((ele) => ele.is_available.Bool);
  const eventsWithVenues = events.map((event) => ({
    ...event,
    location: venues.filter((venue) => venue.id === event.venue_id)[0].location
      .String,
  }));
  return (
    <>
      <DashboardBanner />
      <EventsContainerWrapper eventsWithVenues={eventsWithVenues}/>
    </>
  );
}
