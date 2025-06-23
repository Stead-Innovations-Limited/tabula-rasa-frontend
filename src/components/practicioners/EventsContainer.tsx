import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  SlLocationPin,
  GoPerson,
  LuCalendarDays,
  PiCurrencyDollarSimple,
} from "@/components/icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function EventsContainer() {
  return (
    <div className='w-full mb-8'>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-[1.375rem] md:text-2xl'>Events</h4>
        </div>
        <div className='flex flex-col divide-y divide-solid divide-olive'>
          {/* The Event Cards */}
          {Array.from({ length: 2 }).map((_, index) => (
            <EventCards key={index} index={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCards({index}: { index: number }) {
  return (
    <Card className={cn('w-full flex flex-col md:flex-row md:items-center py-0 overflow-clip !gap-0 md:gap-4 !shadow-none !rounded-none pb-5', index !== 0 && 'pt-5')}>
      <CardHeader className='w-full md:w-64 aspect-[200/240] relative rounded-xl overflow-clip'>
        <Image
          src='/praying-model.jpg'
          alt='Event Image'
          fill={true}
          className='absolute object-cover object-center'
        />
        <CardTitle className='sr-only'>Event Card</CardTitle>
        <CardDescription className='sr-only'>Event card.</CardDescription>
      </CardHeader>
      <CardContent className='grow relative flex flex-col items-start justify-center gap-2 md:gap-4 z-2 py-4 px-0 md:px-5 text-olive font-roboto'>
        <h5 className='flex gap-2 text-2xl font-medium'>
          Serene Saturday:{" "}
          <span className='inline-block font-normal'>
            Yoga & Sound Bath Retreat
          </span>
        </h5>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
           <p className='flex items-start gap-1 text-xl'>
            <LuCalendarDays className='size-6 text-olive' />{" "}
            {format(new Date("7-19-2025"), "PPPP")}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <PiCurrencyDollarSimple className='size-6 text-olive' />
            80.00
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <SlLocationPin className='size-6 text-olive' /> The Wellness
            Hub, VI, Lagos
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <GoPerson className='size-6 text-olive' /> All Levels Welcome
          </p>
          
        </div>
        <Button className='w-full px-6 py-2 bg-olive text-white rounded-md hover:bg-olive'>
          Get Ticket
        </Button>
      </CardContent>
    </Card>
  );
}
