import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FiUsers, SlLocationPin, GoArrowUpRight } from "@/components/icons";

interface VenueProps {
  imgUrl: string;
  imgAlt: string;
  venueName: string;
  venuePrice: string;
  attendance: number;
  venueAddress: string;
}

export default function VenueCards({
  imgUrl,
  imgAlt,
  venueName,
  venuePrice,
  attendance,
  venueAddress,
}: VenueProps) {
  return (
    <Card className='w-full py-0 overflow-clip !gap-0'>
      <CardHeader className='w-full aspect-square relative'>
        <span className='relative z-5 my-5 ml-auto bg-olive size-10 rounded-xl flex items-center justify-center'>
          <GoArrowUpRight className='size-5 text-white' />
        </span>
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill={true}
          className='absolute object-cover object-center'
        />
        <CardTitle className='sr-only'>{venueName}</CardTitle>
        <CardDescription className='sr-only'>
          Venue card about the {venueName}.
        </CardDescription>
      </CardHeader>
      <CardContent className='relative flex flex-col items-center justify-center rounded-xl -mt-5 z-2 bg-white py-4 px-5 text-olive font-roboto'>
        <h5 className='text-2xl font-medium'>{venueName}</h5>
        <div className='flex gap-6'>
          <p className='text-lg'>{venuePrice}</p>
          <p className='flex items-center gap-1 text-lg'>
            <FiUsers className='size-4 text-olive' /> {attendance}
          </p>
        </div>
        <p className='flex items-start gap-1 text-lg'>
          <SlLocationPin className='size-4 mt-1 text-olive' /> {venueAddress}
        </p>
      </CardContent>
    </Card>
  );
}
