import Image from "next/image";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className='relative'>
      <div className='w-full xl:max-w-[calc(1140px+(100vw-1140px)/2)] ml-auto flex flex-col-reverse lg:flex-row p-0 lg:pl-5'>
        {/* The main description */}
        <div className='relative -mt-26 lg:mt-0 pt-32 lg:static lg:w-[45%] flex flex-col gap-4 font-nunito bg-olive text-cream lg:bg-transparent lg:text-olive p-5 lg:pt-26 lg:pb-0 lg:px-0 text-center lg:text-left'>
          <Image
            src='/shadow-sm.png'
            alt='shadow'
            fill={true}
            className='lg:hidden aspect-[467/134] z-1'
          />
          <div className='contents z-2'>
            <h2 className='hidden lg:block font-bold text-olive text-6xl/tight whitespace-nowrap break-normal'>
              Elevate Your Wellbeing
              <br />
              With Tabula Rasa
            </h2>
            <p className='text-xl/normal font-medium'>
              Tabula Rasa: Your Gateway to Transformative
              <br className='hidden lg:block' />
              Wellness Experiences. Explore our diverse offerings,
              <br className='hidden lg:block' />
              from mindfulness workshops to rejuvenating retreats,
              <br className='hidden lg:block' />
              and embark on a journey of self-discovery and
              <br className='hidden lg:block' />
              personal growth
            </p>
            <Button className='w-full lg:w-fit h-10 bg-white lg:bg-olive hover:bg-white lg:hover:bg-olive text-olive lg:text-white rounded-xl px-14 
            py-5 lg:py-6 text-xl font-medium'>
              Explore Now
            </Button>
          </div>
        </div>
        {/* The Image section */}
        <div className='relative w-full md:w-[55%] md:mx-auto aspect-[401/407] lg:aspect-[289/315]'>
          <Image
            src='/wellness-lady.png'
            alt='The image of a lady enjoying a good wellness experience'
            fill={true}
            className='drop-shadow-[0px_20px_15px_rgba(0,0,0,0.5)] z-20'
          />
        </div>
        {/* The Mobile heading section */}
        <div className=''>
          <h2 className='lg:hidden font-bold text-olive text-2xl text-center'>
            Elevate Your Wellbeing With
            <br />
            Tabula Rasa
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Hero;
