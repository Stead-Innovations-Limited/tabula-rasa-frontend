export const dynamic = "force-dynamic";
import SubBookingsBar from "@/components/bookings/SubBookingsBar";
import AvailabilityContainer from "@/components/my-venues/AvailabilityContainer";
import { Venue } from "@/lib/types";
import getVenue from "@/server-actions/getVenue";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venueData = (await getVenue(slug)) as
    | Venue
    | { error: true; errorData: string; message: string };

  // If there is an error in fetching the saved venues or the venue data, we return an error message.
  if ("error" in venueData || !venueData.id) {
    throw new Error("Error fetching data!")
  }
  const venueSchedule = venueData.working_schedule.RawMessage;
  return (
  <>
  <SubBookingsBar venueId={slug} />
  <AvailabilityContainer venueId={venueData.id} venueSchedule={venueSchedule} />
  </>);
}
