import VenueCards from "../reusable-ui/VenueCards";
import { Venue } from "@/lib/types";
import getVenues from "@/server-actions/getVenues";

export default async function SimilarVenueContainer({
  venueId,
}: {
  venueId: string;
}) {
  const venueData = (await getVenues()) as Venue[];
  const filterVenueData = venueData.filter((venue) => venue.id !== venueId);
  if (filterVenueData.length === 0) {
    return (
      <div className='w-full my-10 flex justify-center items-center text-center'>
        No similar venues found at the moment.
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
          {filterVenueData.map((venue, index) => (
            <div
              key={index}
              className='min-w-[calc(100%-1.25rem)] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(25%-1rem)]'
            >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
