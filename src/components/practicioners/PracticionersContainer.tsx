"use client";
import { User } from "@/lib/types";
 
import PracticionersCards from "../reusable-ui/PracticionersCard";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { filterBusinessProfiles } from "@/lib/filterFns";
import { sortDataByCategoryAndOption, SortOption } from "@/lib/sortDataByCategoryAndOption";

export default function PracticionersContainer({practitioners}: { practitioners: User[] }) {
  const [searchVal] = useQueryState('search');
  const [sortVal] = useQueryState('sort');
  
  const filteredUsers = filterBusinessProfiles(practitioners, searchVal || "");
  const sortedUsers = sortDataByCategoryAndOption(filteredUsers, "practitioners", (sortVal || "experience") as SortOption) as User[];
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='font-medium text-xl md:text-2xl'>Practicioners</h4>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8",
            filteredUsers.length === 0 && "!grid-cols-1"
          )}
        >
          {/* The Event Cards */}
          {sortedUsers.length > 0 ? (
            sortedUsers.map((data, index) => (
              <PracticionersCards
                key={index}
                userId={data.id}
                imgUrl={data.image_link.String}
                imgAlt={data.business_name.String}
                name={data.business_name.String}
                specialty={data.field.String}
                // stars={data.stars}
                address={data.address.String}
              />
            ))
          ) : (
            <div className='flex justify-center items-center text-center text-xl my-10 text-gray-500'>
              {searchVal?.trim() ? "No Practicioners matches your search" : "No Practicioners available."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
