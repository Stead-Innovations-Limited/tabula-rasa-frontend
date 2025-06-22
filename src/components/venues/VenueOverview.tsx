
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

const roomData = [
  {
    roomName: "Room 1",
    location: "Tabula Rasa Resort",
    image: "/room1.webp",
  },
  {
    roomName: "Room 2",
    location: "Tabula Rasa Resort",
    image: "/room2.webp",
  },
  {
    roomName: "Room 3",
    location: "Tabula Rasa Resort",
    image: "/room1.webp",
  },
];


export default function VenueOverview() {
  return (
    <section className="w-full">
      <div className="w-full p-5 lg:px-10 xl:max-w-[1140px] mx-auto font-nunito">
        <Card className='py-0 overflow-clip !gap-0'>
              <CardHeader className='flex flex-col w-full aspect-video md:aspect-[16/7] relative !px-0'>  
                <VenueOverviewImageSlides roomData={roomData}/>
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
                      The Tranquil Shala: Yoga Studio & Workshop Space
                    </h2>
                    <p className="bg-lightgreen text-olive w-fit rounded-md px-14 py-0.5 text-base md:text-lg">
                      Retreat Center
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
                    Welcome to The Tranquil Shala, a true urban oasis nestled in the heart of Ikeja, Lagos. Step away from the city &rsquo; s rhythm and enter a space bathed in abundant natural light, designed with a serene and minimalist aesthetic to foster peace and focus. Our purpose-built studio is ideal for a wide range of wellness activities, from dynamic yoga classes and quiet meditation sessions to insightful workshops, healing ceremonies, and intimate community gatherings. We &rsquo; ve cultivated an atmosphere of calm and connection, providing a haven where both practitioners and participants can fully immerse themselves in their practice and find a deeper sense of well-being. This peaceful environment supports deep work and meaningful connection.
                  </p>
                  <div className="">
                    <ul className="flex flex-col gap-4 text-xl lg:text-2xl">
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Location:
                        </span>
                        <span className="inline-block">
                          7 Serenity Lane, Ikeja, Lagos, Nigeria.
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Maximum Capacity:
                        </span>
                        <span className="inline-block">
                          40 People
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Facilities:
                        </span>
                        <span className="inline-block">
                          Wi-Fi, Projector, Screen, Microphones, Speakers, Whiteboards, Flip Charts.
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <span className="inline-block font-medium">
                          Rate/Price:
                        </span>
                        <span className="inline-block">
                          $50/hour
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



