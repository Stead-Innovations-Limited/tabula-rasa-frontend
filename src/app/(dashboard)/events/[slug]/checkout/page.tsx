import getEvent from "@/server-actions/getEvent";
import { Event } from "@/lib/types";
import EventCheckoutBar from "@/components/events/EventCheckoutBar";
import EventCheckoutOverview from "@/components/events/EventCheckoutOverview";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: eventId } = await params;
  const eventData = await getEvent(eventId) as Event;
  return (
    <>
      <EventCheckoutBar />
      <EventCheckoutOverview eventData={eventData} />
    </>
  )
}

