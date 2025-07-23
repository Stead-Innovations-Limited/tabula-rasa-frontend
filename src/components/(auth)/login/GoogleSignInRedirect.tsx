// components/GoogleSignInRedirect.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function GoogleSignInRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const stringifiedSearchParams = searchParams.toString();
    if (!stringifiedSearchParams) return;

    const callback_url = `/auth/google/callback?${stringifiedSearchParams}`;
    (async () => {
      const result = await signIn("auth_google", {
        callback_url,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error("Login failed. Please try again.");
      } else {
        toast.success("Login successful. Redirecting...");
        window.location.href = "/dashboard";
      }
    })();
  }, [searchParams, router]);

  return null;
}
