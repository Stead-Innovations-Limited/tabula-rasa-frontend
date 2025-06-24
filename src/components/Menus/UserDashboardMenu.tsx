"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { RxPerson, GrBookmark } from "@/components/icons";
import useMenuBlur from "@/hooks/useMenuBlur";
interface UserData {
  email: string;
  password: string;
}


export default function UserDashboardMenu({ blur }: { blur: () => void }) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  useMenuBlur(menuRef, blur);
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data) as UserData;
      setUserData(user);
    }
  }, []);
  console.log("User Data:", userData)
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
        <h5 className='text-xl font-medium text-black'>Micheal Stewart</h5>
        <p className='text-base px-6 py-0.5 bg-lightgreen text-olive rounded-lg'>
          Vinyasa Yoga
        </p>
      </div>
      <div className='flex flex-col gap-2 text-olive'>
        <Link
          href='/'
          className='flex items-center gap-2 hover:bg-lightgreen px-4 py-1 rounded-md'
        >
          <RxPerson className='size-5' />
          My Profile
        </Link>
        <Link
          href='/'
          className='flex items-center gap-2 hover:bg-lightgreen px-4 py-1 rounded-md'
        >
          <GrBookmark className='size-5' />
          Reservations
        </Link>
      </div>
      <Button
        className='w-full bg-olive hover:bg-olive/90 text-white rounded-md'
        onClick={() => {
          // Clear user data from localStorage and state
          localStorage.removeItem("user");
          setUserData(null);
          router.refresh()
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
