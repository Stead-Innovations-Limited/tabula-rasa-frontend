export const dynamic = "force-dynamic";

import DashboardBanner from "@/components/dashboard/DashboardBanner";
import VenuesContainerWrapper from "@/components/venues/VenuesContainerWrapper";
import { Venue } from "@/lib/types";
import getVenues from "@/server-actions/getVenues";

export default async function page() {
  const venuesData = (await getVenues()) as
    | Venue[]
    | { error: boolean; errorData?: string; message?: string };

  if (!Array.isArray(venuesData)) {
    return (
      <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
        {venuesData.message || "Failed to fetch venues."}
      </div>
    );
  }
  // We filter the venues to only include those that are available
  const venues = venuesData.filter((ele) => ele.is_available.Bool);
  return (
    <>
      <DashboardBanner />
      <VenuesContainerWrapper venues={venues}/>
    </>
  );
}
