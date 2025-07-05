"use client";
import Link from "next/link";


export default function MyPagesDropMenu() {

  return (
    <div
      className='w-full flex flex-col z-50 bg-white text-olive rounded-2xl shadow-lg divide divide-solid divide-olive overflow-clip'
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
