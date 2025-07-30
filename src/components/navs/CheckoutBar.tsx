export default function CheckoutBar() {
  return ( 
    <div className='w-full md:bg-linear-to-r md:from-olivewhite md:to-olive'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5'>
        <div className='flex flex-col gap-2 font-roboto text-olive'>
          <h2 className='text-3xl md:text-4xl font-semibold'>Checkout</h2>
          <p className='hidden md:block md:text-xl'>
            Finalize your purchase with a secure and streamlined checkout experience.
          </p>
        </div>
      </div>
    </div>
  )
}