"use client";

import {
  AiOutlineClockCircle,
  BsPinAngle,
  SlLocationPin,
  TfiClose,
  IoCheckmarkOutline,
  FaExclamation,
} from "@/components/icons";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Button } from "../ui/button";
import { ServiceBooking } from "@/lib/types";
import acceptBooking from "@/server-actions/acceptBooking";
import declineBooking from "@/server-actions/declineBooking";
import { toast } from "sonner";
// import approveBooking from "@/server-actions/approveBooking";
// import { toast } from "sonner";
// import VenueBookingPopOverMenu from "../Menus/VenueBookingPopOverMenu";
const errorClass = {
  classNames: {
    toast: "!text-red-500",
    title: "!text-red-500",
    description: "!text-red-500",
  },
};

const successClass = {
  classNames: {
    toast: "!text-green-700",
    title: "!text-green-700",
    description: "!text-green-700",
  },
};

export default function BookingsCard({ booking }: { booking: ServiceBooking }) {
  const dayAbbreviation = format(parseISO(booking.date), "EEE");
  const dayOfMonth = format(parseISO(booking.date), "d");

  const startTime = format(parseISO(booking.start_time), "h:mm a");
  const endTime = format(parseISO(booking.end_time), "h:mm a");
  return (
    <div className={`border-2 border-solid border-olive rounded-2xl flex flex-col gap-5 sm:gap-0 sm:flex-row items-center text-olive h-fit overflow-clip p-4 md:p-0 ${booking.status === "declined" ? "opacity-60 pointer-events-none" : ""}`}>
      <div className='w-full sm:w-1/5 md:w-1/6 h-full md:aspect-square flex flex-col justify-center items-center font-semibold'>
        <h5 className='text-2xl sm:text-xl md:text-2xl'>{dayAbbreviation.toUpperCase()}</h5>
        <h6 className='text-8xl sm:text-5xl md:text-5xl'>{dayOfMonth}</h6>
      </div>
      <div className='w-full flex flex-col sm:grow h-full sm:flex-row sm:items-center sm:border-l-2 border-olive sm:pl-5'>
        <div className='grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 sm:justify-between sm:items-center sm:grow text-base md:text-xl'>
          <p className='flex items-start gap-4 sm:gap-1'>
            <AiOutlineClockCircle className='text-olive size-6' />
            {startTime} - {endTime}
          </p>
          <p className='flex items-start gap-4 sm:gap-1'>
            <BsPinAngle className='text-olive size-6 sm:size-8' />
            {booking.field}
          </p>
          <p className='flex items-start gap-4 sm:gap-1'>
            <SlLocationPin className='text-olive size-6' />
            {booking.location}
          </p>
          <p className='text-xl  text-white'>
            <span className='size-6 bg-olive rounded-full inline-flex items-center justify-center'>
              A
            </span>
            <span className='size-6 bg-olive rounded-full inline-flex items-center justify-center -translate-x-1/2'>
              A
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function PendingBookingsCard({ booking }: { booking: ServiceBooking }) {
  const router = useRouter();
  const day = format(parseISO(booking.date), "EEEE");
  const titledDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  const dayOfMonth = format(parseISO(booking.date), "d");

  const startTime = format(parseISO(booking.start_time), "h:mm a");
  const endTime = format(parseISO(booking.end_time), "h:mm a");
  return (
    <div className='relative'>
      <span className='absolute -top-2 -left-2 rounded-full shadow-[0px_0px_0px_3px_white] bg-bluredolive text-white size-7 flex items-center justify-center'>
        <FaExclamation className='size-5' />
      </span>
      <div className='border-2 border-solid border-bluredolive rounded-2xl flex flex-col sm:flex-row items-center text-bluredolive overflow-clip'>
        <div className='w-full sm:w-1/4 md:w-1/6 p-5 sm:p-0 sm:aspect-square flex flex-col justify-center items-center font-semibold bg-bluredolive text-white'>
            <AiOutlineClockCircle className='text-8xl md:text-5xl' />
          <h5 className='text-lg'>PENDING</h5>
        </div>
        <div className='w-full flex flex-col sm:grow sm:flex-row sm:items-center p-5 sm:px-5 sm:py-0'>
          <div className='grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 sm:justify-between sm:items-start sm:grow'>
            <p className='w-full flex items-center sm:items-start gap-4 text-xl'>
              <AiOutlineClockCircle className='text-bluredolive size-6' />
              {startTime} - {endTime}
            </p>
            <p className='flex items-center sm:items-start gap-4 sm:gap-1 text-xl'>
              <BsPinAngle className='text-bluredolive size-6 md:size-8' />
              {booking.field}
            </p>
            <p className='flex items-center sm:items-start gap-4 sm:gap-1 text-xl'>
              <SlLocationPin className='text-bluredolive size-6' />
              {booking.location}
            </p>
            <div className='flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-start'>
              <p className='text-xl text-white'>
                <span className='size-6 bg-bluredolive rounded-full inline-flex items-center justify-center'>
                  A
                </span>
                <span className='size-6 bg-bluredolive rounded-full inline-flex items-center justify-center -translate-x-1/2'>
                  A
                </span>
                <span className='text-bluredolive ml-2'>
                  {titledDay}&nbsp;{dayOfMonth}
                </span>
              </p>

              <div className='flex flex-row gap-2 sm:mt-5'>
                <Button
                  variant='outline'
                  onClick={async () => {
                    const res = await declineBooking(booking.id);
                    if (res.error) {
                      toast.error(res.message, errorClass);
                    } else {
                      toast.success(res.message, successClass);
                      //Refresh the page
                      router.refresh();
                    }
                  }}
                >
                  <TfiClose className='text-bluredolive size-5' />
                </Button>
                <Button
                  onClick={async () => {
                    const res = await acceptBooking(booking.id);
                    if (res.error) {
                      toast.error(res.message, errorClass);
                    } else {
                      toast.success(res.message, successClass);
                      //Refresh the page
                      router.refresh();
                    }
                  }}
                  className='bg-bluredolive hover:bg-bluredolive/95 text-white px-4'
                >
                  <IoCheckmarkOutline className='size-5' />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className=''></div>
      </div>
    </div>
  );
}
