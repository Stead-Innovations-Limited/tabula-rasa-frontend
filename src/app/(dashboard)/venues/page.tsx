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
  throw new Error("There was an error loading the page.")
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
