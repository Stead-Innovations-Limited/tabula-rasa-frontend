"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { SlLocationPin, GoStarFill, GoArrowUpRight } from "@/components/icons";

interface EventProps {
  userId: string
  imgUrl: string;
  imgAlt: string;
  name: string;
  specialty: string;
  stars?: number;
  address: string;
}

export default function PracticionersCards({
  userId,
  imgUrl,
  imgAlt,
  name,
  specialty,
  stars = 4,
  address,
}: EventProps) {

  const fallbackImgUrl = "/avatar.jpg"

  const imgUrlString = imgUrl?.trim() && !imgUrl.includes("example.com") ? imgUrl :"/avatar.jpg";
  const imgAltString = imgAlt || "Practitioner Image";
  const starsCount = stars > 5 ? 5 : stars < 0 ? 0 : stars; // Ensure stars are between 0 and 5
  const starsData = Math.round(starsCount); // Round to the nearest whole number
  const nameString = name || ""; // Fallback for name if not provided
  const specialtyString = specialty || ""; // Fallback for specialty if not provided
  const addressString = address || ""; // Fallback for address if not provided

  const [imgSrc, setImgSrc] = useState(imgUrlString)

  return (
    <Card className='py-0 overflow-clip !gap-0'>
      <CardHeader className='w-full aspect-square relative'>
        <Link href={`/practicioners/${userId}`} className="relative z-5 my-5 ml-auto bg-olive size-10 rounded-xl flex items-center justify-center">
          <GoArrowUpRight className="size-5 text-white" />
        </Link>
        <Image src={imgSrc} alt={imgAltString} fill={true} className='absolute object-cover object-center' onError={() => setImgSrc(fallbackImgUrl)}/>
        <CardTitle className='sr-only'>{nameString}</CardTitle>
        <CardDescription className='sr-only'>
          Event card about the {nameString} event.
        </CardDescription>
      </CardHeader>
      <CardContent className='relative flex flex-col items-center justify-center gap-2 rounded-xl -mt-5 z-2 bg-white py-4 px-5 text-olive font-roboto'>
        <h5 className='text-2xl font-medium'>{nameString}</h5>
        <p className='text-lg px-6 py-0.5 bg-lightolive rounded-lg'>{specialtyString}</p>
        <p className='flex items-center gap-2 text-lg'>
          {
            Array.from({length: starsData}).map((_, index) => (
             <GoStarFill key={index} className="size-6 text-[#FDBF21]"/> 
            ))
          }
        </p>
        <p className='flex items-center gap-1 text-lg'><SlLocationPin className="size-4 text-olive" /> {addressString}</p>
      </CardContent>
    </Card>
  );
}
