"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AvatarComponent from "../reusable-ui/AvatarComponent";
import { User } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  RxPerson,
  GrBookmark,
  HiOutlineTicket,
  PiCurrencyCircleDollar,
  SlLocationPin,
  LuCalendarDays,
  BsChevronRight,
} from "@/components/icons";

import logoutAction from "@/server-actions/logoutAction";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function SheetMenu({
  userData,
}: {
  userData: User | undefined;
}) {
  const router = useRouter()
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  // const [open, setOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <AvatarComponent
          imgUrl={userData?.profileImage || "https://res.cloudinary.com/drlrawk5w/image/upload/v1724100934/profilePic_gxon9j.webp"}
          firstname={userData?.firstName || ""}
          lastname={userData?.lastName || ""}
        />
      </SheetTrigger>
      <SheetContent iconType='right' className='overflow-hidden !w-full !gap-0'>
        <SheetHeader className=''>
          <SheetTitle className='font-roboto font-medium text-olive text-2xl'>
            My Profile
          </SheetTitle>
          <SheetDescription className='sr-only'>
            This is a side menu where you can access various user options. From
            selecting your profile to viewing your saved venues and events if
            you are on a personal account. If you are on a business account, you
            can access your dashboard and manage your business pages. You can
            also log out from here.
          </SheetDescription>
        </SheetHeader>
        <div className='w-full flex flex-col gap-4 p-5 z-50 bg-white flex-1 overflow-y-auto px-4'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='size-28 rounded-full overflow-clip relative'>
              <Image
                src={
                  userData?.profileImage ||
                  "https://res.cloudinary.com/drlrawk5w/image/upload/v1724100934/profilePic_gxon9j.webp"
                }
                alt='User Profile Image'
                fill
                className='object-cover object-center scale-125'
              />
            </div>

            {userData && (
              <>
                <h5 className='text-xl font-medium text-black text-center'>
                  {userData?.firstName} {userData?.lastName}
                </h5>
                {userData?.roles !== "Personal Account" && userData?.field && (
                  <p className='text-base px-6 py-0.5 bg-lightgreen text-olive rounded-lg'>
                    {userData?.field}
                  </p>
                )}
              </>
            )}
          </div>
          {userData && (
            <div className='flex flex-col text-olive rounded-2xl shadow-2xl divide-y-1 divide-olive overflow-clip'>
              <Link
                href={
                  userData?.roles === "Personal Account"
                    ? "/personal-profile"
                    : "/business-profile"
                }
                className={cn(
                  "w-full flex items-center justify-between gap-2 hover:bg-lightgreen px-4 py-2",
                  pathname === "/personal-profile" ||
                    pathname === "/business-profile"
                    ? "bg-lightgreen"
                    : ""
                )}
                onClick={() => close()}
              >
                <RxPerson className='size-5' />
                <p className='grow flex flex-col'>
                  <span className='inline-block'>My Profile</span>
                  <span className='inline-block text-[0.625rem]'>
                    Your personal info and settings, all in one place.
                  </span>
                </p>
                <BsChevronRight className='text-xs' />
              </Link>
              <Link
                href='/bookings'
                className={cn(
                  "flex items-center justify-between gap-2 hover:bg-lightgreen px-4 py-2",
                  pathname === "/bookings" ? "bg-lightgreen" : ""
                )}
                onClick={() => close()}
              >
                <GrBookmark className='size-5' />

                <p className='grow flex flex-col'>
                  <span className='inline-block'>Reservations</span>
                  <span className='inline-block text-[0.625rem]'>
                    View and manage your upcoming bookings.
                  </span>
                </p>
                <BsChevronRight className='text-xs' />
              </Link>
              {userData?.roles === "Business Account" && (
                <div className='contents divide-y divide-olive'>
                  <Link
                    href='/availability'
                    className={cn(
                      "flex items-center justify-between gap-2 hover:bg-lightgreen px-4 py-2",
                      pathname.startsWith("/availability")
                        ? "bg-lightgreen"
                        : ""
                    )}
                    onClick={() => close()}
                  >
                    <LuCalendarDays className='size-5' />
                    <p className='grow flex flex-col'>
                      <span className='inline-block'>My Schedule</span>
                      <span className='inline-block text-[0.625rem]'>
                        Stay on top of your upcoming plans.
                      </span>
                    </p>
                    <BsChevronRight className='text-xs' />
                  </Link>
                  <Link
                    href='/my-events'
                    className={cn(
                      "flex items-center justify-between gap-2 hover:bg-lightgreen px-4 py-2",
                      pathname.startsWith("/my-events") ? "bg-lightgreen" : ""
                    )}
                    onClick={() => close()}
                  >
                    <HiOutlineTicket className='size-5' />
                    <p className='grow flex flex-col'>
                      <span className='inline-block'>My Events</span>
                      <span className='inline-block text-[0.625rem]'>
                        Track and manage your created events.
                      </span>
                    </p>
                    <BsChevronRight className='text-xs' />
                  </Link>
                  <Link
                    href='/my-venues'
                    className={cn(
                      "flex items-center justify-between gap-2 hover:bg-lightgreen px-4 py-2",
                      pathname.startsWith("/my-venues") ? "bg-lightgreen" : ""
                    )}
                    onClick={() => close()}
                  >
                    <SlLocationPin className='size-5' />
                    <p className='grow flex flex-col'>
                      <span className='inline-block'>My Venues</span>
                      <span className='inline-block text-[0.625rem]'>
                        Browse and update your listed venues.
                      </span>
                    </p>
                    <BsChevronRight className='text-xs' />
                  </Link>
                  <Link
                    href='/account'
                    className={cn(
                      "flex items-center justify-between gap-2 hover:bg-lightgreen px-4 py-2",
                      pathname === "/account" ? "bg-lightgreen" : ""
                    )}
                    onClick={() => close()}
                  >
                    <PiCurrencyCircleDollar className='size-5' />
                    <p className='grow flex flex-col'>
                      <span className='inline-block'>Payments</span>
                      <span className='inline-block text-[0.625rem]'>
                        Check your payment history and manage billing.
                      </span>
                    </p>
                    <BsChevronRight className='text-xs' />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <SheetFooter>
          <Button
            className='w-full bg-olive hover:bg-olive/90 text-white rounded-md'
            onClick={async () => {
              close(); // Close the menu before logging out
              
              // If We are not authenticated, we log in
              // Or else we simply logout 
              if (!userData) {
                router.push("/login");
              } else {
                // Handle Logout functionality
                const logOutResponse = await logoutAction();
                if (logOutResponse.success) {
                  await signOut({ callbackUrl: "/" });
                }
              }
            }}
          >
            {userData ? "Log Out" : "Log In"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
