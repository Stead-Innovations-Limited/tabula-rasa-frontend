import { format, parseISO } from "date-fns";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SlHeart } from "@/components/icons";
import getEvent from "@/server-actions/getEvent";
import getVenue from "@/server-actions/getVenue";
import { Event, Venue } from "@/lib/types";

async function EventsOverview({ eventId }: { eventId: string }) {
  const eventData = await getEvent(eventId) as Event;
  const venueData = await getVenue(eventData.venue_id) as Venue;
  return (
    <section className='w-full'>
      <div className='w-full p-5 lg:px-10 xl:max-w-[1140px] mx-auto font-nunito'>
        <Card className='py-0 overflow-clip !gap-0'>
          <CardHeader className='w-full aspect-video md:aspect-[16/7] relative'>
            <Image
              src='/meditation.webp'
              alt='Meditation Haven'
              fill={true}
              className='absolute object-cover object-center'
            />
            <CardTitle className='sr-only'>{eventData.name}</CardTitle>
            <CardDescription className='sr-only'>
              Event card about the {eventData.name} event.
            </CardDescription>
          </CardHeader>
          <CardContent className='relative flex flex-col items-center justify-center gap-5 rounded-xl -mt-5 z-2 bg-white py-10 px-5 md:px-10 text-olive'>
            <div className='w-full flex flex-col gap-4 sm:flex-row items-start justify-between'>
              {/* The Event name and type div */}
              <div className='flex flex-col gap-4'>
                <h2 className='text-olive font-nunito text-2xl lg:text-3xl font-semibold'>
                  {eventData.name}
                </h2>

                <p className='bg-lightgreen text-olive w-fit rounded-md px-14 py-0.5 text-base md:text-lg'>
                  {eventData.theme.String}
                </p>
              </div>
              {/* The Save button to adding the event to Saved List */}
              <div className=''>
                <Button className='bg-olive text-white hover:bg-darkolive rounded-full size-12 items-center justify-center'>
                  <SlHeart className='size-6' />
                </Button>
              </div>
            </div>
            {/* The Card Details */}
            <div className='w-full flex flex-col gap-5'>
              {/* Card Description */}
              <p className='text-xl lg:text-2xl'>
                {eventData.description.String}
              </p>
              <div className=''>
                <ul className='flex flex-col gap-4 text-xl lg:text-2xl'>
                  <li className='flex gap-2 items-center'>
                    <span className='inline-block font-medium'>
                      Key Activities:
                    </span>
                    <span className='inline-block'>
                      {eventData.activities.join(", ")}
                    </span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <span className='inline-block font-medium'>
                      Target Audience:
                    </span>
                    <span className='inline-block'>{eventData.audience.String}</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <span className='inline-block font-medium'>Location:</span>
                    <span className='inline-block'>{venueData.location.String}</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <span className='inline-block font-medium'>
                      Start Date:
                    </span>
                    <span className='inline-block'>
                      {format(new Date(eventData.start_date.Time), "PPPP")}
                    </span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <span className='inline-block font-medium'>End Date:</span>
                    <span className='inline-block'>
                      {format(new Date(eventData.end_date.Time), "PPPP")}
                    </span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <span className='inline-block font-medium'>Time:</span>
                    <span className='inline-block'>
                      {format(parseISO(eventData.start_time.Time), "h:mm a")} - {format(parseISO(eventData.end_time.Time), "h:mm a")} WAT
                    </span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <span className='inline-block font-medium'>
                      Price per Participant:
                    </span>
                    <span className='inline-block'>$20.00</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className='mb-10'>
            <Button className='font-roboto bg-olive text-white hover:bg-darkolive rounded-md w-full'>
              Get Tickets
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default EventsOverview;
