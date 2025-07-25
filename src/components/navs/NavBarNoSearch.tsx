"use client";

import { usePathname } from "next/navigation";
import { HiPlus, FaHeart, SlHeart, LuBell } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";
import MyPagesDropMenu from "../Menus/MyPagesDropMenu";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import PopOverMenu from "../Menus/PopOverMenu";

export default function FullBusinessNavBarSearch() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userData = session?.user;
  return (
    <div className='w-full bg-olive'>
      <header className='w-full xl:max-w-[1140px] mx-auto flex flex-row justify-between items-center p-5 lg:px-5 text-white'>
        <h1 className='font-alex text-3xl lg:text-5xl'>
          <Link href={"/"}>Tabula Rasa</Link>
        </h1>
        <nav className='flex items-center gap-8 font-roboto font-normal text-2xl'>
          {userData && userData.roles !== "Personal Account" && <div className='hidden md:block'>
            <Popover>
              <PopoverTrigger asChild>
                <HiPlus className='size-6' />
              </PopoverTrigger>
              <PopoverContent>
                <MyPagesDropMenu />
              </PopoverContent>
            </Popover>
          </div>}
          <Link href='/saved' className={cn("hidden md:block")}>
            {pathname === "/saved" ? (
              <FaHeart className='size-6' />
            ) : (
              <SlHeart className='size-6' />
            )}
          </Link>
          <Link href='#' className='hidden md:block'>
            <LuBell className='size-6' />
          </Link>
          <Link href='#'>
              <PopOverMenu userData={userData} />
          </Link>
        </nav>
      </header>
    </div>
  );
}
