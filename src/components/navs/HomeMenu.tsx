"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { buttonVariants, Button } from "../ui/button";

import { FiLogOut, RxHamburgerMenu } from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
interface UserData {
  email: string;
  password: string;
}

function HomeMenu() {
  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data) as UserData;
      setUserData(user);
    }
  }, []);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            aria-label='Button to display the Mobile Navbar'
            variant={"ghost"}
            className={"hover:bg-transparent"}
            onClick={() => setOpen(true)}
          >
            <RxHamburgerMenu className='text-2xl !size-6' />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetHeader className='sr-only'>
            <SheetTitle>Mobile Sidebar</SheetTitle>
            <SheetDescription>
              Mobile Sidebar for on page links
            </SheetDescription>
          </SheetHeader>
          <nav className='mt-20 flex flex-col gap-y-2 text-[#333] font-worksans font-medium text-base'>
            <Link
              href={"/about"}
              className={cn(
                "px-6 py-3"
                //   {
                //   "text-purple-500": "about" == activeSection,
                // }
              )}
            >
              About
            </Link>
            <Link
              href={"/offerings"}
              className={cn(
                "px-6 py-3"
                //   {
                //   "text-purple-500": "services" == activeSection,
                // }
              )}
            >
              Offerings
            </Link>
            <Link
              href={"/contact"}
              className={cn(
                "px-6 py-3"
                //   {
                //   "text-purple-500": "certifications" == activeSection,
                // }
              )}
            >
              Contact
            </Link>
          </nav>
          <div className=''>
            <div className='p-6'>
              {userData ? (
                <Button className='w-full bg-red-500/20 hover:bg-red-500/30'
                onClick={() => {
                  // Clear user data from localStorage and state
                  localStorage.removeItem("user");
                  setUserData(null);
                }}
                >
                  <FiLogOut className='text-red-500' />
                  <span className='font-dm_sans font-normal text-base text-red-500'>
                    Logout
                  </span>
                </Button>
              ) : (
                <Link href="/login" className={cn("w-full block !bg-olive !hover:bg-olive text-xl text-white py-4 px-10", buttonVariants())}>
                  Log In
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HomeMenu;
