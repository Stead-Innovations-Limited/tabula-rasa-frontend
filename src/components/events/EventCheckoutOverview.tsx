"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/lib/types";
import { IoMdCheckmarkCircle } from "@/components/icons";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import eventService from "@/server-actions/eventService";
import { toast } from "sonner";

function EventCheckoutOverview({ eventData }: { eventData: Event }) {
  const router = useRouter();
  const price = eventData.price;
  const [quantity, setQuantity] = useState<string>("1");
  return (
    <section className='w-full'>
      <div className='w-full p-5 lg:px-10 xl:max-w-[1140px] mx-auto font-nunito'>
        <div className='flex flex-col md:flex-row md:divide-x md:divide-solid md:divide-[#DCDCDC] md:border md:border-[#DCDCDC] md:rounded-2xl md:overflow-clip'>
          {/* Event Details */}
          <div className='md:w-1/2'>
            {/* The separator design line for mobile */}
            <div className='w-full flex justify-center items-center gap-1 md:hidden text-olive mb-5'>
              <p className='flex gap-0.5'>
                <IoMdCheckmarkCircle className='size-4 text-olive' />{" "}
                <span className='inline-block text-xs'>Tickets</span>
              </p>
              <hr className='grow' />
              <p className='flex gap-0.5 justify-center items-center'>
                <span className='inline-block size-3 border-[#DCDCDC] border rounded-full' />{" "}
                <span className='inline-block text-xs'>Order Summary</span>
              </p>
            </div>
            {/* The main part */}
            <div className='flex flex-row  md:flex-col text-olive'>
              {/* The event Image alone */}
              <div className='w-2/5 aspect-square md:aspect-video md:w-full relative overflow-clip'>
                {eventData.image_links[0] ? (
                  <Image
                    src={eventData.image_links[0]}
                    alt={eventData.name}
                    fill={true}
                    className='object-cover rounded-2xl md:rounded-none'
                  />
                ) : (
                  <Skeleton className='' />
                )}
              </div>

              {/* The event details */}
              <div className='p-5 w-3/5 md:w-full'>
                <h2 className='font-nunito text-4xl font-extrabold text-olive'>
                  {eventData.name}
                </h2>
                <p className='font-roboto font-medium text-xl'>
                  ${price}{" "}
                  <span className='inline-block text-[#565656]'>/ Ticket</span>
                </p>
                <h3 className='hidden md:block font-roboto font-semibold text-3xl'>
                  Ticket Details
                </h3>
                <div className='md:divide-y md:divide-[#DCDCDC]'>
                  <div className='flex justify-between items-center py-2'>
                    <label htmlFor='ticket-quantity' className='text-olive/70'>
                      Number Of Tickets
                    </label>
                    <Select
                      value={quantity}
                      onValueChange={(value) => setQuantity(value)}
                    >
                      <SelectTrigger id='ticket-quantity' className='w-fit'>
                        <SelectValue placeholder='Select No of Tickets' />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: eventData.total_particpant.Int32 },
                          (_, i) => (
                            <SelectItem key={i} value={`${i + 1}`}>
                              {i + 1}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex justify-between items-center py-2 text-olive/70'>
                    <p className=''>Ticket no:</p>
                    <p className='font-roboto font-semibold text-[#898989]'>
                      LID000M0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Order summary */}
          <div className='md:w-1/2 my-10'>
            {/* The separator design line for mobile */}
            <div className='w-full flex justify-center items-center gap-1 md:hidden text-olive mb-5'>
              <p className='flex gap-0.5'>
                <IoMdCheckmarkCircle className='size-4 text-olive' />
                <span className='inline-block text-xs'>Tickets</span>
              </p>
              <hr className='grow' />
              <p className='flex gap-0.5'>
                <IoMdCheckmarkCircle className='size-4 text-olive' />
                <span className='inline-block text-xs'>Order Summary</span>
              </p>
            </div>

            {/* The main part */}
            <div className='md:p-5'>
              <h2 className='text-2xl font-semibold text-left md:text-center'>
                Order Summary
              </h2>
              <div className='max-w-sm md:max-w-full ml-auto md:mx-auto md:w-full md:divide-y md:divide-[#DCDCDC]'>
                <div className='flex justify-between items-center py-2 text-olive/70'>
                  <p className='text-lg'>Ticket Price</p>
                  <p className='text-lg'>${price}</p>
                </div>
                <div className='flex justify-between items-center py-2 text-olive/70'>
                  <p className='text-lg'>{quantity} x Ticket</p>
                  <p className='text-lg'>${price * parseInt(quantity)}</p>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <p className='text-lg'>Total</p>
                  <p className='text-lg font-semibold'>
                    ${(price * parseInt(quantity)).toFixed(2)}
                  </p>
                </div>
              </div>

              <p
                className='w-fit underline decoration-olive text-olive bg-white p-0 cursor-pointer mt-8 ml-auto'
                onClick={() => {
                  router.back();
                }}
              >
                Cancel Order
              </p>

              <div className='w-full flex justify-center mt-10'>
                <Button
                  className='w-full md:w-3/4 py-4 bg-olive text-white rounded-xl mx-auto hover:bg-olive/80'
                  onClick={async () => {
                    const response = await eventService(
                      eventData.id,
                      (price * parseInt(quantity)).toString()
                    );
                    if (response.error) {
                      if (
                        response.errorData instanceof Error &&
                        response.errorData.message
                          .toLowerCase()
                          .includes("insufficient funds")
                      ) {
                        router.push("/insufficient-funds");
                      } else {
                        toast.error(response.message, {
                          classNames: {
                            toast: "!text-red-500",
                            title: "!text-red-500",
                            description: "!text-red-500",
                          },
                        });
                      }
                    } else {
                      router.push(`/events/${eventData.id}/payment-successful`);
                    }
                  }}
                >
                  Pay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventCheckoutOverview;
