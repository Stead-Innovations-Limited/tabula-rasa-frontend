"use client";
import { useRef } from "react";
import Link from "next/link";

import useMenuBlur from "@/hooks/useMenuBlur";

export default function MyPagesDropMenu({ blur }: { blur: () => void }) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  useMenuBlur(menuRef, blur);

  return (
    <div
      ref={menuRef}
      className='w-3/4 md:w-[20rem] flex flex-col absolute top-5 md:top-5 right-5 md:right-6 lg:right-12 z-50 bg-white text-olive rounded-2xl shadow-lg divide divide-solid divide-olive overflow-clip'
    >
      <Link
        href='/list-venue'
        className='flex items-center justify-center gap-2 px-4 py-2 !border-b '
      >
        List a Venue
      </Link>
      <Link
        href='/create-event'
        className='flex items-center justify-center gap-2 px-4 py-2 !border-b '
      >
        Create an Event
      </Link>
    </div>
  );
}
