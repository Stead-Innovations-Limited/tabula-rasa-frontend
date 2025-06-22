import VenueCards from "../reusable-ui/VenueCards";
import { venueData } from "@/lib/venueData";

export default function SimilarVenueContainer() {
  const data = [...venueData, ...venueData, ...venueData];
  return (
    <section className='w-full my-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Similar Venues</h4>
        </div>
        <div className='flex gap-5 overflow-x-auto scrollbar-hide'>
          {/* The Venue Cards */}
          {data.map((venue, index) => (
            <div key={index} className='min-w-[calc(100%-1.25rem)] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(25%-1rem)]'>
              <VenueCards
                imgUrl={venue.imgUrl}
                imgAlt={venue.imgAlt}
                venueName={venue.venueName}
                venuePrice={venue.venuePrice}
                attendance={venue.attendance}
                venueAddress={venue.venueAddress}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
