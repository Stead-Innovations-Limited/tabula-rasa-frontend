import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";

function GallerySlides() {
  return (
    <section className='w-full'>
      <div className='relative z-2 w-full py-5 px-5 xl:px-0 lg:py-14 xl:max-w-[1140px] mx-auto'>
        {/* The top nav for  */}
        <Carousel>
          <CarouselContent className='w-full h-full'>
            <CarouselItem className='h-full'>
              <div className='grid grid-cols-8 lg:grid-cols-13 lg:grid-rows-8 gap-x-5 gap-y-8  w-full h-[30rem]'>
                <div className='relative col-span-4 row-span-5 col-start-1 row-start-1 rounded-3xl overflow-clip'>
                  <Image
                    src='/bowl.jpg'
                    alt='Image of a bowl'
                    fill={true}
                    className='object-cover object-center'
                  />
                </div>
                <div className='h-fit col-span-6 row-span-2 col-start-1 row-start-6 z-5 bg-olive text-white rounded-3xl p-5'>
                  At Tabula Rasa, our space is dedicated to supporting your path
                  to healing and well-being.
                </div>
                <div className='relative z-4 col-span-4 col-start-5 row-span-8 row-start-1 rounded-3xl overflow-clip'>
                  <Image
                    src='/praying-model.jpg'
                    alt='Image of a praying model'
                    fill={true}
                    className='object-cover object-center'
                  />
                </div>
                {/* The Navigation buttons */}
                {/* <div className='col-span-5 col-start-9 row-span-1 row-start-1'>
                  <CarouselPrevious className="bg-black text-white"/>
                  <CarouselNext />
                </div> */}
                <div className='hidden lg:block relative z-7 col-span-6 col-start-8 row-span-2 row-start-2 bg-olive text-white p-5 rounded-3xl'>
                  Tabula Rasa connects you to a world of wellness, designed for
                  your discovery and growth.
                </div>
                <div className='hidden lg:block relative col-span-5 col-start-9 row-span-4 row-start-4 rounded-xl overflow-clip'>
                  <Image
                    src='/leaning-model.jpg'
                    alt='Image of a bowl'
                    fill={true}
                    className='object-cover object-center'
                  />
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default GallerySlides;
