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
      return (
        <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
          {fetchedVenue.message || "Failed to fetch venue."}
        </div>
      );
    }
    venues = [fetchedVenue] as Venue[];
  }else {
    const fetchedVenues = await getVenues();
    if (!Array.isArray(fetchedVenues)) {
      return (
        <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
          {"Failed to fetch venues."}
        </div>
      );
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
