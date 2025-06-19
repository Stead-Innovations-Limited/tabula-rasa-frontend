import Image from "next/image";
import SubscriptionForm from "./SubscriptionForm";
function Subscription() {
  return (
    <section className='w-full'>
      {/* This div contains two other divs */}
      <div className='flex w-full xl:max-w-[calc(1140px+(100vw-1140px)/2)] mr-auto py-10'>
        <div className='relative rounded-r-4xl hidden lg:block lg:w-2/5 aspect-[675/625] overflow-clip'>
          <Image
            src='/insights.jpg'
            alt='Depiction of wellness insight'
            fill={true}
          />
        </div>
        <div className='flex flex-col justify-center p-5 lg:pl-16 w-full lg:w-3/5 font-nunito gap-5 lg:gap-10'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-center lg:text-left  font-bold text-3xl lg:text-[3rem]/tight text-olive'>
              Elevate Your Well-Being: Get Wellness Insights
            </h3>
            <p className='font-normal text-olive'>
              Stay inspired and informed on your path to well-being. Subscribe
              to the Tabula Rasa newsletter for curated wellness insights,
              inspiring stories, expert tips from practitioners, and updates on
              new retreats, venues, and offerings added to the platform.
            </p>
          </div>
          {/* The form */}
          <SubscriptionForm />
        </div>
      </div>
    </section>
  );
}

export default Subscription;
