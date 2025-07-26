"use client";
import Link from "next/link";

import {
  CiSearch,
  SlHeart,
  LuBell,
  FaHeart,
  HiPlus,
  GoBellFill,
} from "@/components/icons";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import MyPagesDropMenu from "../Menus/MyPagesDropMenu";
import { useSession } from "next-auth/react";
import PopOverMenu from "../Menus/PopOverMenu";
import SheetMenu from "../Menus/SheetMenu";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function FullUserNavBarSearch() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userData = session?.user;
  const isMobile = useIsMobile();


  return (
    <div className='w-full bg-olive'>
      <header className='w-full xl:max-w-[1140px] mx-auto flex flex-row flex-wrap gap-y-3 md:gap-y-0 justify-between items-center p-5 lg:px-5 text-white'>
        <h1 className='font-alex text-3xl lg:text-5xl order-1'>
          <Link href={"/"}>Tabula Rasa</Link>
        </h1>
        {/* The Search Input */}
        <div className='md:flex items-center justify-center relative w-full max-w-[400px] h-8 order-3 md:order-2'>
          <CiSearch className='size-6 text-olive absolute left-2 top-1/2 -translate-y-1/2 z-2' />
          <Input
            type='text'
            placeholder=''
            className='absolute inset-0 bg-white text-olive placeholder:text-olive placeholder:font-normal font-roboto text-lg rounded-[0.625rem] md:rounded-full pl-10 pr-4 py-2 caret-olive'
          />
        </div>

        <nav className='flex items-center gap-3 md:gap-8 font-roboto font-normal text-2xl order-2 md:order-3'>
          {userData && userData.roles !== "Personal Account" && (
            <div className=''>
              <Popover>
                <PopoverTrigger asChild>
                  <HiPlus className='size-5 md:size-6' />
                </PopoverTrigger>
                <PopoverContent>
                  <MyPagesDropMenu />
                </PopoverContent>
              </Popover>
            </div>
          )}
          <Link href='/saved' className={cn("hidden md:block")}>
            {pathname === "/saved" ? (
              <FaHeart className='size-6' />
            ) : (
              <SlHeart className='size-6' />
            )}
          </Link>
          <Link href='notifications' className=''>
            {pathname === "/notifications" ? (
              <GoBellFill className='size-5 md:size-6' />
            ) : (
              <LuBell className='size-5 md:size-6' />
            )}
          </Link>
          {isMobile ? <SheetMenu userData={userData} />:<PopOverMenu userData={userData} />}
        </nav>
      </header>
    </div>
  );
}
