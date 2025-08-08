export const dynamic = "force-dynamic";

import SubBookingsBar from "@/components/bookings/SubBookingsBar";
import SubBookingsContainer from "@/components/bookings/SubBookingsContainer";
import getEventsByVenueId from "@/server-actions/getEventsByVenueId";
import { Event } from "@/lib/types";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: venueId } = await params
  const events = (await getEventsByVenueId(venueId)) as
      | Event[]
      | { error: boolean; errorData?: string; message?: string };
    if (!Array.isArray(events)) {
      throw new Error("Error loading page")
    }
  return (
    <>
      <SubBookingsBar venueId={venueId} />
      <SubBookingsContainer events={events} />
    </>
  )
}
