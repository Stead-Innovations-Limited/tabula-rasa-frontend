"use client"
import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import subscribeAction from "@/server-actions/subscribeAction";
import { AiOutlineLoading3Quarters } from "@/components/icons";

import { toast } from "sonner"

function SubscriptionForm() {
  const [state, formAction, isPending] = useActionState(subscribeAction, undefined);
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message, {
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });
    }

    if (state?.error) {
      toast.error(state.message, {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
    }
  }, [state]);
  return (
    <form action={formAction}>

      <div className="relative border-0 lg:border border-solid flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-end border-olive rounded-xl lg:h-16">
        <Input type="email" className="lg:absolute w-full h-10 caret-olive placeholder:text-olive lg:h-full border border-solid border-olive lg:border-0" placeholder="Email Address" name="email" required/>
        <Button className="bg-olive hover:bg-olive w-3/4 lg:w-fit text-white px-8 py-5 mr-3">
          {isPending ? (
            <>
              Loading{" "}
              <AiOutlineLoading3Quarters className='animate-spin size-4' />
            </>
          ) : (
            <>
              Join
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default SubscriptionForm