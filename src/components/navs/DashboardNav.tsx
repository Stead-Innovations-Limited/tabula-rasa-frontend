"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const path = usePathname();
  const pathname = path.split("/")[1] || "";

  return (
    <section className='w-full bg-linear-to-r from-olivewhite to-olive font-roboto font-medium text-olive'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-5'>
        <ul className="flex gap-4 text-lg md:text-xl">
          <li className=''>
            <Link href="/dashboard" className={cn("inline-block px-2 py-4", {"border-b-2 border-olive":pathname === "dashboard"})}>All</Link>
          </li>
          <li className=''>
            <Link href="/events" className={cn("inline-block px-2 py-4", {"border-b-2 border-olive":pathname === "events"})}>Events</Link>
          </li>
          <li className=''>
            <Link href="/venues" className={cn("inline-block px-2 py-4", {"border-b-2 border-olive":pathname === "venues"})}>Venues</Link>
          </li>
          <li className=''>
            <Link href="/practicioners" className={cn("inline-block px-2 py-4", {"border-b-2 border-olive":pathname === "practicioners"})}>Practicioners</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
