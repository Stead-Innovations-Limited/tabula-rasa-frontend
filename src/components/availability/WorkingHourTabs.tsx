import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DayHourCard from "./DayHourCard";

export default function WorkingHourTabs() {
  return (
     <div className="flex w-full">
      <Tabs defaultValue="custom" className="w-full flex flex-col items-center gap-6">
        <TabsList className="w-full md:w-3/4 flex">
          <TabsTrigger value="everyday" className="grow">Everyday</TabsTrigger>
          <TabsTrigger value="custom" className="grow">Custom</TabsTrigger>
        </TabsList>
        <TabsContent value="everyday" className="w-full flex flex-col gap-5">
          {Array.from({ length: 7 }, (_, index) => (
            <DayHourCard
              key={index}
            />
          ))}
        </TabsContent>
        <TabsContent value="custom" className="w-full flex flex-col gap-5">
          {Array.from({ length: 5 }, (_, index) => (
            <DayHourCard
              key={index}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
