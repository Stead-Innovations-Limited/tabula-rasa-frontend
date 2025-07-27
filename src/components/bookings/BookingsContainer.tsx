"use client";
import BookingsFilterWrapper from "../filterWrapper/BookingsFilterWrapper";
import BookingsCard from "./BookingsCard";

export default function BookingsContainer() {
  return (
    <section className="w-full">
      <div className="w-full xl:max-w-[1140px] mx-auto px-5 py-10 md:py-14">
        <div className="flex justify-end">
          <BookingsFilterWrapper />
        </div>
        <div className="space-y-5 md:space-y-8 mt-5 md:mt-8">
          {
            Array.from({ length: 5 }, (_, index) => (
              <BookingsCard key={index} />
            ))
          }
        </div>
      </div>
    </section>
  )
}


