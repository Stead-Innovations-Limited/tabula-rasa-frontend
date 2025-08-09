"use client";
import { startTransition, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaHeart, SlHeart } from "@/components/icons";
import saveVenue from "@/server-actions/saveVenue";
import removeSavedVenue from "@/server-actions/removeSavedVenue";
import { toast } from "sonner";

const errorClass = {
  classNames: {
    toast: "!text-red-500",
    title: "!text-red-500",
    description: "!text-red-500",
  },
};

const successClass = {
  classNames: {
    toast: "!text-green-700",
    title: "!text-green-700",
    description: "!text-green-700",
  },
};

export default function SavedVenueBtn({
  venueId,
  isSaved,
}: {
  venueId: string;
  isSaved: boolean;
}) {
  const router = useRouter()
  const { data: session } = useSession();
  const userData = session?.user;
  // Using useRef to prevent multiple clicks while loading
  const loadingRef = useRef(false);
  const [saved, setSaved] = useState(isSaved);

  const handleToggle = () => {
    if (loadingRef.current) return; // Prevent multiple clicks if already loading

    startTransition(async () => {
      loadingRef.current = true;
      if (saved) {
        // Remove saved venue
        const res = await removeSavedVenue(venueId);
        if (res.error) {
          toast.error(res.message, errorClass);
        } else {
          toast.success(res.message, successClass);
          // Toggle setSaved State
          startTransition(() => {
            setSaved((prev) => !prev);
          });
        }
        // Set loadingRef to false after the operation
        loadingRef.current = false;
      } else {
        // Save venue
        const res = await saveVenue(venueId);
        if (res.error) {
          // We check if the user is logged in
          // if not login, we redirect to the login page
          if (!userData) {
            router.push("/login")
          }else toast.error(res.message, errorClass);
        } else {
          toast.success(res.message, successClass);
          // Toggle setSaved State
          startTransition(() => {
            setSaved((prev) => !prev);
          });
        }
        // Set loadingRef to false after the operation
        loadingRef.current = false;
      }
    });
  };

  return (
    <>
      {/* The Save button to adding the event to Saved List */}
      <div className=''>
        <Button
          onClick={handleToggle}
          className='bg-olive text-white hover:bg-darkolive rounded-full size-12 items-center justify-center'
        >
          {isSaved ? (
            <FaHeart className='size-6' />
          ) : (
            <SlHeart className='size-6' />
          )}
        </Button>
      </div>
    </>
  );
}
