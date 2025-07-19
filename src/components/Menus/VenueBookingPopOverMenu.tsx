"use client";

import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxDotsVertical } from "@/components/icons";
import approveBooking from "@/server-actions/approveBooking";
import { toast } from "sonner";

export default function VenueBookingPopOverMenu({
  venueId,
  eventId,
}: {
  venueId: string;
  eventId: string;
}) {
  const router = useRouter();
  return (
    <div className=''>
      <Popover>
        <PopoverTrigger>
          <RxDotsVertical className='' />
        </PopoverTrigger>
        <PopoverContent className='p-0 rounded-2xl cursor-pointer'>
          <div className='flex flex-col divide-y divide-olive divide-solid font-roboto text-olive'>
            <div
              onClick={async () => {
                // Call the server action to open or close the venue based on whether it is currently open or closed
                const bookingResp = await approveBooking(eventId, venueId);
                if (bookingResp.error) {
                  toast.error(bookingResp.message, {
                    classNames: {
                      toast: "!text-red-500",
                      title: "!text-red-500",
                      description: "!text-red-500",
                    },
                  });
                  return
                }
                // Refresh the page or handle the response as needed
                toast.success(bookingResp.message, {
                  classNames: {
                    toast: "!text-green-500",
                    title: "!text-green-500",
                    description: "!text-green-500",
                  },
                });
                router.refresh();
              }}
              className='w-full py-3 text-center'
            >
              Approve Booking
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
