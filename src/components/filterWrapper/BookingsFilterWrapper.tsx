"use client"
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { BookingsFilter } from "../reusable-ui/Input";

export default function BookingsFilterWrapper() {
  return (
    <Suspense fallback={<Skeleton className='w-full md:max-w-80 py-2' />}>
      <BookingsFilter className='w-full md:max-w-80 py-2' />
    </Suspense>
  );
}