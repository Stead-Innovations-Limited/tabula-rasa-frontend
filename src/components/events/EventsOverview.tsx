import Image from "next/image";

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




function EventsOverview() {
  return (
    <section className="w-full">
      <div className="w-full p-5 lg:px-10 xl:max-w-[1140px] mx-auto font-nunito">
        <Card className='py-0 overflow-clip !gap-0'>
              <CardHeader className='w-full aspect-video md:aspect-[16/7] relative'>  
                <Image src="/meditation.webp" alt="Meditation Haven" fill={true} className='absolute object-cover object-center' />
                <CardTitle className='sr-only'>Autumn Equinox Guided Meditation</CardTitle>
                <CardDescription className='sr-only'>
                  Event card about a Meditation event.
                </CardDescription>
              </CardHeader>
              <CardContent className='relative flex flex-col items-center justify-center gap-5 rounded-xl -mt-5 z-2 bg-white py-10 px-5 md:px-10 text-olive'>
                <div className="w-full flex flex-col gap-4 sm:flex-row items-start justify-between">
                  {/* The Event name and type div */}
                  <div className="flex flex-col gap-4">
                    <h2 className="text-olive font-nunito text-2xl lg:text-3xl font-semibold">
                      Autumn Equinox Guided Meditation
                    </h2>
                    <p className="bg-lightgreen text-olive w-fit rounded-md px-14 py-0.5 text-base md:text-lg">
                      Meditation
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
                <div className="flex flex-col gap-5">
                  {/* Card Description */}
                  <p className="text-xl lg:text-2xl">
                    Join a guided meditation to honor the Autumn Equinox, a time of natural balance and transition. Connect with the season &rsquo; s grounding energies to find inner peace and clarity. This session is a perfect way to pause, reflect, and align yourself for the season ahead, suitable for all levels.
                  </p>
                  <div className="">
                    <ul className="flex flex-col gap-4 text-xl lg:text-2xl">
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Key Activities:
                        </span>
                        <span className="inline-block">
                          Guided Meditation, Breathwork
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Target Audience:
                        </span>
                        <span className="inline-block">
                          All Levels Welcome
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Location:
                        </span>
                        <span className="inline-block">
                          Online (Virtual)
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Start Date:
                        </span>
                        <span className="inline-block">
                          Sunday, September 22, 2025
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          End Date:
                        </span>
                        <span className="inline-block">
                          Sunday, September 22, 2025
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Time:
                        </span>
                        <span className="inline-block">
                          10:00 AM - 11:00 AM WAT
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Price per Participant:
                        </span>
                        <span className="inline-block">
                          $20.00
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mb-10">
                <Button className="font-roboto bg-olive text-white hover:bg-darkolive rounded-md w-full">
                  Get Tickets
                </Button>
              </CardFooter>
            </Card>
      </div>
    </section>
  )
}

export default EventsOverview