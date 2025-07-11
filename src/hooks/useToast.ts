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
export default function useToast(
  state: ToastState | undefined,
  redirectString?: string | undefined,
  navigationCallback?: () => void
) {
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
    }

    if (state?.success) {
      toast.success(state.message, {
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });

      if (redirectString) {
        router.push(redirectString);
      }

      if (navigationCallback) { // If there is a navigation callback, apply the callback
        navigationCallback();
      }
    }
  }, [state, redirectString, router, navigationCallback]);
}
