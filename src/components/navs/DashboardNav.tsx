"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const path = usePathname();
  const pathname = path.split("/")[1] || "";

  return (
    <section className='w-full md:bg-linear-to-r md:from-olivewhite md:to-olive font-roboto font-medium text-olive'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-1 md:px-5'>
        <ul className="flex gap-4 text-sm md:text-xl overflow-x-auto scrollbar-hide py-5 md:py-0 md:overflow-clip">
          <li className=''>
            <Link href="/dashboard" className={cn("inline-block px-4 py-1 md:px-2 md:py-4 bg-lightolive md:bg-transparent text-olive rounded-md md:rounded-none", {"bg-olive md:bg-transparent text-white md:text-olive md:border-b-2 md:border-olive":pathname === "dashboard"})}>All</Link>
          </li>
          <li className=''>
            <Link href="/events" className={cn("inline-block px-4 py-1 md:px-2 md:py-4 bg-lightolive md:bg-transparent text-olive rounded-md md:rounded-none", {"bg-olive md:bg-transparent text-white md:text-olive md:border-b-2 md:border-olive":pathname === "events"})}>Events</Link>
          </li>
          <li className=''>
            <Link href="/venues" className={cn("inline-block px-4 py-1 md:px-2 md:py-4 bg-lightolive md:bg-transparent text-olive rounded-md md:rounded-none", {"bg-olive md:bg-transparent text-white md:text-olive md:border-b-2 md:border-olive":pathname === "venues"})}>Venues</Link>
          </li>
          <li className=''>
            <Link href="/practicioners" className={cn("inline-block px-4 py-1 md:px-2 md:py-4 bg-lightolive md:bg-transparent text-olive rounded-md md:rounded-none", {"bg-olive md:bg-transparent text-white md:text-olive md:border-b-2 md:border-olive":pathname === "practicioners"})}>Practicioners</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
