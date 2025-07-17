import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type DaySetting = "everyday" | "custom";
type SetDaySetting = DaySetting | ((prev: DaySetting) => DaySetting); 

const availabilityDaySetting = create(
  combine({daySetting: "everyday" as DaySetting}, (set) => {
    return {
      setDaySettings: (dayToSet: DaySetting | SetDaySetting) => set((state) => ({
        daySetting: typeof dayToSet == "string" ? dayToSet : dayToSet(state.daySetting)
      }))
    }
  }

  ),
)

export default availabilityDaySetting;