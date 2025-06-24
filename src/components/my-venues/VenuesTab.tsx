import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

import {
  SlLocationPin,
  GoPerson,
  PiCurrencyDollarSimple,
  PiHouse,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import VenueCardPopOverMenu from "../Menus/VenueCardPopOverMenu";

export default function VenuesTab() {
  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex px-5 py-6 md:py-14'>
        <Tabs
          defaultValue='open'
          className='w-full flex flex-col items-center gap-6'
        >
          <TabsList className='w-full md:w-3/4 flex'>
            <TabsTrigger value='open' className='grow'>
              Open
            </TabsTrigger>
            <TabsTrigger value='closed' className='grow'>
              Closed
            </TabsTrigger>
          </TabsList>
          <TabsContent value='open' className='w-full flex flex-col gap-5 p-5 md:p-10 rounded-3xl shadow-lg'>
            {Array.from({ length: 3 }, (_, index) => (
              <VenueCards index={index} key={index} />
            ))}

            <Button className='w-full md:w-3/4 md:!h-fit py-3 bg-olive hover:bg-olive/90 text-white mx-auto mt-10 text-lg'>List New Venue</Button>
          </TabsContent>
          <TabsContent
            value='closed'
            className='w-full flex flex-col gap-5 grayscale p-5 md:p-10 rounded-3xl shadow-lg'
          >
            {Array.from({ length: 2 }, (_, index) => (
              <VenueCards index={index} key={index} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function VenueCards({ index }: { index: number }) {
  return (
    <Card
      className={cn(
        "w-full flex flex-col md:flex-row md:items-start py-5 overflow-clip !gap-0 md:gap-4 !shadow-none !rounded-none",
        index !== 0 && ""
      )}
    >
      <CardHeader className='w-full md:w-64 aspect-square md:aspect-[3/2] relative rounded-xl overflow-clip'>
        <Image
          src='/room1.webp'
          alt='Venue Image'
          fill={true}
          className='absolute object-cover object-center'
        />
        <CardTitle className='sr-only'>Venue Card</CardTitle>
        <CardDescription className='sr-only'>Venue card.</CardDescription>
      </CardHeader>
      <CardContent className='grow relative flex flex-col items-start justify-center gap-2 md:gap-6 z-2 py-4 md:py-0 px-0 md:px-5 text-olive font-roboto'>
        <h5 className='flex gap-2 text-2xl font-medium'>
          Serene Waters Retreat Center
        </h5>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <p className='flex items-start gap-1 text-xl'>
            <PiHouse className='size-6 text-olive' />
            Retreat Center
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <PiCurrencyDollarSimple className='size-6 text-olive' />
            80.00/hr
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <SlLocationPin className='size-6 text-olive' /> The Wellness Hub,
            VI, Lagos
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <GoPerson className='size-6 text-olive' /> 50
          </p>
        </div>
      </CardContent>
      <CardFooter className='hidden md:flex'>
        <VenueCardPopOverMenu />
      </CardFooter>
    </Card>
  );
}
