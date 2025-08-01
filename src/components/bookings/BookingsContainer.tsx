"use client";
import BookingsFilterWrapper from "../filterWrapper/BookingsFilterWrapper";
import BookingsCard from "./BookingsCard";
import { useQueryState } from "nuqs";
import { Event, Venue } from "@/lib/types";

export default function BookingsContainer({ events, venues }: { events: Event[]; venues: Venue[] }) {
  const [status] = useQueryState("status");
  const statusVal = (status || "pending") as
    | "pending"
    | "confirmed"
    | "declined";

  const filteredEvents = events.filter((ele) => ele.status === statusVal);
  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-5 py-10 md:py-14'>
        <div className='flex justify-end'>
          <BookingsFilterWrapper />
        </div>
        <div className='space-y-5 md:space-y-8 mt-5 md:mt-8'>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event: Event, index: number) => (
              <BookingsCard key={index} event={event} statusVal={statusVal} location={venues.find(ele => ele.id === event.venue_id)?.location.String}/>
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
