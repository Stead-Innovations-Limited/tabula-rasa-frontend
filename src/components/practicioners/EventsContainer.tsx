import getEvents from "@/server-actions/getEvents";
import { Event } from "@/lib/types";
import { EventCards } from "@/components/saved/SavedContainer";

export default async function EventsContainer({
  practitionerId,
}: {
  practitionerId: string;
}) {
  const eventsData = (await getEvents()) as
    | Event[]
    | { error: boolean; errorData?: string; message?: string };
  if (!Array.isArray(eventsData)) {
    return (
      <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
        {eventsData.message || "Failed to fetch events."}
      </div>
    );
  }

  const availableEvents = eventsData.filter(
    (event) => event.created_by === practitionerId
  );
  return (
    <div className='w-full mb-8'>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-[1.375rem] md:text-2xl'>Events</h4>
        </div>
        <div className='flex flex-col divide-y divide-solid divide-olive'>
          {/* The Event Cards */}
          {availableEvents.length > 0 ? (
            availableEvents.map((event) => (
              <EventCards key={event.id} eventId={event.id} />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              No events available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
