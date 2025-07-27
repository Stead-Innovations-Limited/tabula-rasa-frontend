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
      return (
        <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
          {events.message || "Failed to fetch venue bookings."}
        </div>
      );
    }
  return (
    <>
      <SubBookingsBar venueId={venueId} />
      <SubBookingsContainer events={events} />
    </>
  )
}
