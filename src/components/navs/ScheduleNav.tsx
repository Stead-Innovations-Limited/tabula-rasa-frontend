"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function ScheduleNav() {
  const path = usePathname();
  const pathname = path.split("/")[1] || "";
  return (
    <ul className='flex gap-4 text-lg md:text-xl font-roboto text-olive'>
      <li className=''>
        <Link
          href='/bookings'
          className={cn("inline-block px-2 py-4", {
            "border-b-2 border-olive": pathname === "bookings",
          })}
        >
          Bookings
        </Link>
      </li>
      <li className=''>
        <Link
          href='/availability'
          className={cn("inline-block px-2 py-4", {
            "border-b-2 border-olive": pathname === "availability",
          })}
        >
          Availability
        </Link>
      </li>
    </ul>
  );
}

export default ScheduleNav;
