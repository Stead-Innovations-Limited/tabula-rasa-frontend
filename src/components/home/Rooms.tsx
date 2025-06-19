import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";


const roomData = [
  {
    roomName: "Room 1",
    location: "Tabula Rasa Resort",
    image: "/room1.webp",
  },
  {
    roomName: "Room 2",
    location: "Tabula Rasa Resort",
    image: "/room2.webp",
  },
  {
    roomName: "Room 3",
    location: "Tabula Rasa Resort",
    image: "/room1.webp",
  },
];

interface RoomData {
  roomName: string;
  location: string;
  image: string;
}

function Rooms() {
  return (
    <section className='w-full'>
      <div className='w-full '>
        <Carousel className='w-full h-full'>
          <CarouselContent className="w-full h-full aspect-[390/424] lg:aspect-[1512/774] -ml-0">
            {roomData.map((ele, index) => (
              <CarouselItem key={index} className="w-full pl-0">
                <RoomSlide
                  roomName={ele.roomName}
                  location={ele.location}
                  image={ele.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute inset-0 flex flex-col justify-end pb-5">
            <CarouselDots />
          </div>
          <CarouselPrevious className='ute top-[50%] left-5 size-[50px] bg-white/20 border border-[#979797] z-50' />
          <CarouselNext className='absolute top-[50%] right-5 size-[50px] bg-white/20 border border-[#979797] z-50' />
        </Carousel>
      </div>

      {/* The icon section */}
      <div className='w-full bg-olive'>
        <div className='relative z-2 w-full py-5 px-5 xl:px-0 lg:py-14 xl:max-w-[1140px] mx-auto grid grid-cols-4 font-roboto '>
            {/* Exploration icon */}
            <div className="flex flex-col justify-center items-center">
              <div className="relative size-8 lg:size-12">
                <Image src="/explore-icon.svg" fill={true} alt="explore icon" className=""/>
              </div>
              <p className="text-center text-white text-sm lg:text-xl">
                Explore
              </p>
            </div>
            {/* Sessions icon */}
            <div className="flex flex-col justify-center items-center">
              <div className="relative size-8 lg:size-12">
                <Image src="/session.svg" fill={true} alt="session icon"/>
              </div>
              <p className="text-center text-white text-sm lg:text-xl">
                Sessions
              </p>
            </div>
            {/* Venues icon */}
            <div className="flex flex-col justify-center items-center">
              <div className="relative size-8 lg:size-12">
                <Image src="/location.svg" alt="location icon" fill={true}/>
              </div>
              <p className="text-center text-white text-sm lg:text-xl">
                Venues
              </p>
            </div>
            {/* Events icon */}
             <div className="flex flex-col justify-center items-center">
              <div className="relative size-8 lg:size-12">
                <Image src="/events-icon.svg" alt="events icon" fill={true}/>
              </div>
              <p className="text-center text-white text-sm lg:text-xl">
                Events
              </p>
            </div>
        </div>
      </div>
    </section>
  );
}

function RoomSlide(props: RoomData) {
  return (
    <div className='w-full h-full relative'>
      <div className='absolute inset-0 z-1'>
        <Image src={props.image} alt={props.roomName} fill={true} className="object-cover object-center"/>
      </div>
      <div className='relative z-2 w-full p-5 xl:max-w-[1140px] mx-auto'>
        <div className='flex gap-2'>
          <Separator orientation='vertical' className="bg-black !h-16 !w-1" />
          <div className='flex flex-col gap-2 font-roboto'>
            <h5 className='text-3xl font-medium'>{props.roomName}</h5>
            <p className='text-base'>{props.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
