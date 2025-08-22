"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

function RetreatCards({ data }: {data: Event}) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <Card className="pt-0 overflow-clip border-none h-full">
      <CardContent className='relative aspect-[296/327.61] md:aspect-[412/456] p-0'>
        { !imgErr ? <Image
          src={data.image_links[0]}
          alt={data.theme.String}
          fill={true}
          className="object-cover object-center"
          onError={() => setImgErr(true)}
        />: <Skeleton className='absolute object-cover object-center w-full h-full' />}
      </CardContent>
      <CardHeader className="font-nunito">
        <CardTitle className="text-2xl">{data.name}</CardTitle>
        <CardDescription className="text-base line-clamp-1">
          {data.description.String}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="ml-auto bg-olive hover:bg-olive text-white font-roboto text-xl px-12 py-4">
          <Link href={`/events/${data.id}`}>
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RetreatCards;
