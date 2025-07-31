import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function InsufficientFundsContainer() {
  return (
    <div className="w-full">
      <div className="w-full xl:max-w-[1140px] mx-auto p-5 flex flex-col justify-center items-center">
        <div className="w-full md:w-3/4 flex flex-col items-center justify-center">
          <div className="w-full md:w-1/2 aspect-square relative">
            <Image src="/insufficient-funds.png" alt="Insufficient Funds" fill={true} className="w-full object-cover object-center" />
          </div>
          <p className="font-roboto font-medium text-center">
            It looks like your wallet balance isn&rsquo;t enough to complete this transaction. Please top up your wallet or choose another payment method to proceed.
          </p>
          <Button asChild className="w-full md:max-w-sm bg-olive hover:bg-olive/95 text-white mt-6">
            <Link href="/account">
              Fund Wallet
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
