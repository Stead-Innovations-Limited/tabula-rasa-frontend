"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SubBookingsNav() {
  const path = usePathname();
  const pathname = path.split("/")[3] || "";

  return (
    <ul className='flex gap-4 text-lg md:text-xl font-roboto text-olive'>
      <li className=''>
        <Link
          href='/my-venues/1/view-bookings'
          className={cn("inline-block px-2 py-4", {
            "border-b-2 border-olive": pathname === "view-bookings",
          })}
        >
          Bookings
        </Link>
      </li>
      <li className=''>
        <Link
          href='/my-venues/1/view-availability'
          className={cn("inline-block px-2 py-4", {
            "border-b-2 border-olive": pathname === "view-availability",
          })}
        >
          Availability
        </Link>
      </li>
    </ul>
  );
}

