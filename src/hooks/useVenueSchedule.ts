import { create } from "zustand";
import { combine } from "zustand/middleware";
import workSchedule from "@/lib/workSchedule"; // Assuming this is the initial work schedule structure
import { WorkDays } from "@/hooks/useAvailabilityDaysToggle"; // Importing the type for WorkDays

const useVenueSchedule = create(
  combine({ venueSchedule: {} as WorkDays }, (set) => ({
    setVenueSchedule: (update: WorkDays | ((prev: WorkDays) => WorkDays)) =>
      set((state) => ({
        venueSchedule:
          typeof update === "function" ? update(state.venueSchedule) : update,
      })),

    // This function will be used to initialze the work days
    setInitVenueSchedule: (fetchedWorkSchedule: WorkDays | null) => {
      // Because of the way we will be saving the data in the backend, we always have to prefill
      const prefilledData = fetchedWorkSchedule ? {
        ...workSchedule,
        ...fetchedWorkSchedule, // Merge with fetched data
      } : workSchedule;
      set({ venueSchedule: prefilledData as WorkDays });
    },
  }))
);

export default useVenueSchedule;
