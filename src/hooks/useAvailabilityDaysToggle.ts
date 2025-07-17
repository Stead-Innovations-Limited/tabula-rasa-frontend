import { create } from "zustand";
import { combine } from "zustand/middleware";
import getWorkSchedule from "@/server-actions/getWorkSchedule";
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

    fetchAndSetWorkDays: async () => {
      const result = await getWorkSchedule();
      if ("error" in result && result.error) {
        console.error("Failed to fetch work schedule:", result.message);
        return;
      }

      // Because of the way we will be saving the data in the backend, we always have to prefill
      const prefilledData = {
        ...workSchedule,
        ...result, // Merge with fetched data
      }
      set({ workDays: prefilledData as WorkDays });
    },
  }))
);

export { useWorkDaysToggle };
