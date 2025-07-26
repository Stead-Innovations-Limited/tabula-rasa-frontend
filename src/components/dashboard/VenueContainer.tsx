"use client";
import { useQueryState } from "nuqs";
import { BsChevronRight } from "@/components/icons";
import VenueCards from "../reusable-ui/VenueCards";
import Link from "next/link";
import { Venue } from "@/lib/types";
import { cn } from "@/lib/utils";
import { filterVenues } from "@/lib/filterFns";

export default function VenueContainer({ venuesData }: { venuesData: Venue[] }) {
  const [searchVal] = useQueryState("search");
  const venues = filterVenues(venuesData, searchVal || "");
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Venues</h4>
          <Link
            href='/venues'
            className='flex gap-1 items-center justify-center text-base md:text-lg'
          >
            See all venues
            <BsChevronRight />
          </Link>
        </div>
        <div className={cn(`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8`, venues.length === 0 && '!grid-cols-1')}>
          {/* The Venue Cards */}
          {venues.length > 0 ? (
            venues.map((venue, index) => (
              <VenueCards
                key={index}
                venueId={venue.id}
                imgUrl={venue.image_links[0]}
                imgAlt={venue.name}
                venueName={venue.name}
                venuePrice={`$${venue.booking_price.Int64}`}
                attendance={venue.capacity.Int32}
                venueAddress={venue.location.String}
              />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              { searchVal?.trim() ? "No venues matches your search" : "No venues available." }
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
