import { create } from "zustand";
import { combine } from "zustand/middleware";
import workSchedule from "@/lib/workSchedule"; // Assuming this is the initial work schedule structure

export interface WorkDay {
  is_open: boolean;
  opens_at: string;
  closes_at: string;
}

export type WorkDays = Record<string, WorkDay>; // or 'monday' | 'tuesday' | ... if you want stricter types

const useWorkDaysToggle = create(
  combine({ workDays: {} as WorkDays }, (set) => ({
    setWorkDays: (update: WorkDays | ((prev: WorkDays) => WorkDays)) =>
      set((state) => ({
        workDays:
          typeof update === "function" ? update(state.workDays) : update,
      })),

    // This function will be used to initialze the work days
    setInitWorkDays: (fetchedWorkSchedule: WorkDays | null) => {
      // Because of the way we will be saving the data in the backend, we always have to prefill
      const prefilledData = fetchedWorkSchedule ? {
        ...workSchedule,
        ...fetchedWorkSchedule, // Merge with fetched data
      }: workSchedule;
      set({ workDays: prefilledData as WorkDays });
    },
  }))
);

export { useWorkDaysToggle };
