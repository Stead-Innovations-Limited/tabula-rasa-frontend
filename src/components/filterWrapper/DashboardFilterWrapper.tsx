import { Suspense } from "react";
import { DashboardFilter } from "../reusable-ui/Input";
import { Skeleton } from "../ui/skeleton";


export default function DashboardFilterWrapper() {
  return (
    <Suspense fallback={<Skeleton className="w-full md:max-w-80 py-2"/>}>
      <DashboardFilter className="w-full md:max-w-80 py-2"/>
    </Suspense>
  )
}