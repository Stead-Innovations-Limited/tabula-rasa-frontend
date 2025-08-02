"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";
import PractitionerImageFallback from "./PractitionerImageFallback";
import { SlLocationPin } from "@/components/icons";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  // CarouselNext,
  // CarouselPrevious,
  // CarouselDots,
} from "@/components/ui/carousel";
import { ChangeSchedule } from "@/components/ui/carousel";
export interface Time {
  hours: string;
  minutes: string;
  range: "AM" | "PM";
}

const defaultTime: Time = {
  hours: "5",
  minutes: "0",
  range: "AM",
};

function formatTime(t: Time, showRange = true) {
  const minutes = t.minutes.padStart(2, "0");
  return `${t.hours}:${minutes}${showRange ? t.range : ""}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatSchedule(startTime: Time, endTime: Time, date: Date): string {
  return `${formatTime(startTime)} - ${formatTime(endTime)}, ${formatDate(date)}`;
}

const hourDiffFn = (startTime: Time, endTime: Time) => {
    if(startTime.range === endTime.range){
      // Both times are still in am or pm
      if(startTime.hours === "12") return (parseInt(endTime.hours) + 12) - parseInt(startTime.hours);
      else return parseInt(endTime.hours) - parseInt(startTime.hours);
    }
    else if(startTime.range === "AM" && endTime.range === "PM") {
      // StartTime is in the Morning and EndTime is in the 
      return (parseInt(endTime.hours) + 12) - parseInt(startTime.hours);
    }
    else {
      // EndTime is in the evening and the startTime is in the morning
      // Find time till midnight
      const tillMidnight = 12 - (parseInt(endTime.hours));
      // Add to the sum of the morning
      const totalHours = parseInt(startTime.hours) + tillMidnight;
      return totalHours;
    }
  }
export default function PractitionerCheckoutOverview({
  userDetails,
  bookings
}: {
  userDetails: User;
  bookings: string[]
}) {
  // Transform bookings into date objects
  const bookedDays = bookings.map(ele => new Date(ele));
  // States needed for the checkout overview
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<Time>(defaultTime);
  const [endTime, setEndTime] = useState<Time>(defaultTime);
  // Do not forget to add previous days and today too(so we do not book today when booked time may have past)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bookedDates, setBookedDates] = useState<Date[]>([new Date(), ...bookedDays]);
  // This component will display the overview of the practitioner's details during the checkout process.
  
  return (
    <section className='w-full my-5 md:my-16 p-5'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col md:flex-row md:divide-[#DCDCDC] md:divide-x overflow-clip  rounded-2xl shadow-lg'>
        <div className='md:w-1/2'>
          {/* The Practitioners details */}
          <div className='hidden md:block w-full aspect-[16/6]' />
          <hr className='hidden md:block md:border-[#DCDCDC]' />
          {/* The main details about the practitioners */}
          <div className='pl-5 md:pl-10 md:pb-10 flex flex-col gap-1 md:gap-3'>
            {/* The Container for the image, name and field */}
            <div className='flex flex-row md:flex-col justify-start items-center md:items-start gap-5 md:gap-3'>
              {/* The image container */}
              <div className='size-24 md:size-48 md:-mt-24 relative rounded-full p-2 shadow-lg'>
                <PractitionerImageFallback
                  imgUrl={userDetails.image_link.String}
                  imgAlt={userDetails.business_name.String}
                  className='rounded-full'
                />
              </div>
              {/* The name and field */}
              <div className='flex flex-col gap-2 md:gap-0'>
                <h5 className='text-xl md:text-2xl font-roboto font-medium text-black'>
                  {userDetails.business_name.String}
                </h5>
                <p className='w-fit text-sm px-5 py-0.5 bg-lightgreen text-olive rounded-lg'>
                  {userDetails.field.String}
                </p>
              </div>
            </div>

            {/* The description */}
            <div className='text-[#565656B2] font-roboto text-base flex flex-row md:flex-col gap-5 md:gap-0'>
              <p className=''>
                <span className='inline-block'>
                  <SlLocationPin className='' />
                </span>{" "}
                <span className='inline-block'>
                  {userDetails.country.String}
                </span>
              </p>
              <p className=''>$ {userDetails.rate.Int32}/hr</p>
            </div>

            {/* The bio */}
            <div className='font-roboto text-[#898989]'>
              {/* The heading */}
              <h5 className='text-lg font-medium'>Bio</h5>
              <p className='w-4/5 text-base font-normal'>{userDetails.bio.String}</p>
            </div>
          </div>
        </div>
        <div className='mt-5 md:mt-0 md:w-1/2'>
          <div className='w-full h-full'>
            <Carousel className=''>
              <CarouselContent className=''>
                <CarouselItem key='1' className=''>
                  {/* The Calendar component */}
                  <div className=''>
                    <CalendarComp
                      date={date}
                      setDate={setDate}
                      bookedDates={bookedDates}
                    />
                  </div>
                </CarouselItem>
                <CarouselItem key='2' className='flex flex-col items-center justify-center'>
                  {/* The Select Start Time component */}
                  <SelectStartTime
                    startTime={startTime}
                    setStartTime={setStartTime}
                  />
                </CarouselItem>
                <CarouselItem key='3' className='flex flex-col items-center justify-center'>
                  {/* The Select End Time component */}
                  <SelectEndTime endTime={endTime} setEndTime={setEndTime} />
                </CarouselItem>
                <CarouselItem key='4' className='flex flex-col items-center justify-center'>
                  {/* The Order Summary component */}
                  <OrderSummary startTime={startTime} endTime={endTime} date={date} price={userDetails.rate.Int32}/>
                </CarouselItem>
              </CarouselContent>
              <div className=''>
                {/* The Carousel Navigation component */}
                <CarouselNavigation startTime={startTime} endTime={endTime} date={date} pracId={userDetails.id} amount={(userDetails.rate.Int32 * hourDiffFn(startTime, endTime) * 100).toString()}/>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarComp({
  date,
  setDate,
  bookedDates,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  bookedDates: Date[];
}) {
  return (
    <div className='w-full flex flex-col justify-center items-center p-5'>
      <h6 className='text-2xl font-roboto font-medium text-olive mb-5 w-full'>Select Date</h6>
      <div className='w-full'>
        {/* The Calendar component */}
        <Calendar
          mode='single'
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          disabled={[
            { before: new Date() }, // Disable dates before today
            ...bookedDates // The booked dates
          ]}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked:
              "[&>button]:bg-lightolive [&>button]:rounded-full [&>button]:line-through underline-[#dcdcdc] opacity-60 ",
            selected: "[&>button]:!bg-lightolive [&>button]:!text-olive [&>button]:!rounded-full"
          }}
          className='rounded-lg border shadow-lg w-full md:shadow-none md:border-none'
        />
      </div>
    </div>
  );
}

function SelectTime({
  time,
  setTime,
}: {
  time: Time;
  setTime: (time: Time) => void;
}) {
  // This is a Reusable Select Time component that can be used to select a time slot for the appointment.
  // It will be used in the PractitionerCheckoutOverview component.
  return (
    <div className=''>
      <div className=''>
        {/* The Select Start Time */}
        <div className='flex flex-row items-end justify-center gap-1 h-fit'>
          <div className='flex flex-col'>
            <p>Hour</p>
            <Select
              value={time.hours}
              onValueChange={(value) =>
                setTime({
                  ...time,
                  hours: value,
                })
              }
            >
              <SelectTrigger className="w-[100px] !aspect-[2/1]">
                <SelectValue placeholder='Hour' />
              </SelectTrigger>
              <SelectContent>
                {/* Map through available time slots and create SelectItems */}
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 1;
                  return (
                    <SelectItem key={i} value={`${hour}`}>
                      {`${hour}`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <span className='inline-block h-[50px] text-2xl align-middle'>:</span>

          <div className='flex flex-col'>
            <p>Minute</p>
            <Select
              value={time.minutes}
              onValueChange={(value) =>
                setTime({
                  ...time,
                  minutes: value,
                })
              }
            
            >
              <SelectTrigger className='w-[100px] !aspect-[2/1]'>
                <SelectValue placeholder='Hour' />
              </SelectTrigger>
              <SelectContent>
                {/* Map through available time slots and create SelectItems */}
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = i;
                  return (
                    <SelectItem key={i} value={`${minute}`}>
                      {`${minute}`.padStart(2, "0")}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className='h-[50px] flex flex-col border-[#DCDCDC] border rounded-md text-sm divide-y divide-[#dcdcdc] cursor-pointer'>
            <div className={`${time.range === "AM" ? 'text-black': 'text-[#DCDCDC]'} px-2`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              setTime({
                ...time,
                range: "AM"
              });
            }}>AM</div>
            <p className={`${time.range === "PM" ? 'text-black': 'text-[#DCDCDC]'} px-2`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              setTime({
                ...time,
                range: "PM"
              });
            }}>PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectStartTime({
  startTime,
  setStartTime,
}: {
  startTime: Time;
  setStartTime: (time: Time) => void;
}) {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-5'>
      <h6 className='font-roboto font-semibold text-2xl md:text-3xl text-olive'>Select Start Time</h6>
      {/* The Select Start Time */}
      <div className=''>
        <SelectTime time={startTime} setTime={setStartTime} />
      </div>
    </div>
  );
}

function SelectEndTime({
  endTime,
  setEndTime,
}: {
  endTime: Time;
  setEndTime: (time: Time) => void;
}) {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-5'>
      <h6 className='font-roboto font-semibold text-2xl md:text-3xl text-olive'>Select End Time</h6>
      {/* The Select End Time */}
      <div className=''>
        <SelectTime time={endTime} setTime={setEndTime} />
      </div>
    </div>
  );
}

function OrderSummary({startTime, endTime, date, price }: { startTime: Time; endTime: Time; date: Date | undefined; price: number}) {
  const router = useRouter();
  
  return (
    <div className='w-full flex flex-col justify-center items-center font-roboto'>
      <div className='w-full p-5'>
        <h2 className='text-2xl font-semibold text-left md:text-center'>
          Order Summary
        </h2>

        <div className='w-full space-y-2'>
          {/* The schedule showing time */}
          <div className='w-full flex justify-between'>
            <div className="">
              <h4 className="">
                Schedule
              </h4>
              <p className="">
                {date && formatSchedule(startTime, endTime, date)}
              </p>
            </div>
            <p className="">
              <ChangeSchedule />
            </p>
          </div>
          {/* The Price details */}
          <div className='flex justify-between'>
            <div className="">
              <h4 className="">
                Price details
              </h4>
              <p className="">
                $ {price} x {hourDiffFn(startTime, endTime)}
              </p>
            </div>
            <p className="">
              $ { price * hourDiffFn(startTime, endTime)}
            </p>
          </div>
          {/* Total */}
          <div className=''>
            <h4 className="">
              Total
            </h4>
            <p className="">
              $ { price * hourDiffFn(startTime, endTime)}
            </p>
          </div>
        </div>
        <p
          className='w-fit underline decoration-olive text-olive bg-white p-0 cursor-pointer mt-8 ml-auto'
          onClick={() => {
            // Handle cancel order
            router.back()
          }}
        >
          Cancel Order
        </p>
      </div>
    </div>
  );
}
