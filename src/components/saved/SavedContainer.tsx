import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  SlLocationPin,
  GoPerson,
  PiHouse,
  // PiCurrencyDollarSimple,
  LuCalendarDays,
  PiCurrencyDollarSimple,
} from "@/components/icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Saved as SavedEventT } from "@/server-actions/getSavedEvent";
import { Saved as SavedVenueT } from "@/server-actions/getSavedVenue";
import getEvent from "@/server-actions/getEvent";
import { Event, Venue } from "@/lib/types";
import getVenue from "@/server-actions/getVenue";
// import EditVenueForm from "../my-venues/EditVenueForm";

export default function SavedContainer({
  eventData,
  venueData,
}: {
  eventData?: SavedEventT[];
  venueData?: SavedVenueT[];
}) {
  if (!eventData || !venueData) {
    return <p>Error loading saved data.</p>;
  }
  const totalSavedEvents = eventData.length;
  const totalSavedVenues = venueData.length;
  const totalSaved = totalSavedEvents + totalSavedVenues;

  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto font-nunito px-5'>
        {totalSaved > 0 ? (
          <div className='p-5 lg:px-10 rounded-2xl md:rounded-4xl border-none shadow-xl flex flex-col divide-y divide-solid divide-olive mt-5 mb-8 md:mt-10 md:mb-16'>
            {eventData.map((event) => (
              <EventCards key={event.event_id} eventId={event.event_id} />
            ))}
            {venueData.map((venue) => (
              <VenueCards key={venue.venue_id} venueId={venue.venue_id} />
            ))}
          </div>
        ) : (
          <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
            No saved venue or event available.
          </div>
        )}
      </div>
    </section>
  );
}

export async function VenueCards({ venueId }: { venueId: string }) {
  const venueData = (await getVenue(venueId)) as Venue;
  if ("error" in venueData) {
    return <p>Error loading event data.</p>;
  }
  return (
    <Card
      className={cn(
        "w-full flex flex-col md:flex-row md:items-center py-5 overflow-clip !gap-0 md:gap-4 !shadow-none !rounded-none"
      )}
    >
      <CardHeader className='w-full md:w-64 aspect-[200/240] relative rounded-xl overflow-clip'>
        <Image
          src={venueData.image_links[0]}
          alt={venueData.name}
          fill={true}
          className='absolute object-cover object-center'
        />
        <CardTitle className='sr-only'>This is a venue card</CardTitle>
        <CardDescription className='sr-only'>
          It shows the most important info about the venue.
        </CardDescription>
      </CardHeader>
      <CardContent className='grow relative flex flex-col items-start justify-center gap-2 md:gap-4 z-2 py-4 px-0 md:px-5 text-olive font-roboto'>
        <h5 className='flex gap-2 text-2xl font-medium'>{venueData.name}</h5>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <p className='flex items-start gap-1 text-xl'>
            <PiHouse className='size-6 text-olive' />
            {venueData.location.String}
          </p>
          {/* <p className='flex items-start gap-1 text-xl'>
            <PiCurrencyDollarSimple className='size-6 text-olive' />
            80.00/hr
          </p> */}
          <p className='flex items-start gap-1 text-xl'>
            <SlLocationPin className='size-6 text-olive' />
            {venueData.location.String}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <GoPerson className='size-6 text-olive' />{" "}
            {venueData.capacity.Int32}
          </p>
        </div>
        <Button asChild className='w-full px-6 py-2 bg-olive text-white rounded-md hover:bg-olive'>
          <Link href={`/create-event?venue=${venueId}`}>Book Space</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export async function EventCards({ eventId }: { eventId: string }) {
  const eventData = (await getEvent(eventId)) as
    | Event
    | { error: boolean; errorData?: string; message?: string };
  if ("error" in eventData) {
    return <p>Error loading event data.</p>;
  }
  const location = eventData.venue_is_listed ? (await getVenue(eventData.venue_id!) as Venue).location.String : `${eventData.venue_name.String}, ${eventData.venue_location.String}`;


  return (
    <Card
      className={cn(
        "w-full flex flex-col md:flex-row md:items-center py-5 overflow-clip !gap-0 md:gap-4 !shadow-none !rounded-none"
      )}
    >
      <CardHeader className='w-full md:w-64 aspect-[200/240] relative rounded-xl overflow-clip'>
        <Image
          src={eventData.image_links[0]}
          alt={eventData.name}
          fill={true}
          className='absolute object-cover object-center'
        />
        <CardTitle className='sr-only'>
          This event is {eventData.name}
        </CardTitle>
        <CardDescription className='sr-only'>
          {eventData.description.String}
        </CardDescription>
      </CardHeader>
      <CardContent className='grow relative flex flex-col items-start justify-center gap-2 md:gap-4 z-2 py-4 px-0 md:px-5 text-olive font-roboto'>
        <h5 className='flex gap-2 text-2xl font-medium'>
          {eventData.name}
          <span className='inline-block font-normal'>
            {/* Yoga & Sound Bath Retreat */}
          </span>
        </h5>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <p className='flex items-start gap-1 text-xl'>
            <LuCalendarDays className='size-6 text-olive' />{" "}
            {format(new Date("7-19-2025"), "PPPP")}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <PiCurrencyDollarSimple className='size-6 text-olive' />
            {eventData.price.toFixed(2)}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <SlLocationPin className='size-6 text-olive' />
            {location}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <GoPerson className='size-6 text-olive' />{" "}
            {eventData.audience.String}
          </p>
        </div>
        <Button
          asChild
          className='w-full px-6 py-2 bg-olive text-white rounded-md hover:bg-olive'
        >
          <Link href={`/events/${eventId}/checkout`}>Get Ticket</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
