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
      signIn("google", {
        callback_url: `${pathname}?${searchParams.toString()}`,
      });
    }
    }, [pathname, searchParams])
    
  return (
    <div>Calle</div>
  )
}

export default Calle