import { Button } from "../ui/button";
import WorkingDays from "./WorkingDays";
import WorkingHours from "./WorkingHours";
export default function AvailabilityContainer() {
  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-5 flex flex-col gap-8 py-10'>
        <div className="w-full flex justify-end">
          <Button className='bg-olive text-white hover:bg-olive/90 px-14 py-1'>Save</Button>
        </div>
        <WorkingDays />
        <WorkingHours />
      </div>
    </section>
  );
}
