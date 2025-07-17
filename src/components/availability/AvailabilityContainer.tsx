"use client";
import { useWorkDaysToggle } from "@/hooks/useAvailabilityDaysToggle";
import { Button } from "../ui/button";
import WorkingDays from "./WorkingDays";
import WorkingHours from "./WorkingHours";
import { useInitWorkSchedule } from "@/hooks/useInitWorkSchedule";
import saveWorkSchedule from "@/server-actions/saveWorkSchedule";
import { toast } from "sonner";
import { parseTime} from "@internationalized/date";

export default function AvailabilityContainer() {
  // Initialize the work schedule when the component mounts
  useInitWorkSchedule();
  const workDays = useWorkDaysToggle((state) => state.workDays);

  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-5 flex flex-col gap-8 py-10'>
        <div className='w-full flex justify-end'>
          <Button
            onClick={async () => {
              // We try to find any day that has an invalid time setting
              // If any day has an invalid time setting, we show an error toast
              const inValidDays = Object.entries(workDays).find(
                // Key is not really used here, but we keep it for clarity
                // We check if the opens_at time is after closes_at time
                ([key, day]) => key && day.opens_at && day.closes_at && parseTime(day.opens_at).compare(parseTime(day.closes_at)) > 1 
              );
              if (inValidDays) {
                // If we found an invalid day, we stop the save operation 
                // Display error toast
                const inValidDay = inValidDays[0].charAt(0).toUpperCase() + inValidDays[0].slice(1);
                toast.error(`${inValidDay}'s start time can not be before end time.`, {
                  classNames: {
                    toast: "!text-red-500",
                    title: "!text-red-500",
                    description: "!text-red-500",
                  },
                });
                return;
              }
              const result = await saveWorkSchedule(workDays);
              if (result.error) {
                // Display error toast
                toast.error(result.message, {
                  classNames: {
                    toast: "!text-red-500",
                    title: "!text-red-500",
                    description: "!text-red-500",
                  },
                });
              } else {
                // Display success toast
                toast.success(result.message, {
                  classNames: {
                    toast: "!text-green-700",
                    title: "!text-green-700",
                    description: "!text-green-700",
                  },
                });
              }
            }}
            className='bg-olive text-white hover:bg-olive/90 px-14 py-1'
          >
            Save
          </Button>
        </div>
        <WorkingDays />
        <WorkingHours />
      </div>
    </section>
  );
}
