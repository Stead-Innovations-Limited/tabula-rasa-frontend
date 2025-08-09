"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { RxPerson, GrBookmark } from "@/components/icons";

import logoutAction from "@/server-actions/logoutAction";
import { UserData } from "@/app/page";
import { signOut } from "next-auth/react";

export default function UserDashboardMenu({
  userData,
  close,
}: {
  userData?: UserData | undefined;
  close: () => void;
}) {
  const router = useRouter();
  //  We handle cases of the user not been authenticated and provide a way for the user to view the pages
  return (
    <div className='w-full flex flex-col gap-4 p-5 z-50 bg-white rounded-2xl shadow-lg'>
      <div className='border border-olive rounded-xl flex flex-col items-center justify-center gap-2 p-5'>
        <div className='size-35 rounded-full overflow-clip relative'>
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
          <h5 className='text-xl font-medium text-black text-center'>
            {userData?.firstName} {userData?.lastName}
          </h5>
        )}
      </div>
      {userData && (
        <div className='flex flex-col gap-2 text-olive'>
          <Link
            href={
              userData?.roles === "Personal Account"
                ? "/personal-profile"
                : "/business-profile"
            }
            className='flex items-center gap-2 hover:bg-lightgreen px-4 py-1 rounded-md'
            onClick={close}
          >
            <RxPerson className='size-5' />
            My Profile
          </Link>
          <Link
            href='/bookings'
            className='flex items-center gap-2 hover:bg-lightgreen px-4 py-1 rounded-md'
            onClick={close}
          >
            <GrBookmark className='size-5' />
            Reservations
          </Link>
        </div>
      )}
      <Button
        className='w-full bg-olive hover:bg-olive/90 text-white rounded-md'
        onClick={async () => {
          close(); // Close the menu before logging out
          if (!userData) {
            // If We are not authenticated, we log in
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
    </div>
  );
}
