import { DashboardFilter } from "../reusable-ui/Input";

export default function DashboardBanner() {
  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-4 lg:gap-0 md:flex-row md:justify-between p-5 lg:py-14'>
        <div className='font-roboto text-olive'>
          <h2 className='text-3xl md:text-4xl font-semibold'>Explore Our Offerings</h2>
          <p className='text-lg md:text-xl md:max-w-80 lg:max-w-160'>
            Discover a curated selection of experiences designed for your
            well-being, from rejuvenating retreats to inspiring wellness
            sessions.
          </p>
        </div>
        <div className='grow flex flex-col items-end justify-center'>
          <DashboardFilter className="w-full md:max-w-80 py-2"/>
        </div>
      </div>
    </section>
  );
}
