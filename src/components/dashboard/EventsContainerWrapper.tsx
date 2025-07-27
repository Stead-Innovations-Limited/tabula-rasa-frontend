"use client";
import { Suspense } from "react";
import EventsContainer from "@/components/dashboard/EventsContainer";
import EventsContainerSkeleton from "@/components/skeletons/EventsContainerSkeleton";
import { Event } from "@/lib/types";
type EventWithVenue = Event & {
  location: string;
};

function EventsContainerWrapper({eventsWithVenues}: {eventsWithVenues: EventWithVenue[]}) {
  return (
    <Suspense fallback={<EventsContainerSkeleton />}>
      <EventsContainer events={eventsWithVenues} />
    </Suspense>
  );
}

export default EventsContainerWrapper;
