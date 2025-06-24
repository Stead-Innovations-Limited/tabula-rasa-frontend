import { AiOutlineClockCircle, BsPinAngle, SlLocationPin, RxDotsVertical } from "@/components/icons";
import { Button } from "../ui/button";

export default function BookingsCard() {
  return (
    <div className="border-2 border-solid border-olive rounded-2xl flex flex-col gap-5 md:gap-0 md:flex-row items-center text-olive p-5 h-fit">
      <div className="md:w-1/6 md:aspect-square flex flex-col justify-center items-center md:pr-5 font-semibold">
        <h5 className="text-2xl">
          SAT
        </h5>
        <h6 className="text-8xl md:text-5xl">
          10
        </h6>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:border-l-2 border-olive md:pl-5">
        <div className="grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 md:justify-between md:items-center md:grow">
          <p className="flex items-start gap-1 text-xl">
            <AiOutlineClockCircle className="text-olive size-6" />
            10:00 AM - 11:00 AM
          </p>
          <p className="flex items-start gap-1 text-xl">
            <BsPinAngle className="text-olive size-9 md:size-8" />
            Stress Management, Anxiety, Cognitive Behavioral Therapy
          </p>
          <p className="flex items-start gap-1 text-xl">
            <SlLocationPin className="text-olive size-6" />
            Madurai Tamil Nadu
          </p>
          <p className="text-xl  text-white">
            <span className="size-6 bg-olive rounded-full inline-flex items-center justify-center">A</span>
            <span className="size-6 bg-olive rounded-full inline-flex items-center justify-center">A</span>
          </p>
        </div>
        <Button className="hidden md:block bg-transparent hover:bg-transparent text-olive">
          <RxDotsVertical className="" />
        </Button>
      </div>
    </div>
  )
}
