import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { LuCalendarDays, SlLocationPin, GoArrowUpRight } from "@/components/icons";

interface EventProps {
  imgUrl: string;
  imgAlt: string;
  eventName: string;
  eventPrice: string;
  eventDate: string;
  eventAddress: string;
}

export default function EventCards({
  imgUrl,
  imgAlt,
  eventName,
  eventPrice,
  eventDate,
  eventAddress,
}: EventProps) {
  return (
    <Card className='py-0 overflow-clip !gap-0'>
      <CardHeader className='w-full aspect-square relative'>
        <span className="relative z-5 my-5 ml-auto bg-olive size-10 rounded-xl flex items-center justify-center">
          <GoArrowUpRight className="size-5 text-white" />
        </span>
        <Image src={imgUrl} alt={imgAlt} fill={true} className='absolute object-cover object-center' />
        <CardTitle className='sr-only'>{eventName}</CardTitle>
        <CardDescription className='sr-only'>
          Event card about the {eventName} event.
        </CardDescription>
      </CardHeader>
      <CardContent className='relative flex flex-col items-center justify-center rounded-xl -mt-5 z-2 bg-white py-4 px-5 text-olive font-roboto'>
        <h5 className='text-2xl font-medium'>{eventName}</h5>
        <p className='text-lg'>{eventPrice}</p>
        <p className='flex items-start gap-1 text-lg'><LuCalendarDays className="size-4 mt-1 text-olive"/> {format(new Date(eventDate), "PPPP")}</p>
        <p className='flex items-start gap-1 text-lg'><SlLocationPin className="size-4 mt-1 text-olive" /> {eventAddress}</p>
      </CardContent>
    </Card>
  );
}
