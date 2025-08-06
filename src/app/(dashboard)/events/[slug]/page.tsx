import EventsOverview from "@/components/events/EventsOverview";
import getSavedEvent, { Saved } from "@/server-actions/getSavedEvent";
import getSimilarEvents from "@/server-actions/getSimilarEvents";
import getVenues from "@/server-actions/getVenues";
import { Event, Venue } from "@/lib/types";
import SimilarEventsContainerWrapper from "@/components/events/SimilarEventsContainerWrapper";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: eventId } = await params;
  const events = (await getSimilarEvents()) as Event[]
      | { error: boolean; errorData?: string; message?: string };
    const venuesData = (await getVenues()) as
      | Venue[]
      | { error: boolean; errorData?: string; message?: string };

  const mySavedEvent = await getSavedEvent();
  // If there is an error in fetching the saved events or the event data, we return an error message.
  if (mySavedEvent?.error || !Array.isArray(events) || !Array.isArray(venuesData)) {
    return <p>Error</p>;
  }
  const data = mySavedEvent.data as Saved[];
  // We filter through the saved events to see if this event is saved already.
  const savedEvent = data.some((ele: Saved) => ele.event_id === eventId);

  // We filter the venues to only include those that are available
  const venues = venuesData.filter(ele => ele.is_available.Bool);
  const eventsWithVenues = events.map((event) => ({
    ...event,
    location: event.venue_is_listed ? venues.filter((venue) => venue.id === event.venue_id)[0].location.String : `${event.venue_name.String}, ${event.venue_location.String}`,
  }));
  return (
    <>
      <EventsOverview eventId={eventId} isSaved={savedEvent} />
      <SimilarEventsContainerWrapper eventsWithVenues={eventsWithVenues}/>
    </>
  );
}

export default page;
