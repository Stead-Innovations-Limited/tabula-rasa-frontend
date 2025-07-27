"use client";

import VenueCards from "../reusable-ui/VenueCards";
import { Venue } from "@/lib/types";
import { filterVenues } from "@/lib/filterFns";
import { useQueryState } from "nuqs";
import { sortDataByCategoryAndOption, SortOption } from "@/lib/sortDataByCategoryAndOption";

export default function SimilarVenueContainer({
  venuesData,
}: {
  venuesData: Venue[];
}) {
  const [searchVal] = useQueryState("search");
  const [sortVal] = useQueryState("sort");
  const venues = filterVenues(venuesData, searchVal || "");
  const sortedVenues = sortDataByCategoryAndOption(venues, "venues", (sortVal || "capacity") as SortOption) as Venue[];
  return (
    <section className='w-full my-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Similar Venues</h4>
        </div>
        <div className='flex gap-5 overflow-x-auto scrollbar-hide'>
          {/* The Venue Cards */}
          {sortedVenues.length > 0 ? (
            sortedVenues.map((venue, index) => (
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
              {searchVal?.trim()
                ? "No venues matches your search"
                : "No venues available."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
