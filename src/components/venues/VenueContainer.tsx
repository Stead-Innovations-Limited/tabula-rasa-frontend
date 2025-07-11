import getVenues from "@/server-actions/getVenues";
import { Venue } from "@/lib/types";
import VenueCards from "../reusable-ui/VenueCards";
import { cn } from "@/lib/utils";

export default async function VenueContainer() {
  const venues = (await getVenues()) as Venue[] | { error: boolean; errorData?: string; message?: string };;

  if (!Array.isArray(venues)) {
    return (
      <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
        {venues.message || "Failed to fetch venues."}
      </div>
    );
  }
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Venues</h4>
        </div>
        <div
          className={cn(
            `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8`,
            venues.length === 0 && "!grid-cols-1"
          )}
        >
          {/* The Venue Cards */}
          {venues.length > 0 ? (
            venues.map((venue, index) => (
              <VenueCards
                key={index}
                venueId={venue.id}
                imgUrl={"/room3.webp"}
                imgAlt={venue.name}
                venueName={venue.name}
                venuePrice={`$${venue.booking_price.Int64}`}
                attendance={venue.capacity.Int32}
                venueAddress={venue.location.String}
              />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              No venues available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
