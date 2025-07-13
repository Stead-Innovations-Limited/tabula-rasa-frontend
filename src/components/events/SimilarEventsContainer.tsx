import EventCards from "@/components/reusable-ui/EventCards";
import getSimilarEvents from "@/server-actions/getSimilarEvents";
import { Event } from "@/lib/types";
import { cn } from "@/lib/utils";

export default async function SimilarEventsContainer() {
  const events = (await getSimilarEvents()) as Event[];
  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className='w-full my-8'>
        <p className='text-red-500 text-center'>
          Failed to load similar events.
        </p>
      </div>
    );
  }
  return (
    <section className='w-full my-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Similar events</h4>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8",
            events.length === 0 && "!grid-cols-1"
          )}
        >
          {/* The Event Cards */}
          {events.length > 0 ? (
            events.map((event: Event, index: number) => (
              <EventCards
                key={index}
                eventId={event.id}
                venueId={event.venue_id}
                imgUrl={"/event-pic.webp"}
                imgAlt={event.name}
                eventName={event.name}
                eventPrice={"$80.00"}
                eventDate={event.start_date.Time}
              />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              No similar events available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
