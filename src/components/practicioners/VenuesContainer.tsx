import getVenues from "@/server-actions/getVenues";
import { VenueCards } from "../saved/SavedContainer";
import { Venue } from "@/lib/types";

export default async function VenuesContainer({ practitionerId }: { practitionerId: string }) {
  const venuesData = (await getVenues()) as
    | Venue[]
    | { error: boolean; errorData: string; message: string };
  if (!Array.isArray(venuesData)) {
    return <p>Error</p>;
  }
  const availableVenues = venuesData.filter(
    (venue) => venue.is_available.Bool === true && venue.owned_by === practitionerId
  );
  return (
    <div className='w-full mb-8'>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-[1.375rem] md:text-2xl'>Venues</h4>
        </div>
        <div className='flex flex-col divide-y divide-solid divide-olive'>
          {/* The Venue Cards */}
          {availableVenues.length > 0 ? (
            availableVenues.map((venue) => (
              <VenueCards key={venue.id} venueId={venue.id} />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              No venues available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
