"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserData {
  email: string;
  password: string;
}

import HomeMenu from "@/components/navs/HomeMenu";

function NavBar() {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data) as UserData;
      setUserData(user);
    }
  }, []);

  console.log("User Data:", userData, userData?.email);
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
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback className="!size-10 flex items-center justify-center bg-olive text-white">
                {userData ? userData?.email.slice(0, 2).toUpperCase() : "AY"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button className='bg-olive hover:bg-olive text-xl text-white py-4 px-10 rounded-xl'>
              Log In
            </Button>
          )}
        </div>

        <div className='lg:hidden'>
          <HomeMenu />
        </div>
      </header>
    </div>
  );
}

export default NavBar;
