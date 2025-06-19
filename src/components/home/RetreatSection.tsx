import RetreatCards from "./RetreatCards";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

function RetreatSection() {
  return (
    <section className='lg:-mt-[31rem] w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-8 py-10 md:py-5'>
        <h3 className='hidden md:block text-center font-nunito italic text-[2.625rem] md:text-olive lg:text-white'>
          Revitalize Your Mind and Body
        </h3>
      
        <Carousel className="w-full" opts={{ startIndex: 1 }}>
          <CarouselContent className='-ml-3 md:-ml-5'>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-9/10 md:basis-1/2 lg:basis-1/3 pl-3 md:pl-5'
              >
                <RetreatCards />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </div>
    </section>
  );
}

export default RetreatSection;
