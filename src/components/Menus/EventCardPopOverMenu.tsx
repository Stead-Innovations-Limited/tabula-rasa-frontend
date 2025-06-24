import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxDotsVertical } from "@/components/icons";

export default function EventCardPopOverMenu() {
  return (
    <div className=''>
      <Popover>
        <PopoverTrigger>
          <RxDotsVertical className="" />
        </PopoverTrigger>
        <PopoverContent className="p-0 rounded-2xl">
          <div className="flex flex-col divide-y divide-olive divide-solid font-roboto text-olive">
            <div className="w-full py-3 text-center">
              Edit Event
            </div>
            <div className="w-full py-3 text-center">
              View Registrations
            </div>
            <div className="w-full py-3 text-destructive text-center">
              Close Event
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
