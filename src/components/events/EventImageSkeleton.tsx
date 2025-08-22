"use client";

import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { Event } from "@/lib/types";

export default function EventImageSkeleton({
  eventData,
}: {
  eventData: Event;
}) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <>
      {eventData.image_links[0] && !imgErr ? (
        <Image
          src={eventData.image_links[0]}
          alt={eventData.name}
          fill={true}
          className='absolute object-cover object-center'
          onError={() => setImgErr(true)}
        />
      ) : (
        <Skeleton className='absolute object-cover object-center w-full h-full' />
      )}
    </>
  );
}