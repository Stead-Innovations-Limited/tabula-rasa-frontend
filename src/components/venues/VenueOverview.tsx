
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { SlHeart } from "@/components/icons";
import VenueOverviewImageSlides from "./VenueOverviewImageSlides";
import getVenue from "@/server-actions/getVenue";
import { Venue } from "@/lib/types";

export default async function VenueOverview({venueId}: {venueId: string}) {
  const venueData = await getVenue(venueId) as Venue;

  return (
    <section className="w-full">
      <div className="w-full p-5 lg:px-10 xl:max-w-[1140px] mx-auto font-nunito">
        <Card className='py-0 overflow-clip !gap-0'>
              <CardHeader className='flex flex-col w-full aspect-video md:aspect-[16/7] relative !px-0'>  
                <VenueOverviewImageSlides images={venueData.image_links}/>
                <CardTitle className='sr-only'>{venueData.name}</CardTitle>
                <CardDescription className='sr-only'>
                  {venueData.description.String}
                </CardDescription>
              </CardHeader>
              <CardContent className='relative flex flex-col items-center justify-center gap-5 rounded-xl -mt-5 z-2 bg-white py-10 px-5 md:px-10 text-olive'>
                <div className="w-full flex flex-col gap-4 sm:flex-row items-start justify-between">
                  {/* The Event name and type div */}
                  <div className="flex flex-col gap-4">
                    <h2 className="text-olive font-nunito text-2xl lg:text-3xl font-semibold">
                      {venueData.name}
                    </h2>
                    <p className="bg-lightgreen text-olive w-fit rounded-md px-14 py-0.5 text-base md:text-lg">
                      {venueData.type.String}
                    </p>
                  </div>
                  {/* The Save button to adding the event to Saved List */}
                  <div className="">
                    <Button className="bg-olive text-white hover:bg-darkolive rounded-full size-12 items-center justify-center">
                      <SlHeart className="size-6" />
                    </Button>
                  </div>
                </div>
                {/* The Card Details */}
                <div className="w-full flex flex-col gap-5">
                  {/* Card Description */}
                  <p className="text-xl lg:text-2xl">
                    {venueData.description.String}
                  </p>
                  <div className="">
                    <ul className="flex flex-col gap-4 text-xl lg:text-2xl">
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Location:
                        </span>
                        <span className="inline-block">
                          {venueData.location.String}
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Maximum Capacity:
                        </span>
                        <span className="inline-block">
                          {venueData.capacity.Int32} People
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Facilities:
                        </span>
                        <span className="inline-block">
                          {venueData.facilities.join(", ")}
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Rate/Price:
                        </span>
                        <span className="inline-block">
                          ${venueData.booking_price.Int64}/hour
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mb-10">
                <Button className="font-roboto bg-olive text-white hover:bg-darkolive rounded-md w-full">
                  Book Space
                </Button>
              </CardFooter>
            </Card>
      </div>
    </section>
  )
}



