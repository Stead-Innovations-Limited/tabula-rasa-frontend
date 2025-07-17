"use client";

import { useState, useEffect } from "react";
import { HiOutlineArrowRight } from "@/components/icons";
import { TimeInput } from "@heroui/react";
import { parseTime, Time } from "@internationalized/date";
import { useWorkDaysToggle, WorkDay } from "@/hooks/useAvailabilityDaysToggle";
import { toast } from "sonner";

// This function safely parses a time string, returning a default time if the input is invalid
// This is useful to ensure that the time input is always valid, even if the user does
// not provide a valid time or if the input is null/undefined.
// It uses the parseTime function from @internationalized/date to parse the time string.
function safeParseTime(value: string | null | undefined): Time {
  try {
    if (!value) return parseTime("00:00");
    return parseTime(value);
  } catch {
    return parseTime("00:00");
  }
}
const warningClass = {
  classNames: {
    toast: "!text-orange-500",
    title: "!text-orange-500",
    description: "!text-orange-500",
  },
  duration: 8000,
};
export default function DayHourCard({
  day,
  dayObj,
}: {
  day: string;
  dayObj: WorkDay;
}) {
  const setWorkDays = useWorkDaysToggle((state) => state.setWorkDays);

  const [openTime, setOpenTime] = useState(() =>
    safeParseTime(dayObj.opens_at)
  );
  const [closeTime, setCloseTime] = useState(() =>
    safeParseTime(dayObj.closes_at)
  );

  // Keep local state in sync if props change (optional but safe)
  useEffect(() => {
    setOpenTime(safeParseTime(dayObj.opens_at));
  }, [dayObj.opens_at]);

  useEffect(() => {
    setCloseTime(safeParseTime(dayObj.closes_at));
  }, [dayObj.closes_at]);
  return (
    <div className='w-full flex rounded-2xl border-2 border-olive overflow-clip'>
      <div className='bg-olive text-white w-1/3 md:w-1/6 md:aspect-[2/1] flex items-center justify-center text-sm md:text-xl font-semibold px-3 py-5 md:p-5'>
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </div>
      <div className='grow flex items-center justify-center gap-1 md:gap-10 px-1'>
        <div className='md:px-8 py-1 border border-solid border-olive rounded-lg flex flex-col justify-center items-center grow md:grow-0'>
          <TimeInput
            aria-label='Start Time'
            granularity='second'
            value={openTime}
            onChange={(val) => {
              if (!val) return;

              if (val.compare(closeTime) > 1) {
                toast.warning(
                  "Opening time must be before closing time",
                  warningClass
                );
              }

              setOpenTime(val);

              const h = String(val.hour).padStart(2, "0");
              const m = String(val.minute).padStart(2, "0");
              const s = String(val.second).padStart(2, "0");

              setWorkDays((prev) => ({
                ...prev,
                [day]: {
                  ...prev[day],
                  opens_at: `${h}:${m}:${s}`,
                },
              }));
            }}
          />
        </div>
        <HiOutlineArrowRight className='size-5 md:size-8 text-olive' />
        <div className='md:px-18 py-1 border border-solid border-olive rounded-lg flex flex-col justify-center items-center grow md:grow-0'>
          <TimeInput
            aria-label='End Time'
            granularity='second'
            value={closeTime}
            onChange={(val) => {
              if (!val) return;

              if (val.compare(openTime) < 0) {
                toast.warning(
                  "Closing time must be after opening time",
                  warningClass
                );
              }

              setCloseTime(val);

              const h = String(val.hour).padStart(2, "0");
              const m = String(val.minute).padStart(2, "0");
              const s = String(val.second).padStart(2, "0");

              setWorkDays((prev) => ({
                ...prev,
                [day]: {
                  ...prev[day],
                  closes_at: `${h}:${m}:${s}`,
                },
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
