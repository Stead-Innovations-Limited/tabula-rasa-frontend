import VenueOverview from "@/components/venues/VenueOverview"
import SimilarVenueContainer from "@/components/venues/SimilarVenueContainer"
// import getSavedVenue from "@/server-actions/getSavedVenue";
// import {Saved } from "@/server-actions/getSavedVenue";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: venueId } = await params;
  // This fetches all the saved venues that belongs to the user;
  // const mySavedVenues = await getSavedVenue();
  // if(mySavedVenues?.error) {
  //   return <p>Error</p>
  // }
  // const data = mySavedVenues.data as Saved[];
  // // We filter through the saved venues to see if this venue is saved already.
  // const savedVenue = data.some((ele: Saved) => ele.venue_id === venueId);

  return (
    <>
      <VenueOverview venueId={venueId} isSaved={true}/>
      <SimilarVenueContainer venueId={venueId} />
    </>
  )
}
