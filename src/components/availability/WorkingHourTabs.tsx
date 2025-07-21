"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DayHourCard from "./DayHourCard";
import availabilityDaySetting from "@/hooks/useAvailability";
import { useWorkDaysToggle } from "@/hooks/useAvailabilityDaysToggle";

export default function WorkingHourTabs() {
  const daySetting = availabilityDaySetting((state) => state.daySetting);
  const setDaySetting = availabilityDaySetting((state) => state.setDaySettings);
  const workDays = useWorkDaysToggle((state) => state.workDays);
  return (
     <div className="flex w-full">
      <Tabs value={daySetting} onValueChange={(value) => {
        if(value === "everyday" || value === "custom") {
          setDaySetting(value);
        }
      }} className="w-full flex flex-col items-center gap-6">
        <TabsList className="w-full md:w-3/4 flex">
          <TabsTrigger value="everyday"  className="grow">Everyday</TabsTrigger>
          <TabsTrigger value="custom" className="grow">Custom</TabsTrigger>
        </TabsList>
        <TabsContent value="everyday" className="w-full flex flex-col gap-5">
          {Object.entries(workDays).map(([key, dayObj]) => (
            dayObj.is_open && <DayHourCard
              key={key}
              day={key}
              dayObj={dayObj}
            />
          ))}
        </TabsContent>
        <TabsContent value="custom" className="w-full flex flex-col gap-5">
          {Object.entries(workDays).map(([key, dayObj]) => (
            dayObj.is_open && <DayHourCard
              key={key}
              day={key}
              dayObj={dayObj}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
