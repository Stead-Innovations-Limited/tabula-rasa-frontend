import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { LuCalendarDays, SlLocationPin, GoArrowUpRight } from "@/components/icons";
import getVenue from "@/server-actions/getVenue";
import { Venue } from "@/lib/types";

interface EventProps {
  eventId: string;
  venueId: string;
  imgUrl: string;
  imgAlt: string;
  eventName: string;
  eventPrice: string;
  eventDate: string;
  
}

export default async function EventCards({
  eventId,
  venueId,
  imgUrl,
  imgAlt,
  eventName,
  eventPrice,
  eventDate
}: EventProps) {
  // Fetch the venue data using the eventId
  const venueData = await getVenue(venueId) as Venue;

  return (
    <Card className='py-0 overflow-clip !gap-0'>
      <CardHeader className='w-full aspect-square relative'>
        <Link href={`/events/${eventId}/`} className="relative z-5 my-5 ml-auto bg-olive size-10 rounded-xl flex items-center justify-center">
          <GoArrowUpRight className="size-5 text-white" />
        </Link>
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
        <p className='flex items-start gap-1 text-lg'><SlLocationPin className="size-4 mt-1 text-olive" />{venueData.location.String}</p>
      </CardContent>
    </Card>
  );
}
