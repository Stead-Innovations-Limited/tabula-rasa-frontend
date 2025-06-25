import SubBookingsNav from "../navs/SubBookingsNav"
export default function SubBookingsBar() {
  return (
    <div className="w-full bg-linear-to-r from-olivewhite to-olive">
      <div className="w-full xl:max-w-[1140px] mx-auto p-5 pb-0">
        <div className="flex flex-col gap-2 font-roboto text-olive">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Bookings
          </h2>
          <p className="text-lg md:text-xl">
            View, update, and organize all your upcoming and past appointments, sessions, or reservations in one convenient place.
          </p>
        </div>
        <SubBookingsNav />
      </div>
    </div>
  )
}
