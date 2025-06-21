import { BsChevronRight } from "@/components/icons";
import { practicionersData } from "@/lib/practicionersData";
import PracticionersCards from "./PracticionersCard";
import Link from "next/link";

export default function PracticionersContainer() {
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <h4 className='text-xl md:text-2xl'>Practicioners</h4>
          <Link href="/practicioners" className='flex gap-1 items-center justify-center text-base md:text-lg'>
            See all practicioners
            <BsChevronRight />
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8'>{/* The Event Cards */}
          {
            practicionersData.map((data, index) => (
              <PracticionersCards
                key={index}
                imgUrl={data.imgUrl}
                imgAlt={data.imgAlt}
                name={data.name}
                specialty={data.specialty}
                stars={data.stars}
                address={data.address}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}
