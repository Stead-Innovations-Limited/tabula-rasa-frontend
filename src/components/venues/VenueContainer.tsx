import { venueData } from "@/lib/venueData";
import VenueCards from "../reusable-ui/VenueCards";


export default function VenueContainer() {
  const data = [...venueData, ...venueData, ...venueData];
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Venues</h4>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8'>{/* The Event Cards */}
          {
            data.map((venue, index) => (
              <VenueCards
                key={index}
                imgUrl={venue.imgUrl}
                imgAlt={venue.imgAlt}
                venueName={venue.venueName}
                venuePrice={venue.venuePrice}
                attendance={venue.attendance}
                venueAddress={venue.venueAddress}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}
