"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import fundAccount from "@/server-actions/fundAccount";

interface FundAccount {
  checkout_url: string;
}

export default function FundAccountDialog() {
  const router = useRouter();
  const [open, openChange] = useState(false);
  const submitFn = async (formData: FormData) => {
    const amount = formData.get("amount");
    if (typeof amount !== "string" || isNaN(Number(amount))) {
      toast.error("Invalid amount provided", {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (parsedAmount <= 0) {
      toast.error("Amount must be greater than zero", {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
      return;
    }
    // Call the fundAccount function with the parsed amount
    const paymentUrl = (await fundAccount(parsedAmount)) as
      | FundAccount
      | { error: string; message: string };
    if ("error" in paymentUrl) {
      toast.error(paymentUrl.message, {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
    } else {
      router.push(paymentUrl.checkout_url);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData, "Lfg");
    await submitFn(formData);
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger className='bg-lightolive text-olive !px-6 !py-2 rounded-md text-sm font-medium'>
        Add Money
      </DialogTrigger>
      <DialogContent className='text-olive'>
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-4'>
            <DialogTitle>Fund your Account</DialogTitle>
            <DialogDescription className='sr-only'>
              Fill the amount into the input below to fund your account
            </DialogDescription>
          </DialogHeader>
          <div className='grid grid-col gap-2'>
            <Label htmlFor='amount text-olive '>Enter amount</Label>
            <Input
              id='amount'
              name='amount'
              placeholder='Enter amount in dollars'
              className='py-2 px-3 border border-olive'
            />
          </div>
          <DialogFooter>
            {/* <DialogClose asChild> */}
            <Button
              type='submit'
              variant='outline'
              className='font-roboto text-olive'
              onClick={() => {
                openChange(false);
              }}
            >
              {" "}
              Fund account{" "}
            </Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
