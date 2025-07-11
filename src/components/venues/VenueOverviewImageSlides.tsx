import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";

export default function VenueOverviewImageSlides({
  images,
}: {
  images: string[];
}) {
  return (
    <Carousel className='w-full h-full' orientation='horizontal'>
      <CarouselContent className='w-full h-full -ml-0'>
        {images.map((img, index) => (
          <CarouselItem key={index} className='w-full h-full pl-0 relative'>
            <Image
              src={img}
              alt={img + index}
              fill={true}
              className='absolute object-cover object-center'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='absolute inset-0 flex flex-col justify-end pb-10'>
        <CarouselDots />
      </div>
      {images.length > 1 && (
        <CarouselPrevious className='absolute top-[50%] left-5 size-[50px] bg-white border border-[#979797] z-50 text-olive' />
      )}
      {images.length > 1 && (
        <CarouselNext className='absolute top-[50%] right-5 size-[50px] bg-white border border-[#979797] z-50 text-olive' />
      )}
    </Carousel>
  );
}
