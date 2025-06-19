"use client";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

function HomeMenu() {
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
        <SheetContent>
          <SheetHeader className='sr-only'>
            <SheetTitle>Mobile Sidebar</SheetTitle>
            <SheetDescription>
              Mobile Sidebar for on page links
            </SheetDescription>
          </SheetHeader>
          <nav className='mt-20 flex flex-col gap-y-2 text-[#333] font-worksans font-medium text-base'>
            <Link
                href={"/about"}
                className={cn("px-6 py-3", 
                //   {
                //   "text-purple-500": "about" == activeSection,
                // }
              )}
              >
                About
              </Link>
              <Link
                href={"/offerings"}
                className={cn("px-6 py-3", 
                //   {
                //   "text-purple-500": "services" == activeSection,
                // }
              )}
              >
                Offerings
              </Link>
              <Link
                href={"/contact"}
                className={cn("px-6 py-3", 
                //   {
                //   "text-purple-500": "certifications" == activeSection,
                // }
              )}
              >
                Contact
              </Link>
              
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HomeMenu;
