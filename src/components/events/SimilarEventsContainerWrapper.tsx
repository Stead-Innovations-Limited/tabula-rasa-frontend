import { Suspense } from "react";
import SimilarEventsContainerSkeleton from "../skeletons/SimilarEventsContainerSkeleton";
import SimilarEventsContainer from "./SimilarEventsContainer";
import { Event } from "@/lib/types";
type eventsWithVenues = Event & {
  location: string
}

function SimilarEventsContainerWrapper({eventsWithVenues}: {eventsWithVenues: eventsWithVenues[]}) {
  return (
    <Suspense fallback={<SimilarEventsContainerSkeleton />}>
      <SimilarEventsContainer events={eventsWithVenues} />
    </Suspense>
  );
}

export default SimilarEventsContainerWrapper;
