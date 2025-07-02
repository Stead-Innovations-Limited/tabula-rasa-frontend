"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { RxPerson, GrBookmark } from "@/components/icons";
import useMenuBlur from "@/hooks/useMenuBlur";

import { UserData } from "@/app/page";
import { signOut } from "next-auth/react";


export default function UserDashboardMenu({ blur, userData }: { blur: () => void, userData?: UserData }) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  useMenuBlur(menuRef, blur);
   
  return (
    <div
      ref={menuRef}
      className='w-3/4 md:w-[20rem] flex flex-col gap-4 p-5 absolute top-5 md:top-5 right-5 md:right-6 lg:right-12 z-50 bg-white rounded-2xl shadow-lg'
    >
      <div className='border border-olive rounded-xl flex flex-col items-center justify-center gap-2 p-5'>
        <div className='size-35 rounded-full overflow-clip'>
          <Image
            src='/user.webp'
            alt='User Profile Image'
            width={500}
            height={300}
            className='object-cover object-center'
          />
        </div>
        <h5 className='text-xl font-medium text-black'>{userData?.firstName} {userData?.lastName}</h5>
        <p className='text-base px-6 py-0.5 bg-lightgreen text-olive rounded-lg'>
          Vinyasa Yoga
        </p>
      </div>
      <div className='flex flex-col gap-2 text-olive'>
        <Link
          href='/profile'
          className='flex items-center gap-2 hover:bg-lightgreen px-4 py-1 rounded-md'
        >
          <RxPerson className='size-5' />
          My Profile
        </Link>
        <Link
          href='/saved'
          className='flex items-center gap-2 hover:bg-lightgreen px-4 py-1 rounded-md'
        >
          <GrBookmark className='size-5' />
          Reservations
        </Link>
      </div>
      <Button
        className='w-full bg-olive hover:bg-olive/90 text-white rounded-md'
        onClick={async() => {
          // Handle Logout functionality
          await signOut({ callbackUrl: "/" })
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
