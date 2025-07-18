import AvailabilityContainer from "@/components/availability/AvailabilityContainer";
import getWorkSchedule from "@/server-actions/getWorkSchedule";
import { WorkingSchedule } from "@/lib/types";

export default async function page() {
  const workSchedule = (await getWorkSchedule()) as
    | WorkingSchedule
    | { error: true; errorData: string; message: string };

  if ("error" in workSchedule && workSchedule.error && workSchedule.message) {
    return <p>Failed to fetch work schedule</p>;
  }

  if (!("error" in workSchedule)) {
    return (
      <>
        <AvailabilityContainer workSchedule={workSchedule} />
      </>
    );
  }else {
    return (
      <p>{"An error occurred while fetching the work schedule."}</p>
    );
  }
}
