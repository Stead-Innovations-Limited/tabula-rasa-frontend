"use client";

import { usePathname } from "next/navigation";
import { HiPlus, FaHeart, SlHeart, LuShoppingCart, LuBell } from "@/components/icons";
import AvatarComponent from "../reusable-ui/AvatarComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BusinessDashboardMenu from "../Menus/BusinessDashboardMenu";

import Link from "next/link";
import MyPagesDropMenu from "../Menus/MyPagesDropMenu";
import { cn } from "@/lib/utils";
import UserDashboardMenu from "../Menus/UserDashboardMenu";
import { useSession } from "next-auth/react";

export default function FullBusinessNavBarSearch() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userData = session?.user;
  return (
    <div className='w-full bg-olive'>
      <header className='w-full xl:max-w-[1140px] mx-auto flex flex-row justify-between items-center p-5 lg:px-5 text-white'>
        <h1 className='font-alex text-3xl lg:text-5xl'>Tabula Rasa</h1>
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
            <LuShoppingCart className='size-6' />
          </Link>
          <Link href='#' className='hidden md:block'>
            <LuBell className='size-6' />
          </Link>
          <Link href='#'>
            <Popover>
              <PopoverTrigger>
                <AvatarComponent
                  imgUrl={userData?.profileImage || undefined}
                  firstname={userData?.firstName || ""}
                  lastname={userData?.lastName || ""}
                />
              </PopoverTrigger>
              <PopoverContent>
                {userData && (userData.roles === "Personal Account" ? <UserDashboardMenu userData={userData}/>: <BusinessDashboardMenu userData={userData}/>)}
              </PopoverContent>
            </Popover>
          </Link>
        </nav>
      </header>
    </div>
  );
}
