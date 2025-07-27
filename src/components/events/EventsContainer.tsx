"use client";

import { Event } from "@/lib/types";
import EventCards from "../reusable-ui/EventCards";
import { cn } from "@/lib/utils";
import { filterEvents } from "@/lib/filterFns";
import { useQueryState } from "nuqs";
import { sortDataByCategoryAndOption, SortOption } from "@/lib/sortDataByCategoryAndOption";
type EventWithVenue = Event & {
  location: string;
};

export default function EventsContainer({
  events,
}: {
  events: EventWithVenue[];
}) {
  const [searchVal] = useQueryState("search");
  const [sortVal] = useQueryState('sort');

  const filteredEvents = filterEvents(events, searchVal || "");
  const sortedEvents = sortDataByCategoryAndOption(filteredEvents, "events", (sortVal || "latest") as SortOption) as EventWithVenue[];
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Events</h4>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8",
            events.length === 0 && "!grid-cols-1"
          )}
        >
          {/* The Event Cards */}
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event: EventWithVenue, index: number) => (
              <EventCards
                key={index}
                eventId={event.id}
                location={event.location}
                imgUrl={event.image_links[0] || "/event-pic.webp"}
                imgAlt={event.name}
                eventName={event.name}
                eventPrice={"$80.00"}
                eventDate={event.start_date.Time}
              />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              {searchVal?.trim()
                ? " No events matches your search"
                : "No events available."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
