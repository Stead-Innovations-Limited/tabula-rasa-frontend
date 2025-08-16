import { format } from "date-fns";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";

import EventCardPopOverMenu from "../Menus/EventCardPopOverMenu";

import {
  SlLocationPin,
  GoPerson,
  PiCurrencyDollarSimple,
  LuCalendarDays,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import getMyEvents from "@/server-actions/getMyEvents";
import { Event, EventRegistration } from "@/lib/types";
import { Progress } from "../ui/progress";
import getEventRegistrations from "@/server-actions/getEventRegistrations";

export default async function EventsTab() {
  const events = (await getMyEvents()) as
    | Event[]
    | { error: boolean; errorData?: string; message?: string };

  if (!Array.isArray(events)) {
    throw new Error("Failed to fetch events or venues.");
  }

  const openEvents = events.filter((ele) => ele.status !== "declined" && ele.status !== "pending");
  const closedEvents = events.filter((ele) => ele.status === "declined" || ele.status === "pending");
  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex px-5 py-6 md:py-14'>
        <Tabs
          defaultValue='open'
          className='w-full flex flex-col items-center gap-6'
        >
          <TabsList className='w-full md:w-3/4 flex'>
            <TabsTrigger value='open' className='grow'>
              Open
            </TabsTrigger>
            <TabsTrigger value='closed' className='grow'>
              Closed
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='open'
            className='w-full flex flex-col gap-5 p-5 md:p-10 rounded-3xl shadow-lg'
          >
            {openEvents.length > 0 ? (
              openEvents.map((eventData) => (
                <EventCards key={eventData.id} eventData={eventData} />
              ))
            ) : (
              <div className='flex justify-center items-center text-center text-xl text-gray-500'>
                No open events available.
              </div>
            )}
            <Button
              className='w-full md:w-3/4 md:!h-fit py-3 bg-olive hover:bg-olive/90 text-white mx-auto mt-10 text-lg'
              asChild
            >
              <Link href={"/create-event"}>Create New Event</Link>
            </Button>
          </TabsContent>
          <TabsContent
            value='closed'
            className='w-full flex flex-col gap-5 grayscale p-5 md:p-10 rounded-3xl shadow-lg pointer-events-none'
          >
            {closedEvents.length > 0 ? (
              closedEvents.map((eventData) => (
                <EventCards key={eventData.id} eventData={eventData} />
              ))
            ) : (
              <div className='flex justify-center items-center text-center text-xl text-gray-500'>
                No closed events available.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

async function EventCards({ eventData }: { eventData: Event }) {
  const registrationData = (await getEventRegistrations(eventData.id)) as
    | EventRegistration[]
    | { error: boolean; errorData?: string; message?: string };
  // If there is an error in fetching the registrations, we throw an error.
  if ("error" in registrationData || !Array.isArray(registrationData)) {
    throw new Error("An error occurred while fetching the registrations.");
  }

  const totalParticipants = registrationData[0].total_participants;
  const registeredParticipants = registrationData[0].registered_participants;


  return (
    <Card
      className={cn(
        "w-full flex flex-col md:flex-row md:items-start py-5 overflow-clip !gap-0 md:gap-4 !shadow-none !rounded-none"
      )}
    >
      <CardHeader className='w-full md:w-64 !px-0'>
        <div className="w-full flex gap-2 md:gap-0 md:flex-col">
          <div className="w-full relative aspect-[200/240] rounded-xl overflow-clip">
            <Image
              src={eventData.image_links[0]}
              alt={`Image of ${eventData.name}`}
              fill={true}
              className='absolute object-cover object-center grow'
            />
          </div>
          <span className="inline-block md:hidden">
            <EventCardPopOverMenu eventId={eventData.id} />
          </span>
        </div>
        <CardTitle className='sr-only'>Event Card</CardTitle>
        <CardDescription className='sr-only'>Event card.</CardDescription>
      </CardHeader>
      <CardContent className='grow relative flex flex-col items-start justify-center gap-2 md:gap-6 z-2 py-4 px-0 md:px-5 text-olive font-roboto'>
        <h5 className='flex gap-2 text-2xl font-medium'>{eventData.name}</h5>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <p className='flex items-start gap-1 text-xl'>
            <LuCalendarDays className='size-6 text-olive' />{" "}
            {format(new Date(eventData.start_date.Time), "PPPP")}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <PiCurrencyDollarSimple className='size-6 text-olive' />
            {eventData.price.toFixed(2)}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <SlLocationPin className='size-6 text-olive' /> The Wellness Hub,
            VI, Lagos
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <GoPerson className='size-6 text-olive' />{" "}
            {eventData.audience.String}
          </p>
        </div>
        <Progress value={registeredParticipants} base={totalParticipants} className='' />
      </CardContent>
      <CardFooter className='hidden md:flex'>
        <EventCardPopOverMenu eventId={eventData.id} />
      </CardFooter>
    </Card>
  );
}
