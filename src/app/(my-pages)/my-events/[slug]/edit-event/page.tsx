import EditEventBar from "@/components/my-events/EditEventBar";
import EditEventForm from "@/components/my-events/EditEventForm";
import { Event, Venue } from "@/lib/types";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: eventId } = await params;
  const eventData = (await getEvent(eventId)) as
    | Event
    | { error: boolean; errorData?: string; message?: string };
  const fetchedVenues = await getVenues() as Venue [];
  if ("error" in eventData || !Array.isArray(fetchedVenues)) {
    return <p>Error loading event data.</p>;
  }
  return (
    <>
      <EditEventBar />
      <EditEventForm event={eventData} venues={venues} />
    </>
  );
}
