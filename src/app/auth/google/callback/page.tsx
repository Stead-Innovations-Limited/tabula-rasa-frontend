"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const pathname = usePathname();
   const searchParams = useSearchParams();
  console.log("Pathname:", pathname, "Search Params:", searchParams.toString());
  useEffect(()=> {
    if (pathname.startsWith("/auth/google/callback")) {
    signIn("google", {
      callback_url: `${pathname}?${searchParams.toString()}`,
    });
  }
  }, [pathname, searchParams])
  

  return <div>Loading</div>;
}
