import EventCards from "@/components/reusable-ui/EventCards";
import getEvents from "@/server-actions/getEvents";
import { Event } from "@/lib/types";

export default async function SimilarEventsContainer({
  eventId,
}: {
  eventId: string;
}) {
  const events = await getEvents() as Event[];
  const filterEvent = events.filter((event: Event) => event.id !== eventId);
  return (
    <section className='w-full my-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Similar events</h4>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8'>
          {/* The Event Cards */}
          {filterEvent.map((event, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
