"use client";
import { startTransition, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaHeart, SlHeart } from "@/components/icons";
import { toast } from "sonner";
import removeSavedEvent from "@/server-actions/removeSavedEvent";
import saveEvent from "@/server-actions/saveEvent";

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

export default function SavedEventBtn({
  eventId,
  isSaved,
}: {
  eventId: string;
  isSaved: boolean;
}) {
  // Using useRef to prevent multiple clicks while loading
  const loadingRef = useRef(false);
  const [saved, setSaved] = useState(isSaved);

  const handleToggle = () => {
    if (loadingRef.current) return; // Prevent multiple clicks if already loading

    startTransition(async () => {
      loadingRef.current = true;
      if (saved) {
        // Remove saved event
        const res = await removeSavedEvent(eventId);
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
        // Save event
        const res = await saveEvent(eventId);
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
