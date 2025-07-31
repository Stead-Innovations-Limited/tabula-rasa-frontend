import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxDotsVertical } from "@/components/icons";

export default function EventCardPopOverMenu({eventId}: {eventId: string}) {
  return (
    <div className=''>
      <Popover>
        <PopoverTrigger>
          <RxDotsVertical className="" />
        </PopoverTrigger>
        <PopoverContent className="p-0 rounded-2xl">
          <div className="flex flex-col divide-y divide-olive divide-solid font-roboto text-olive">
            <Link href={`/my-events/${eventId}/edit-event`} className="w-full py-3 text-center">
              Edit Event
            </Link>
            <Link href={`/my-events/${eventId}/view-registration`} className="w-full py-3 text-center">
              View Registration
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
