"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ToastState {
  error?: boolean;
  success?: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  errorData?: unknown;
}
export default function useToast(state: ToastState | undefined, redirectString?: string) {
  const router = useRouter();
   useEffect(() => {
    if (state?.error) {
      toast.error(state.message, {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });

      console.log(state.error);
    }

    if (state?.success) {
      toast.success(state.message, {
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });

      setTimeout(() => {
        if (redirectString) {
        router.push(redirectString);
        }
      }, 1000);
    }

  }, [state, redirectString, router]);
}
