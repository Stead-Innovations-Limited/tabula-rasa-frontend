"use client";
import { Suspense } from "react";
import VenueContainerSkeleton from "../skeletons/VenueContainerSkeleton";
import VenueContainer from "./VenueContainer";
import { Venue } from "@/lib/types";

export default function VenuesContainerWrapper({venues}: {venues: Venue[]}) {
  return (
    <Suspense fallback={<VenueContainerSkeleton />}>
      <VenueContainer venuesData={venues} />
    </Suspense>
  );
}
