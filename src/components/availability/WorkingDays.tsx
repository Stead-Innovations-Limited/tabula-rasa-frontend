import { Toggle } from "@/components/ui/toggle";
const days = [
  { name: "Monday", value: "monday" },
  { name: "Tuesday", value: "tuesday" },
  { name: "Wednesday", value: "wednesday" },
  { name: "Thursday", value: "thursday" },
  { name: "Friday", value: "friday" },
  { name: "Saturday", value: "saturday" },
  { name: "Sunday", value: "sunday" },
];

export default function WorkingDays() {
  return (
    <div className='w-full'>
      <div className='w-full flex flex-col gap-4'>
        <div className='flex flex-col gap-1 font-roboto text-olive'>
          <h4 className='text-3xl md:text-4xl font-semibold'>Working Days</h4>
          <p className='text-lg md:text-xl'>
            Select days your weekly working days
          </p>
        </div>
        <div className=''>
          <DayToggle />
        </div>
      </div>
    </div>
  );
}

function DayToggle() {
  return (
    <div className='w-full flex flex-wrap md:flex-nowrap gap-4 '>
      {days.map((day) => (
        <Toggle variant={"outline"} aria-label={`Toggle ${day.name}`} key={day.value} value={day.value} className="md:w-full">
          {day.name}
        </Toggle>
      ))}
    </div>
  );
}
