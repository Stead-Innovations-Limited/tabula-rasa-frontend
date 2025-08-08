"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

export default function NotFoundContainer() {
  const router = useRouter();
  return (
    <div className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5 flex flex-col justify-center items-center py-14'>
        <div className='w-full md:w-3/4 flex flex-col items-center justify-center gap-10 md:gap-14'>
          <div className='w-full md:w-1/2 aspect-square relative'>
            <p className="absolute top-1/2 left-1/2 -translate-1/2 text-[150px] md:text-[300px] lg:text-[400px] font-bold font-roboto text-olive/20">404</p>
            <Image
              src='/tabularasa-avatar.png'
              alt='Tabularasa avatar'
              fill={true}
              className='object-cover md:object-none md:scale-180 object-center'
            />
          </div>

          <div className='w-full flex flex-col items-center justify-center'>
            <Button
              className='w-full md:max-w-sm bg-olive hover:bg-olive/95 text-white'
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
