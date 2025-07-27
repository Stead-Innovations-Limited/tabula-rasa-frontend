"use client";
import { Suspense } from "react";
import PracticionersContainer from "./PracticionersContainer";
import PracticionersContainerSkeleton from "../skeletons/PractitionersContainersSkeleton";
import { User } from "@/lib/types";

export default function PracticionersContainerWrapper({ practitioners }: { practitioners: User[] }) {
  return (
    <Suspense fallback={<PracticionersContainerSkeleton />}>
      <PracticionersContainer practitioners={practitioners} />
    </Suspense>
  );
}
