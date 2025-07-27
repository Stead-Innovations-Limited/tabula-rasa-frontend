"use client";
import { Suspense } from "react";
import PracticionersContainerSkeleton from "../skeletons/PractitionersContainersSkeleton";
import PracticionersContainer from "./PracticionersContainer";
import { User } from "@/lib/types";

export default function PractitionersContainerWrapper({filteredUsers}: {filteredUsers: User[]}) {
  return (
    <Suspense fallback={<PracticionersContainerSkeleton />}>
      <PracticionersContainer practitioners={filteredUsers} />
    </Suspense>
  );
}

