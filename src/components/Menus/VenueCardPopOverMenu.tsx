import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxDotsVertical } from "@/components/icons";
import Link from "next/link";

export default function VenueCardPopOverMenu() {
  return (
    <div className=''>
      <Popover>
        <PopoverTrigger>
          <RxDotsVertical className="" />
        </PopoverTrigger>
        <PopoverContent className="p-0 rounded-2xl">
          <div className="flex flex-col divide-y divide-olive divide-solid font-roboto text-olive">
            <Link href="/my-venues/edit-venue" className="w-full py-3 text-center">
              Edit Venue
            </Link>
            <Link href="/my-venues/1/view-bookings" className="w-full py-3 text-center">
              View Bookings
            </Link>
            <Link href="/my-venues/1/view-availability" className="w-full py-3 text-center">
              View Available Venues
            </Link>
            <div className="w-full py-3 text-destructive text-center">
              Close Venue
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
