import { BsChevronRight } from "@/components/icons";
import EventCards from "../reusable-ui/EventCards";
import { cn } from "@/lib/utils";
import Link from "next/link";
import getEvents from "@/server-actions/getEvents";
import { Event } from "@/lib/types";

export default async function EventsContainer() {
  const events = (await getEvents()) as Event[] | { error: boolean; errorData?: string; message?: string };
  if(!Array.isArray(events)) {
    return (
      <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
        {events.message || "Failed to fetch events."}
      </div>
    );
  }
  
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Events</h4>
          <Link
            href='/events'
            className='flex gap-1 items-center justify-center text-base md:text-lg'
          >
            See all events
            <BsChevronRight />
          </Link>
        </div>
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8', events.length === 0 && '!grid-cols-1')}>
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
              No events available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
