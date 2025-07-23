"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PaymentsNav() {
  const path = usePathname();
  const pathname = path.split("/")[1] || "";
  return (
    <ul className='flex gap-4 text-lg md:text-xl font-roboto text-olive'>
      <li className=''>
        <Link
          href='/account'
          className={cn("inline-block px-2 py-4", {
            "border-b-2 border-olive": pathname === "account",
          })}
        >
          Account
        </Link>
      </li>
      <li className=''>
        <Link
          href='/bank-details'
          className={cn("inline-block px-2 py-4", {
            "border-b-2 border-olive": pathname === "bank-details",
          })}
        >
          Bank Details
        </Link>
      </li>
    </ul>
  );
}
