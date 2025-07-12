"use client";
import { startTransition, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlHeart } from "@/components/icons";
export default function SavedVenueBtn({isSaved}: {isSaved: boolean}) {
  const [saved, setSaved] = useState(isSaved);

  useEffect(() => {
    // This effect runs when the component mounts or when `saved` changes
    if (saved) {
      // Call an action to add this to saved venues
    } else {
      // Call an action to remove this from saved venues
    }
  }, [saved]);

  return (
    <>
      {/* The Save button to adding the event to Saved List */}
      <div className=''>
        <Button onClick={() => {
          startTransition(() => {
            setSaved((prev) => !prev);
          });
        }} className='bg-olive text-white hover:bg-darkolive rounded-full size-12 items-center justify-center'>
          <SlHeart className='size-6' />
        </Button>
      </div>
    </>
  );
}
