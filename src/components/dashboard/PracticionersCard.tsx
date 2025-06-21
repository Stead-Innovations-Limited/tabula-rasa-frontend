import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { SlLocationPin, GoStarFill, GoArrowUpRight } from "@/components/icons";

interface EventProps {
  imgUrl: string;
  imgAlt: string;
  name: string;
  specialty: string;
  stars: number;
  address: string;
}

export default function PracticionersCards({
  imgUrl,
  imgAlt,
  name,
  specialty,
  stars,
  address,
}: EventProps) {
  return (
    <Card className='py-0 overflow-clip !gap-0'>
      <CardHeader className='w-full aspect-square relative'>
        <span className="relative z-5 my-5 ml-auto bg-olive size-10 rounded-xl flex items-center justify-center">
          <GoArrowUpRight className="size-5 text-white" />
        </span>
        <Image src={imgUrl} alt={imgAlt} fill={true} className='absolute object-cover object-center' />
        <CardTitle className='sr-only'>{name}</CardTitle>
        <CardDescription className='sr-only'>
          Event card about the {name} event.
        </CardDescription>
      </CardHeader>
      <CardContent className='relative flex flex-col items-center justify-center gap-2 rounded-xl -mt-5 z-2 bg-white py-4 px-5 text-olive font-roboto'>
        <h5 className='text-2xl font-medium'>{name}</h5>
        <p className='text-lg px-6 py-0.5 bg-lightolive rounded-lg'>{specialty}</p>
        <p className='flex items-center gap-2 text-lg'>
          {
            Array.from({length: stars}).map((_, index) => (
             <GoStarFill key={index} className="size-6 text-[#FDBF21]"/> 
            ))
          }
        </p>
        <p className='flex items-center gap-1 text-lg'><SlLocationPin className="size-4 text-olive" /> {address}</p>
      </CardContent>
    </Card>
  );
}
