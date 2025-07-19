import Link from "next/link";
import { getDay } from "date-fns";

export default function ContactDetails() {
  const today = new Date()
  const dayIndex = getDay(today);
  const message = dayIndex !== 6 && dayIndex !== 0 ? "Open today 09:00am - 05:00pm": "You have to have made an appointment";
  return (
    <section>
      <div className='text-[#898989] font-roboto flex flex-col gap-10'>
        <div className="">
          <p className='mb-10'>
            In addition to retreats, we provide a variety of retreat venue
            management services.
          </p>
          <p className=''>
            Fill out a <Link className="underline hover:decoration-0 hover:text-olive" href={"#"}>Personalized retreat</Link> or{" "}
            <Link className="underline hover:decoration-0 hover:text-olive" href={"#"}>Venue management application</Link> and attach
            file. We look forward to working with you.
          </p>
        </div>
        <div className='flex flex-col gap-8'>
          <h3 className="text-3xl text-olive font-semibold">Tabula Rasa Stays</h3>
          <div className=''>
            <h5 className="text-2xl text-olive font-semibold mb-8">Hours</h5>
            <p className="mb-6">Today: { message }</p>
            <p className="mb-0">Monday - Friday: 09:00am - 05:00pm</p>
            <p className="mb-0">Saturday: By appointment</p>
            <p className="">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
