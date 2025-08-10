"use client";
import { useState } from "react";
import Link from "next/link";

import { signOut } from "next-auth/react";

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

function HomeMenu({ userData }: { userData: boolean }) {
  const [open, setOpen] = useState<boolean>(false);

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
        <SheetContent className='flex flex-col justify-between'>
          <SheetHeader className='sr-only'>
            <SheetTitle>Mobile Sidebar</SheetTitle>
            <SheetDescription>
              Mobile Sidebar for on page links
            </SheetDescription>
          </SheetHeader>
          <nav className='mt-20 flex flex-col gap-y-2'>
            <p className='px-6 py-3'>
              <Link
                href={"/#about"}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = "about";
                  const el = document.getElementById(targetId);

                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // This is a fallback if we are on a different page
                    window.location.href = `/#${targetId}`;
                  }

                  // Close after a short delay so scroll can happen first
                  setTimeout(() => setOpen(false), 300);
                }}
                className={cn(
                  "text-[#333] font-worksans font-medium text-base"
                )}
              >
                About
              </Link>
            </p>
            <p className='px-6 py-3'>
              <Link
                href={"/#offerings"}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = "offerings";
                  const el = document.getElementById(targetId);

                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // I use this fallback if we are on a different page
                    window.location.href = `/#${targetId}`;
                  }

                  // Close after a short delay so scroll can happen first
                  setTimeout(() => setOpen(false), 300);
                }}
                className={cn(
                  "text-[#333] font-worksans font-medium text-base"
                )}
              >
                Offerings
              </Link>
            </p>
            <p
              className='px-6 py-3'
              onClick={() => setTimeout(() => setOpen(false), 400)}
            >
              <Link
                href={"/contact"}
                className={cn(
                  "text-[#333] font-worksans font-medium text-base"
                )}
              >
                Contact
              </Link>
            </p>
          </nav>
          <div className=''>
            <div className='p-6'>
              {userData ? (
                <Button
                  className='w-full bg-red-500/20 hover:bg-red-500/30'
                  onClick={async () => {
                    setOpen(false);
                    // Handle logout logic here
                    await signOut({ callbackUrl: "/" });
                  }}
                >
                  <FiLogOut className='text-red-500' />
                  <span className='font-dm_sans font-normal text-base text-red-500'>
                    Logout
                  </span>
                </Button>
              ) : (
                <Link
                  href='/login'
                  className={cn(
                    "w-full block !bg-olive !hover:bg-olive text-xl text-white py-4 px-10",
                    buttonVariants()
                  )}
                >
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
