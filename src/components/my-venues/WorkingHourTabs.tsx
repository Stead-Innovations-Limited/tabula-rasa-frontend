"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DayHourCard from "@/components/my-venues/DayHourCard";
import availabilityDaySetting from "@/hooks/useAvailability";
import useVenueSchedule from "@/hooks/useVenueSchedule";

export default function WorkingHourTabs() {
  const daySetting = availabilityDaySetting((state) => state.daySetting);
  const setDaySetting = availabilityDaySetting((state) => state.setDaySettings);
  const venueSchedule = useVenueSchedule((state) => state.venueSchedule);
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
          {Object.entries(venueSchedule).map(([key, dayObj]) => (
            dayObj.is_open && <DayHourCard
              key={key}
              day={key}
              dayObj={dayObj}
            />
          ))}
        </TabsContent>
        <TabsContent value="custom" className="w-full flex flex-col gap-5">
          {Object.entries(venueSchedule).map(([key, dayObj]) => (
            key !== "sunday" && key !== "saturday" && dayObj.is_open && <DayHourCard
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
