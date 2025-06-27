"use client";

import { useState } from "react";
import Link from "next/link";

import { CiSearch, SlHeart, LuShoppingCart, LuBell, FaHeart, HiPlus } from "@/components/icons";
import AvatarComponent from "../reusable-ui/AvatarComponent";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserData } from "@/app/page";

export default function DashboardMainNav({ renderMenu, userData }: { renderMenu: (blur: () => void) => React.ReactNode, userData?: UserData }) {
  const pathname = usePathname();
  const [menuOpened, setMenu] = useState(false);

  return (
    <div className='w-full bg-olive'>
      <header className='w-full xl:max-w-[1140px] mx-auto flex flex-row justify-between items-center p-5 lg:px-5 text-white'>
        <h1 className='font-alex text-3xl lg:text-5xl'>Tabula Rasa</h1>
        {/* The Search Input */}
        <div className='hidden md:flex items-center justify-start relative w-full max-w-[400px] h-8'>
          <CiSearch className='ml-2 size-6 text-olive relative z-2' />
          <Input
            type='text'
            placeholder=''
            className='absolute inset-0 bg-white text-olive placeholder:text-olive placeholder:font-normal font-roboto text-lg rounded-full pl-10 pr-4 py-2 caret-olive'
          />
        </div>

        <nav className='flex items-center gap-8 font-roboto font-normal text-2xl'>
          {userData!.roles !== "Personal Profile" && <Link href="/create" className={cn('hidden md:block')}>
            <HiPlus className='size-6' />
          </Link>}
          <Link href='/saved' className={cn('hidden md:block')}>
            {pathname === "/saved"? <FaHeart className="size-6"/> :<SlHeart className='size-6' />}
          </Link>
          <Link href='#' className='hidden md:block'>
            <LuShoppingCart className='size-6' />
          </Link>
          <Link href='#' className='hidden md:block'>
            <LuBell className='size-6' />
          </Link>
          <Link href='#'>
            <AvatarComponent
              imgUrl='https://github.com/shadcn.png'
              firstname={userData!.firstName}
              lastname={userData!.lastName}
              setMenu={setMenu}
            />
          </Link>
        </nav>
        {menuOpened && renderMenu(() => setMenu(false))}
      </header>
    </div>
  )
}
