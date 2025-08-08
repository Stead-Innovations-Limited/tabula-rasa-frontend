export const dynamic = "force-dynamic";

import SavedContainer from "@/components/saved/SavedContainer";
import getSavedEvent from "@/server-actions/getSavedEvent";
import getSavedVenue from "@/server-actions/getSavedVenue";

export default async function page() {
   const mySavedEvent = await getSavedEvent();
   const mySavedVenues = await getSavedVenue();
    // If there is an error in fetching the saved events or the event data, we return an error message.
    if (mySavedEvent?.error || mySavedVenues?.error) {
      throw new Error("Error fetching saved pages")
    }
  return (
    <>
      <SavedContainer eventData={mySavedEvent.data} venueData={mySavedVenues.data} />
    </>
  )
}
