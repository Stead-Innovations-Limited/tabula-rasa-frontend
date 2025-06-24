import { HiOutlineArrowRight } from "@/components/icons";

export default function DayHourCard() {
  return (
    <div className="w-full flex rounded-2xl border-2 border-olive overflow-clip">
      <div className="bg-olive text-white md:w-1/6 md:aspect-[2/1] flex items-center justify-center text-lg md:text-2xl font-semibold p-5">
        Monday
      </div>
      <div className="grow flex items-center justify-center gap-1 md:gap-10 px-3 md:px-0 ">
        <div className="md:px-18 py-1 border border-solid border-olive rounded-lg flex flex-col justify-center items-center grow md:grow-0">
          09:00 AM
        </div>
        <HiOutlineArrowRight className="size-5 md:size-8 text-olive" />
        <div className="md:px-18 py-1 border border-solid border-olive rounded-lg flex flex-col justify-center items-center grow md:grow-0">
          05:00 PM
        </div>
      </div>
    </div>
  )
}
