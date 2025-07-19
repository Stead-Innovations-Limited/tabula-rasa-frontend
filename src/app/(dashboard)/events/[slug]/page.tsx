import EventsOverview from "@/components/events/EventsOverview";
import SimilarEventsContainer from "@/components/events/SimilarEventsContainer";
import getSavedEvent, { Saved } from "@/server-actions/getSavedEvent";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: eventId } = await params;

  const mySavedEvent = await getSavedEvent();
  // If there is an error in fetching the saved events or the event data, we return an error message.
  if (mySavedEvent?.error) {
    return <p>Error</p>;
  }
  const data = mySavedEvent.data as Saved[];
  // We filter through the saved events to see if this event is saved already.
  const savedEvent = data.some((ele: Saved) => ele.event_id === eventId);
  console.log(savedEvent, "savedEvent");
  return (
    <>
      <EventsOverview eventId={eventId} isSaved={savedEvent} />
      <SimilarEventsContainer />
    </>
  );
}

export default page;
