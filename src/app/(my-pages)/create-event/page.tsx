import CreateEventBar from "@/components/my-events/CreateEventBar";
import CreateEventForm from "@/components/my-events/CreateEventForm";
import { Venue } from "@/lib/types";
import getVenues from "@/server-actions/getVenues";

export default async function page() {
  const venues = (await getVenues()) as Venue[] | { error: boolean; errorData?: string; message?: string };
    if (!Array.isArray(venues)) {
      return (
        <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
          {venues.message || "Failed to fetch venues."}
        </div>
      );
    }
  return (
    <>
      <CreateEventBar />
      <CreateEventForm venues={venues} />
    </>
  )
}
