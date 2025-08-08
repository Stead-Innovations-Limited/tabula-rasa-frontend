export const dynamic = "force-dynamic";
import CreateEventBar from "@/components/my-events/CreateEventBar";
import CreateEventForm from "@/components/my-events/CreateEventForm";
import { Venue } from "@/lib/types";
import getVenue from "@/server-actions/getVenue";
import getVenues from "@/server-actions/getVenues";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>
}) {
  const venueId = (await searchParams)?.venue || undefined
  let venues: Venue[] | { error: boolean; errorData?: string; message?: string };
  if (venueId && venueId !== "undefined") {
    const fetchedVenue = await getVenue(venueId);
    if ("error" in fetchedVenue) {
      throw new Error("There was an error viewing the page.")
    }
    venues = [fetchedVenue] as Venue[];
  }else {
    const fetchedVenues = await getVenues();
    if (!Array.isArray(fetchedVenues)) {
      throw new Error("There was an error viewing this page.")
    }
    venues = fetchedVenues as Venue[];
  }
    
  return (
    <>
      <CreateEventBar />
      <CreateEventForm venues={venues} />
    </>
  )
}
