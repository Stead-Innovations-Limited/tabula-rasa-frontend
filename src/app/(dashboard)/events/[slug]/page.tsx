import EventsOverview from "@/components/events/EventsOverview"
import SimilarEventsContainer from "@/components/events/SimilarEventsContainer";


async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: eventId } = await params;

  return (
    <>
      <EventsOverview eventId={eventId} />
      <SimilarEventsContainer eventId={eventId} />
    </>
  )
}

export default page