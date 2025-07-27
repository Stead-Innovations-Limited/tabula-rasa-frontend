import { Suspense } from "react";
import EventsContainerSkeleton from "../skeletons/EventsContainerSkeleton";
import EventsContainer from "@/components/events/EventsContainer";
import { Event } from "@/lib/types";
type EventWithVenue = Event & {
  location: string;
};

export default function EventsContainerWrapper({ eventsWithVenues}: { eventsWithVenues: EventWithVenue[]}) {
  return (
    <Suspense fallback={<EventsContainerSkeleton />}>
      <EventsContainer events={eventsWithVenues} />
    </Suspense>
  );
}