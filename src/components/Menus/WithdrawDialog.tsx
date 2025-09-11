"use client";

import { useState } from "react";
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
import withdrawFunds from "@/server-actions/withdrawFunds";


export default function WithdrawDialog() {
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

    const accountNo = formData.get("accountNumber");
    if (
      typeof accountNo !== "string" ||
      accountNo.trim() === "" ||
      isNaN(Number(accountNo)) ||
      accountNo.trim().length < 10
    ) {
      toast.error("Account number is invalid", {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
      return;
    }

    const accountName = formData.get("accountName");
    if (typeof accountName !== "string" || accountName.trim() === "") {
      toast.error("Account name is required", {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
      return;
    }

    const bankName = formData.get("bankName");
    if (typeof bankName !== "string" || bankName.trim() === "") {
      toast.error("Bank name is required", {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
      return;
    }

    const routingNo = formData.get("routingNo");
    if(typeof routingNo !== "string" || routingNo.trim().length !== 9){
      toast.error("Routing number is required", {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
      return;
    }

    // Call the withdrawFunds function with the parsed amount
    const response = (await withdrawFunds(
      parsedAmount,
      accountNo,
      accountName,
      bankName,
      routingNo
    )) as { message: string } | { error: string; message: string };

    
    if ("error" in response) {
      toast.error(response.message, {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
    } else {
      toast.success("Account credited successfully!", {
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await submitFn(formData);
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger className='bg-lightolive text-olive !px-6 !py-2 rounded-md text-sm font-medium'>
        Request Withdrawal
      </DialogTrigger>
      <DialogContent className='text-olive'>
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-4'>
            <DialogTitle>Request Withdrawal</DialogTitle>
            <DialogDescription className='sr-only'>
              Fill the amount into the input below to request a withdrawal
            </DialogDescription>
          </DialogHeader>
          <div className='grid grid-col gap-2'>
            <Label htmlFor='amount' className='text-olive '>
              Enter amount
            </Label>
            <Input
              id='amount'
              name='amount'
              placeholder='Enter amount in dollars'
              className='py-2 px-3 border border-olive'
            />
          </div>

          <div className='grid grid-col gap-2 mt-5'>
            <Label htmlFor='accountNumber' className='text-olive'>
              Enter your account number
            </Label>
            <Input
              id='accountNumber'
              name='accountNumber'
              placeholder='Enter your account number'
              className='py-2 px-3 border border-olive'
            />
          </div>

          <div className='grid grid-col gap-2 mt-5'>
            <Label htmlFor='accountName' className='text-olive '>
              Enter the name associated with the account
            </Label>
            <Input
              id='accountName'
              name='accountName'
              placeholder='Enter the name associated with the account'
              className='py-2 px-3 border border-olive'
            />
          </div>

          <div className='grid grid-col gap-2 mt-5'>
            <Label htmlFor='bankName' className='text-olive '>
              Enter your bank name
            </Label>
            <Input
              id='bankName'
              name='bankName'
              placeholder='Enter your bank name'
              className='py-2 px-3 border border-olive'
            />
          </div>

          <div className='grid grid-col gap-2 mt-5'>
            <Label htmlFor='routingNo' className='text-olive '>
              Enter bank routing number
            </Label>
            <Input
              id='routingNo'
              name='routingNo'
              placeholder='Enter routing number'
              className='py-2 px-3 border border-olive'
            />
          </div>

          <DialogFooter>
            <Button
              type='submit'
              variant='outline'
              className='font-roboto text-olive mt-5 hover:bg-olive hover:text-white transition-colors delay-150'
              onClick={() => {
                openChange(false);
              }}
            >
              {" "}
              Withdraw funds{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
