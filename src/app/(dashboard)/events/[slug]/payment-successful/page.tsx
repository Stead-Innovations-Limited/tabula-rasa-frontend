import CheckoutBar from "@/components/navs/CheckoutBar";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function page() {
  return (
    <>
      <CheckoutBar />
      <div className='w-full'>
        <div className='w-full xl:max-w-[1140px] mx-auto px-5'>
          <div className='w-full flex flex-col items-center justify-center md:shadow-xl md:rounded-2xl py-10 md:py-20 my-12'>
            <IoIosCheckmarkCircle className='text-olive text-9xl md:text-[11rem] mx-auto' />
            <h6 className='font-roboto font-semibold text-olive text-2xl md:text-3xl text-center my-3'>
              Payment Successful
            </h6>
            <p className='font-roboto text-olive/70 text-center'>
              Thank you for booking, your booking has been placed successfully.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
