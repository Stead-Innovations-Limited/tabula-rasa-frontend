import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";


interface RoomData {
  roomName: string;
  location: string;
  image: string;
}

export default function VenueOverviewImageSlides({roomData}: {roomData: RoomData[]}) {
  return (
    <Carousel className='w-full h-full' orientation="horizontal">
      <CarouselContent className='w-full h-full -ml-0'>
        {roomData.map((ele, index) => (
          <CarouselItem key={index} className='w-full h-full pl-0 relative'>
           <Image src={ele.image} alt={ele.roomName} fill={true} className="absolute object-cover object-center"/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='absolute inset-0 flex flex-col justify-end pb-10'>
        <CarouselDots />
      </div>
      <CarouselPrevious className='absolute top-[50%] left-5 size-[50px] bg-white border border-[#979797] z-50 text-olive' />
      <CarouselNext className='absolute top-[50%] right-5 size-[50px] bg-white border border-[#979797] z-50 text-olive' />
    </Carousel>
  );
}
