export const dynamic = "force-dynamic";
import BookingsContainer from "@/components/bookings/BookingsContainer";
import getFullEvents from "@/server-actions/getFullEvents";
import { Event, Venue } from "@/lib/types";
import getVenues from "@/server-actions/getVenues";

export default async function page() {
  const events = (await getFullEvents()) as
    | Event[]
    | { error: boolean; errorData?: string; message?: string };
  const venues = await getVenues() as
    | Venue[]
    | { error: boolean; errorData?: string; message?: string };
  if (!Array.isArray(events) || !Array.isArray(venues)) {
    return (
      <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
        {"Failed to fetch venue bookings."}
      </div>
    );
  }
  return (
    <>
      <BookingsContainer events={events} venues={venues} />
    </>
  );
}
