import { BsChevronRight } from "@/components/icons";
import EventCards from "./EventCards";
import { eventData } from "@/lib/eventData";
import Link from "next/link";

export default function EventsContainer() {
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Events</h4>
          <Link href="/events" className='flex gap-1 items-center justify-center text-base md:text-lg'>
            See all events
            <BsChevronRight />
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8'>{/* The Event Cards */}
          {
            eventData.map((event, index) => (
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
