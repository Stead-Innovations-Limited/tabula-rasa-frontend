import getEventsByVenueId from "@/server-actions/getEventsByVenueId";
import { BookingsFilter } from "../reusable-ui/Input";
import SubBookingsCard from "./SubBookingsCard";
import { Event } from "@/lib/types";

export default async function SubBookingsContainer({
  venueId,
}: {
  venueId: string;
}) {
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
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-5 py-10 md:py-14'>
        <div className='flex justify-end'>
          <BookingsFilter className='w-full md:max-w-80 py-2' />
        </div>
        <div className='space-y-5 md:space-y-8 mt-5 md:mt-8'>
          {events.length > 0 ? (
            events.map((event: Event, index: number) => (
              <SubBookingsCard key={index} eventData={event} />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              No venue bookings available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
