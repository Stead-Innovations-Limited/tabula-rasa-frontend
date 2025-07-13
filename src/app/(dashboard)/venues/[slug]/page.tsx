import VenueOverview from "@/components/venues/VenueOverview";
import SimilarVenueContainer from "@/components/venues/SimilarVenueContainer";
import getSavedVenue from "@/server-actions/getSavedVenue";
import { Saved } from "@/server-actions/getSavedVenue";
import getVenue from "@/server-actions/getVenue";
import { Venue } from "@/lib/types";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: venueId } = await params;
  // This fetches all the saved venues that belongs to the user;
  const mySavedVenues = await getSavedVenue();
  const venueData = await getVenue(venueId) as Venue | {error: true, errorData: string, message: string};

  // If there is an error in fetching the saved venues or the venue data, we return an error message.
  if (mySavedVenues?.error || "error" in venueData || !venueData.id) {
    return <p>Error</p>;
  }

  const data = mySavedVenues.data as Saved[];
  // We filter through the saved venues to see if this venue is saved already.
  const savedVenue = data.some((ele: Saved) => ele.venue_id === venueId);

  return (
    <>
      {/* I do a type conversion, if savedVenue is an empty array, it will be falsy, else it will be truthy  */}
      <VenueOverview venueData={venueData} isSaved={!!savedVenue} />
      <SimilarVenueContainer />
    </>
  );
}
