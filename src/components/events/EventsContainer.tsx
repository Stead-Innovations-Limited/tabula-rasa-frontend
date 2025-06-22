import EventCards from "@/components/reusable-ui/EventCards";
import { eventData } from "@/lib/eventData";

export default function EventsContainer() {
  const data = [...eventData, ...eventData, ...eventData];

  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Events</h4>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8'>{/* The Event Cards */}
          {
            data.map((event, index) => (
              <EventCards
                key={index}
                imgUrl={event.imgUrl}
                imgAlt={event.imgAlt}
                eventName={event.eventName}
                eventPrice={event.eventPrice}
                eventDate={event.eventDate}
                eventAddress={event.eventAddress}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}
