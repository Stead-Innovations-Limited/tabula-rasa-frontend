"use client";

import { useRouter } from "next/navigation";
import { Event } from "@/lib/types";
import { AiOutlineClockCircle, SlLocationPin } from "@/components/icons";
import { format, parseISO } from "date-fns";
import VenueBookingPopOverMenu from "../Menus/VenueBookingPopOverMenu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import approveBooking from "@/server-actions/approveBooking";
import { toast } from "sonner";

export default function SubBookingsCard({
  eventData,
  statusVal,
}: {
  eventData: Event;
  statusVal: "pending" | "confirmed" | "declined";
}) {
  const router = useRouter();
  const dayAbbreviation = format(parseISO(eventData.start_date.Time), "EEE");
  const dayOfMonth = format(parseISO(eventData.start_date.Time), "d");

  const startTime = format(parseISO(eventData.start_time.Time), "h:mm a");
  const endTime = format(parseISO(eventData.end_time.Time), "h:mm a");
  const startDay = format(parseISO(eventData.start_date.Time), "do");
  const startMonth = format(parseISO(eventData.start_date.Time), "LLLL");
  const endDay = format(parseISO(eventData.end_date.Time), "do");
  const endMonth = format(parseISO(eventData.end_date.Time), "LLLL");

  const range = `${startTime} ${startDay} of ${startMonth} to ${endTime} ${endDay} of ${endMonth}`;

  return (
    <div
      className={cn(
        "border-2 border-solid border-olive rounded-2xl flex flex-col gap-5 md:gap-0 md:flex-row items-center text-olive p-5 h-fit",
        statusVal === "declined" && "grayscale"
      )}
    >
      <div className='md:w-1/6 md:aspect-square flex flex-col justify-center items-center md:pr-5 font-semibold md:border-r-2 border-olive'>
        <h5 className='text-2xl'>{dayAbbreviation.toUpperCase()}</h5>
        <h6 className='text-8xl md:text-5xl'>{dayOfMonth}</h6>
      </div>
      <div className='flex flex-col md:flex-row md:justify-center md:items-center border-olive md:pl-5'>
        <div className='grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-3 md:justify-between md:items-center md:grow'>
          <p className='flex items-start gap-1 text-xl'>
            <SlLocationPin className='text-olive size-6' />
            {eventData.name}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <AiOutlineClockCircle className='text-olive size-6' />
            {range}
          </p>
          {/* <p className='text-xl flex items-center gap-2'>
            <span className='size-6 bg-olive text-white rounded-full inline-flex items-center justify-center'>
              O
            </span>
            <span className='text-olive inline-flex items-center justify-center'>
              Olivia Berkinstock
            </span>
          </p> */}
        </div>
        {statusVal === "pending" && (
          <VenueBookingPopOverMenu
            venueId={eventData.venue_id}
            eventId={eventData.id}
          />
        )}
        {statusVal === "pending" && <Button
          onClick={async () => {
            // Call the server action to open or close the venue based on whether it is currently open or closed
            const bookingResp = await approveBooking(eventData.id, eventData.venue_id);
            if (bookingResp.error) {
              toast.error(bookingResp.message, {
                classNames: {
                  toast: "!text-red-500",
                  title: "!text-red-500",
                  description: "!text-red-500",
                },
              });
              return;
            }
            // Refresh the page or handle the response as needed
            toast.success(bookingResp.message, {
              classNames: {
                toast: "!text-green-500",
                title: "!text-green-500",
                description: "!text-green-500",
              },
            });
            router.refresh();
          }}
          className='w-full py-3 text-center md:hidden bg-olive text-white transition-colors hover:bg-olive/90 rounded-sm my-3'
        >
          Approve Booking
        </Button>}
      </div>
    </div>
  );
}
