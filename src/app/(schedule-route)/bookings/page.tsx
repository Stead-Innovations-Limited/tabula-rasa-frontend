export const dynamic = "force-dynamic";
import BookingsContainer from "@/components/bookings/BookingsContainer";
import getPractServices from "@/server-actions/getPractServices";
import { ServiceBooking } from "@/lib/types";

export default async function page() {
   
  const pract = (await getPractServices()) as | ServiceBooking[] | { error: boolean; errorData?: string; message?: string };
  if (!Array.isArray(pract)) {
    return (
      <div className='flex justify-center items-center text-center text-xl my-10 text-red-500'>
        {"Failed to fetch bookings"}
      </div>
    );
  }

  return (
    <>
      <BookingsContainer bookings={pract}/>
    </>
  );
}
