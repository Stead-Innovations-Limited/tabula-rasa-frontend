import Link from "next/link";
import { Separator } from "../ui/separator";
import { FaFacebook, BsTwitterX, SlSocialInstagram } from "@/components/icons";

function Footer() {
  return (
    <section className='w-full bg-lightolive font-roboto'>
      <footer className='w-full p-5 xl:p-0 xl:max-w-[1140px] mx-auto font-roboto font-medium flex flex-col'>
        <div className='flex flex-col gap-8 md:flex-row md:justify-between pt-10 md:py-10'>
          {/* Main set of links */}
          <div className='w-full flex flex-col md:gap-6'>
            <h3 className='font-alex font-normal text-center md:text-left text-olive text-4xl md:text-5xl'>
              Tabula Rasa
            </h3>
            {/* Icons set */}
            <div className='hidden md:flex gap-4 text-olive'>
              <FaFacebook className='size-6 md:size-8' />
              <BsTwitterX className='size-6 md:size-8' />
              <SlSocialInstagram className='size-6 md:size-8' />
            </div>
            {/* Links */}
            <div className='hidden md:flex flex-row gap-4 text-olive text-xl'>
              <Link href='/home'>Home</Link>
              <Link href='/about'>About Us</Link>
              <Link href='/offerings'>Offerings</Link>
            </div>
          </div>

          {/* Secondary set of Links */}
          <div className='flex flex-row-reverse justify-between items-end md:flex-col'>
            {/* Social media links */}
            <div className='flex md:hidden gap-4 text-olive '>
              <FaFacebook className='size-6 md:size-8' />
              <BsTwitterX className='size-6 md:size-8' />
              <SlSocialInstagram className='size-6 md:size-8' />
            </div>
            {/* The links */}
            <div className='flex flex-col md:flex-row gap-10 text-olive'>
              <div className='flex flex-col gap-4'>
                <h4 className="font-semibold text-base md:text-2xl">Find</h4>
                <ul className="flex flex-col gap-4 text-base md:text-xl">
                  <li>
                    <Link href='#'>Practicioners</Link>
                  </li>
                  <li>
                    <Link href='#'>Events</Link>
                  </li>
                  <li>
                    <Link href='#'>Venues</Link>
                  </li>
                </ul>
              </div>
              <div className='flex flex-col gap-4'>
                <h4 className="font-semibold text-base md:text-2xl">Business</h4>
                <ul className="flex flex-col gap-4 text-base md:text-xl">
                  <li className="">
                    <Link href='#' className="whitespace-nowrap">Create Business Profile</Link>
                  </li>
                  <li>
                    <Link href='#' className="whitespace-nowrap">Create a Listening</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-row justify-center items-center gap-4 mb-4 md:mb-0 md:hidden text-olive text-base'>
              <Link href='/home'>Home</Link>
              <Link href='/about'>About Us</Link>
              <Link href='/offerings'>Offerings</Link>
            </div>
        </div>
        <Separator orientation='horizontal' className='bg-white' />
        <div className='w-full flex justify-between text-sm md:text-xl py-4 text-olive'>
          <div className=''>Copyright 2025, All Rights Reserved</div>
          <div className=''>Privacy &nbsp; Policy</div>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
