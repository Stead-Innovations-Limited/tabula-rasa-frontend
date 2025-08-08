export const dynamic = "force-dynamic";

import AvailabilityContainer from "@/components/availability/AvailabilityContainer";
import getWorkSchedule from "@/server-actions/getWorkSchedule";
import { WorkingSchedule } from "@/lib/types";

export default async function page() {
  const workSchedule = (await getWorkSchedule()) as
    | WorkingSchedule
    | { error: true; errorData: string; message: string };

  if (workSchedule !== null && "error" in workSchedule && workSchedule.error && workSchedule.message) {
    throw new Error("Error fetching data")
  }

  if (workSchedule === null || !("error" in workSchedule)) {
    return (
      <>
        <AvailabilityContainer workSchedule={workSchedule} />
      </>
    );
  }else {
    throw new Error("Error fetching data")
  }
}
