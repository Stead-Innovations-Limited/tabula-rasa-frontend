import { BsInfoCircle } from "@/components/icons";
import { Button } from "../ui/button";

function PaymentHero() {
  return (
    <div className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5 pb-0'>
        <h3 className='text-2xl font-semibold hidden md:block'>Account</h3>
        <div className=''>
          <div className=''>
            <h3 className='text-xl font-semibold'>Payments</h3>
            <div className='flex flex-col justify-center items-center md:justify-left'>
              <p className='text-lg'>
                Available Balance &nbsp;{" "}
                <span>
                  <BsInfoCircle />
                </span>
              </p>
              <p className='text-2xl font-semibold'>$0.00</p>
            </div>
          </div>

          <div className='flex flex-row gap-8'>
            <Button>Add Money</Button>
            <Button>Request Withdrawal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHero;
