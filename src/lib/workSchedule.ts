import { WorkDays } from "@/hooks/useAvailabilityDaysToggle";
const workSchedule: WorkDays = {
  monday: { is_open: true, opens_at: "09:00:00", closes_at: "17:00:00" },
  tuesday: { is_open: true, opens_at: "09:00:00", closes_at: "17:00:00" },
  wednesday: { is_open: true, opens_at: "09:00:00", closes_at: "17:00:00" },
  thursday: { is_open: true, opens_at: "09:00:00", closes_at: "17:00:00" },
  friday: { is_open: true, opens_at: "09:00:00", closes_at: "17:00:00" },
  saturday: { is_open: false, opens_at: "09:00:00", closes_at: "17:00:00" },
  sunday: { is_open: false, opens_at: "09:00:00", closes_at: "17:00:00" },
};

export default workSchedule;