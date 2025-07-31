import { BsInfoCircle } from "@/components/icons";
import { Button } from "../ui/button";
import FundAccountDialog from "../Menus/FundAccountDialog";

function PaymentHero({accountBalance}: { accountBalance: string}) {
  return (
    <div className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto md:p-5 pb-0 font-roboto'>
        <h3 className='text-4xl md:mt-8 font-semibold hidden md:block text-olive'>Account</h3>
        <div className='bg-olive md:bg-white md:mt-6 pb-8 md:pb-0'>
          <div className='text-white md:bg-olive rounded-2xl md:px-16 p-5'>
            <h3 className='md:hidden text-xl font-semibold text-center md:text-left'>Payments</h3>
            <div className='flex flex-col gap-5 justify-center items-center md:items-start'>
              <p className='text-lg inline-flex items-center gap-1 mt-14 md:mt-0'>
                Available Balance &nbsp;{" "}
                <span>
                  <BsInfoCircle className="text-base" />
                </span>
              </p>
              <p className='text-4xl font-semibold -mt-2 md:mt-0'>$ {parseInt(accountBalance).toFixed(2)}</p>
            </div>
          </div>

          <div className='flex flex-row items-center justify-center md:justify-start md:items-left gap-4 mt-2 md:mt-4'>
            {/* <Button className="bg-lightolive text-olive px-6 py-2">Add Money</Button> */}
            <FundAccountDialog />
            <Button className="bg-lightolive text-olive px-6 py-2">Request Withdrawal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHero;
