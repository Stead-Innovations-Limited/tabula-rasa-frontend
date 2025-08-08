export const dynamic = "force-dynamic";
import BookingsContainer from "@/components/bookings/BookingsContainer";
import getPractServices from "@/server-actions/getPractServices";
import { ServiceBooking } from "@/lib/types";

export default async function page() {
   
  const pract = (await getPractServices()) as | ServiceBooking[] | { error: boolean; errorData?: string; message?: string };
  if (!Array.isArray(pract)) {
    throw new Error("Error fetching data")
  }

  return (
    <>
      <BookingsContainer bookings={pract}/>
    </>
  );
}
