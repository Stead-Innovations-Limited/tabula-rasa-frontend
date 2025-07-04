import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoStarFill } from "@/components/icons";
import EventsContainer from "./EventsContainer";
import VenuesContainer from "./VenuesContainer";
import getUserById from "@/server-actions/getUserById";
import { User } from "@/lib/types";

async function PractitionersOverview({id}: {id: string}) {
  const userDetails = await getUserById(id) as User;

  const field = userDetails.field.String || "Vinyasa Yoga";
  const businessName = userDetails.business_name.String || "Femi Adebayo";
  const location = userDetails.address.String || "Lagos, Nigeria";
  const description = userDetails.bio.String || 
    "Guiding Journeys to Inner Peace & Embodied Wellness | Certified Yoga Instructor | Mindfulness Coach | Reiki Master";
  

  return (
    <section className='w-full'>
      <div className='w-full p-5 lg:px-10 xl:max-w-[1140px] mx-auto font-nunito'>
        <Card className='py-0 overflow-clip !gap-0'>
          <CardHeader className='!flex flex-col w-full relative !px-0'>
            <div className='w-full aspect-[3/1] md:aspect-[6/1] bg-olive' />
            {/* Tmage section */}
            <div className='w-full px-5 md:px-10 flex flex-col gap-5'>
              <div className='flex flex-col gap-5 md:gap-0 md:flex-row items-start md:items-center md:justify-between -mt-15 md:-mt-24'>
                <div className='relative  size-30 md:size-48 rounded-full overflow-hidden'>
                  <Image
                    src='/user.webp'
                    alt='User Profile Image'
                    fill={true}
                    className='absolute object-cover object-center'
                  />
                </div>

                <Button className='font-roboto px-18 py-2 rounded-full text-white bg-olive hover:bg-olive md:mt-16'>
                  {" "}
                  Book{" "}
                </Button>
              </div>
              <div className='flex flex-col gap-2 font-roboto text-olive'>
                <p className='w-fit text-lg px-6 py-0.5 bg-lightolive rounded-lg'>
                  { field }
                </p>
                <div className='flex items-center gap-4'>
                  <h3 className='text-2xl font-medium'>
                    { businessName }
                  </h3>
                  <div className='flex gap-1'>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <GoStarFill
                        key={index}
                        className='size-6 text-[#FDBF21]'
                      />
                    ))}
                  </div>
                </div>
                <p className='text-xl'>
                 { description}
                </p>
                <p className='text-xl font-medium'>{location}</p>
              </div>
            </div>

            <CardTitle className='sr-only'>
              Autumn Equinox Guided Meditation
            </CardTitle>
            <CardDescription className='sr-only'>
              Event card about a Meditation event.
            </CardDescription>
          </CardHeader>
          <CardContent className='relative flex flex-col items-center justify-center gap-5 z-2 bg-white pt-10 px-5 md:px-10 text-olive'>
            <EventsContainer />
            <VenuesContainer />
          </CardContent>
          
        </Card>
      </div>
    </section>
  );
}

export default PractitionersOverview;
