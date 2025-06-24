import { format } from "date-fns";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress"

import {
  SlLocationPin,
  GoPerson,
  PiCurrencyDollarSimple,
  LuCalendarDays,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export default function EventsTab() {
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
          <TabsContent value='open' className='w-full flex flex-col gap-5'>
            {Array.from({ length: 3 }, (_, index) => (
              <EventCards index={index} key={index} />
            ))}
          </TabsContent>
          <TabsContent value='closed' className='w-full flex flex-col gap-5 grayscale'>
            {Array.from({ length: 2 }, (_, index) => (
              <EventCards index={index} key={index} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function EventCards({ index }: { index: number }) {
  return (
    <Card
      className={cn(
        "w-full flex flex-col md:flex-row md:items-center py-5 overflow-clip !gap-0 md:gap-4 !shadow-none !rounded-none",
        index !== 0 && ""
      )}
    >
      <CardHeader className='w-full md:w-64 aspect-[200/240] relative rounded-xl overflow-clip'>
        <Image
          src='/praying-model.jpg'
          alt='Event Image'
          fill={true}
          className='absolute object-cover object-center'
        />
        <CardTitle className='sr-only'>Event Card</CardTitle>
        <CardDescription className='sr-only'>Event card.</CardDescription>
      </CardHeader>
      <CardContent className='grow relative flex flex-col items-start justify-center gap-2 md:gap-6 z-2 py-4 px-0 md:px-5 text-olive font-roboto'>
        <h5 className='flex gap-2 text-2xl font-medium'>
          Serene Saturday:{" "}
          <span className='inline-block font-normal'>
            Yoga & Sound Bath Retreat
          </span>
        </h5>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <p className='flex items-start gap-1 text-xl'>
            <LuCalendarDays className='size-6 text-olive' />{" "}
            {format(new Date("7-19-2025"), "PPPP")}
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <PiCurrencyDollarSimple className='size-6 text-olive' />
            80.00
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <SlLocationPin className='size-6 text-olive' /> The Wellness Hub,
            VI, Lagos
          </p>
          <p className='flex items-start gap-1 text-xl'>
            <GoPerson className='size-6 text-olive' /> All Levels Welcome
          </p>
        </div>
        <Progress value={50} className="" />
      </CardContent>
    </Card>
  );
}
