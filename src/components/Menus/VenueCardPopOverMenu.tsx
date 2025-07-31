"use client";

import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxDotsVertical } from "@/components/icons";
import Link from "next/link";
import openOrCloseVenue from "@/server-actions/closeVenue";

export default function VenueCardPopOverMenu({venueId, state}: {venueId: string, state: string}) {
  const router = useRouter();
  return (
    <div className=''>
      <Popover>
        <PopoverTrigger>
          <RxDotsVertical className="" />
        </PopoverTrigger>
        <PopoverContent className="p-0 rounded-2xl cursor-pointer">
          <div className="flex flex-col divide-y divide-olive divide-solid font-roboto text-olive">
            <Link href={`/my-venues/${venueId}/edit-venue`} className="w-full py-3 text-center">
              Edit Venue
            </Link>
            <Link href={`/my-venues/${venueId}/view-bookings`} className="w-full py-3 text-center">
              View Bookings
            </Link>
            <div onClick={() => {
              // Call the server action to open or close the venue based on whether it is currently open or closed
              openOrCloseVenue(venueId, state === "open" ? false : true)
              // Refresh the page or handle the response as needed
              router.refresh();
              }} className="w-full py-3 text-destructive text-center">
              {state === "open" ? "Close Venue" : "Reopen Venue"}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
