"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
function Calle() {
  const pathname = usePathname();
     const searchParams = useSearchParams();
    console.log("Pathname:", pathname, "Search Params:", searchParams.toString());
    useEffect(()=> {
      if (pathname.startsWith("/auth/google/callback")) {
      signIn("auth_google", {
        callback_url: `${pathname}?${searchParams.toString()}`,
        redirect: true,
        callbackUrl: "/",
      });
    }
    }, [pathname, searchParams])
    
  return (
    <div>Calle</div>
  )
}

export default Calle