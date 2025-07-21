"use client";

import { useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import availabilityDaySetting from "@/hooks/useAvailability";
import useVenueSchedule from "@/hooks/useVenueSchedule";
import { WorkDay } from "@/hooks/useAvailabilityDaysToggle";

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
  // This tells us which kind of day setting is active
  const daySetting = availabilityDaySetting((state) => state.daySetting);
  const venueSchedule = useVenueSchedule((state) => state.venueSchedule);
  const setVenueSchedule = useVenueSchedule((state) => state.setVenueSchedule);

  useEffect(() => {
      // If the daySetting changes to everyday, we set all days to open
      if (daySetting === "everyday") {
        setVenueSchedule((prev: Record<string, WorkDay>) => {
          const newDays = { ...prev };
          Object.keys(newDays).forEach((key) => {
            newDays[key].is_open = true;
          });
          return newDays;
        });
      }
    }, [daySetting, setVenueSchedule])


  function handleToggle(day: string) {
    // We prevent toggling for Saturday and Sunday if the daySetting is "custom"
    // or if the daySetting is "everyday" we allow toggling for all days
    // This is to ensure that the toggling logic respects the daySetting
    if (daySetting === "everyday" || daySetting === "custom") {
      // Toggle the is_open property for the selected day
    setVenueSchedule((prev: Record<string, WorkDay>) => ({
      ...prev,
      [day]: {
        ...prev[day],
        is_open: !prev[day].is_open,
      },
    }));
  }
  }
  return (
    <div className='w-full flex flex-wrap md:flex-nowrap gap-4 '>
      {Object.entries(venueSchedule).map(([key, dayObj]) => (
        // We use the daySetting to determine which days to show
        // If daySetting is "everyday", we show all days
        // If daySetting is "custom", we show only the days defined in customDays
        <Toggle variant={"outline"} aria-label={`Toggle ${key}`} key={key} value={key} pressed={daySetting === "everyday"? true: dayObj.is_open} onPressedChange={() => handleToggle(key)} className="md:w-full">
          {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
        </Toggle>
      ))}
    </div>
  );
}
