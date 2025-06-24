import WorkingHourTabs from "./WorkingHourTabs";

export default function WorkingHours() {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-col gap-2 font-roboto text-olive'>
        <h4 className='text-3xl md:text-4xl font-semibold'>Working Hours</h4>
        <p className='text-lg md:text-xl'>
          Let clients know your typical hours of operation or when they can expect to book your services.
        </p>
      </div>
      <WorkingHourTabs />
    </div>
  );
}
