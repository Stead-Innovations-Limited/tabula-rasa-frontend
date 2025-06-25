import { BookingsFilter } from "../reusable-ui/Input";
import SubBookingsCard from "./SubBookingsCard";

export default function SubBookingsContainer() {
  return (
    <section className="w-full">
      <div className="w-full xl:max-w-[1140px] mx-auto px-5 py-10 md:py-14">
        <div className="flex justify-end">
          <BookingsFilter className="w-full md:max-w-80 py-2"/>
        </div>
        <div className="space-y-5 md:space-y-8 mt-5 md:mt-8">
          {
            Array.from({ length: 5 }, (_, index) => (
              <SubBookingsCard key={index} />
            ))
          }
        </div>
      </div>
    </section>
  )
}
