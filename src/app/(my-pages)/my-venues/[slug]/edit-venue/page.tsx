import EditVenueBar from "@/components/my-venues/EditVenueBar";
import EditVenueForm from "@/components/my-venues/EditVenueForm";
import getVenue from "@/server-actions/getVenue";
import { Venue } from "@/lib/types";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: venueId } = await params;
  const venueData = (await getVenue(venueId)) as
      | Venue
      | { error: boolean; errorData?: string; message?: string };
    if ("error" in venueData) {
      return <p>Error loading event data.</p>;
    }
  return (
    <>
      <EditVenueBar/>
      <EditVenueForm venueData={venueData}/>
    </>
  )
}
