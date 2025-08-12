"use client";
import { startTransition } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function ErrorContainer() {
  const router = useRouter();

  function handleRefresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5 flex flex-col justify-center items-center py-14'>
        <div className='w-full md:w-3/4 flex flex-col items-center justify-center gap-8'>
          <div className='w-full md:w-3/4 font-roboto text-center text-xl md:text-2xl lg:text-3xl text-black/70'>
            <span className="inline-block font-semibold">Oops! Something Went Wrong.</span>
            <br />
            <span className='inline-block font-medium'>
              We&rsquo;re sorry, but an unexpected error occurred.
            </span>
          </div>

          <div className='w-full flex flex-col items-center justify-center'>
            <Button
              className='w-full md:max-w-sm bg-olive hover:bg-olive/95 text-white'
              onClick={() => handleRefresh()}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
