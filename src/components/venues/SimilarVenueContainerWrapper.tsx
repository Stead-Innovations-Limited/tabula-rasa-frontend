import { Suspense } from "react";
import SimilarVenueContainer from "@/components/venues/SimilarVenueContainer";
import SimilarVenueContainerSkeleton from "../skeletons/SimilarVenueContainerSkeleton";
import { Venue } from "@/lib/types";

function SimilarVenueContainerWrapper({ venues}: { venues: Venue[]}) {
  return (
    <Suspense fallback={<SimilarVenueContainerSkeleton />}>
      <SimilarVenueContainer venuesData={venues} />
    </Suspense>
  );
}

export default SimilarVenueContainerWrapper;
