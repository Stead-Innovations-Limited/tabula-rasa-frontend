import {
  AiOutlineClockCircle,
  BsPinAngle,
  SlLocationPin,
} from "@/components/icons";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Button } from "../ui/button";
import { Event } from "@/lib/types";
import approveBooking from "@/server-actions/approveBooking";
import { toast } from "sonner";
import VenueBookingPopOverMenu from "../Menus/VenueBookingPopOverMenu";

export default function BookingsCard({
  event,
  statusVal,
  location,
}: {
  event: Event;
  statusVal: "pending" | "confirmed" | "declined";
  location: string | undefined;
}) {
  const router = useRouter();
  const dayAbbreviation = format(parseISO(event.start_date.Time), "EEE");
  const dayOfMonth = format(parseISO(event.start_date.Time), "d");

  const startTime = format(parseISO(event.start_time.Time), "h:mm a");
  const endTime = format(parseISO(event.end_time.Time), "h:mm a");
  return (
    <div className='border-2 border-solid border-olive rounded-2xl flex flex-col gap-5 md:gap-0 md:flex-row items-center text-olive p-5 h-fit'>
      <div className='md:w-1/6 md:aspect-square flex flex-col justify-center items-center md:pr-5 font-semibold'>
        <h5 className='text-2xl'>{dayAbbreviation.toUpperCase()}</h5>
        <h6 className='text-8xl md:text-5xl'>{dayOfMonth}</h6>
      </div>
      <div className='flex flex-col md:flex-row md:items-center md:border-l-2 border-olive md:pl-5'>
        <div className='grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 md:justify-between md:items-center md:grow'>
          <p className='flex items-start gap-1 text-xl'>
            <AiOutlineClockCircle className='text-olive size-6' />
            {startTime} - {endTime}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <BsPinAngle className='text-olive size-9 md:size-8' />
            {event.name}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <SlLocationPin className='text-olive size-6' />
            {location}
          </p>
          <p className='text-xl  text-white'>
            <span className='size-6 bg-olive rounded-full inline-flex items-center justify-center'>
              A
            </span>
            <span className='size-6 bg-olive rounded-full inline-flex items-center justify-center'>
              A
            </span>
          </p>
        </div>
        {statusVal === "pending" && (
          <VenueBookingPopOverMenu
            venueId={event.venue_id}
            eventId={event.id}
          />
        )}
        {statusVal === "pending" && (
          <Button
            onClick={async () => {
              // Call the server action to open or close the venue based on whether it is currently open or closed
              const bookingResp = await approveBooking(
                event.id,
                event.venue_id
              );
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
          </Button>
        )}
      </div>
    </div>
  );
}
