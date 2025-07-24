// // app/auth/google/callback/route.ts
// import { NextRequest, NextResponse } from "next/server";

import { Suspense } from "react";
import Calle from "./Calle";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams.toString();
//   console.log(searchParams);
//   if(!searchParams) return NextResponse.redirect(new URL(`/login`, request.url));

//   // Redirect to /login with query attached
//   return NextResponse.redirect(new URL(`/login?${searchParams}`, request.url));
// }


export default function page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          {/* <GoogleSignInRedirect /> */}
          <Calle />
        </Suspense>
      </div>
    </div>
  );
}