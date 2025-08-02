"use client";
import BookingsFilterWrapper from "../filterWrapper/BookingsFilterWrapper";
import BookingsCard, { PendingBookingsCard} from "./BookingsCard";
import { useQueryState } from "nuqs";
import { ServiceBooking } from "@/lib/types";

export default function BookingsContainer({ bookings }: { bookings: ServiceBooking[] }) {
  const [status] = useQueryState("status");
  const statusVal = (status || "pending") as
    | "pending"
    | "confirmed"
    | "declined";

  const filteredBookings = bookings.filter((ele) => ele.status === statusVal);
  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-5 py-10 md:py-14'>
        <div className='flex justify-end'>
          <BookingsFilterWrapper />
        </div>
        <div className='space-y-5 md:space-y-8 mt-5 md:mt-8'>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking: ServiceBooking, index: number) => (
              statusVal === "pending" ? (
                <PendingBookingsCard key={index} booking={booking} />
              ) : (
                <BookingsCard key={index} booking={booking} />
              )
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              No {statusVal.charAt(0).toUpperCase() + statusVal.slice(1)} bookings available for you.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
