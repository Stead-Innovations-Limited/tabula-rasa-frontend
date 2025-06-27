"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

import { UserData } from "@/app/page";

import HomeMenu from "@/components/Menus/HomeMenu";
import AvatarComponent from "../reusable-ui/AvatarComponent";

function NavBar({
  renderMenu,
  userData,
}: {
  renderMenu: (blur: () => void) => React.ReactNode;
  userData?: UserData | null;
}) {
  const [menuOpened, setMenu] = useState(false);

  return (
    <div className='w-full'>
      <header className='w-full xl:max-w-[1140px] mx-auto flex items-center justify-between font-roboto p-5 lg:pt-10 lg:px-5'>
        <h1 className='font-alex text-olive text-3xl lg:text-5xl'>
          Tabula Rasa
        </h1>
        <nav className='hidden lg:flex gap-10 items-center font-roboto font-normal text-2xl text-olive'>
          <Link href=''>About</Link>
          <Link href=''>Offerings</Link>
          <Link href=''>Contact</Link>
        </nav>
        <div className='hidden lg:block'>
          {userData ? (
            <AvatarComponent
              imgUrl='https://github.com/shadcn.png'
              firstname={userData.firstName}
              lastname={userData.lastName}
              setMenu={setMenu}
            />
          ) : (
            <Button
              asChild
              className='bg-olive hover:bg-olive text-xl text-white py-4 px-10 rounded-xl'
            >
              <Link href='/login'>Log In</Link>
            </Button>
          )}
        </div>

        <div className='lg:hidden'>
          <HomeMenu userData={userData? true: false}/>
        </div>
      </header>
      {menuOpened && renderMenu(() => setMenu(false))}
    </div>
  );
}

export default NavBar;
