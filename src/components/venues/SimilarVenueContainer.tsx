import getSimilarVenues from "@/server-actions/getSimilarVenues";
import VenueCards from "../reusable-ui/VenueCards";
import { Venue } from "@/lib/types";

export default async function SimilarVenueContainer() {
  const venueData = (await getSimilarVenues()) as Venue[];
  if (!Array.isArray(venueData) || venueData.length === 0) {
    return (
      <div className='w-full my-8'>
        <p className='text-red-500 text-center'>
          Failed to load similar events.
        </p>
      </div>
    );
  }

  return (
    <section className='w-full my-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Similar Venues</h4>
        </div>
        <div className='flex gap-5 overflow-x-auto scrollbar-hide'>
          {/* The Venue Cards */}
          {venueData.length > 0 ? (
            venueData.map((venue, index) => (
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
            <div className='w-full flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              No similar venues available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
