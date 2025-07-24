import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  const redirectBase = "https://tabula-rasa-frontend.up.railway.app";
  console.log("Redirect Base", redirectBase);

  const targetUrl = searchParams
    ? `${redirectBase}/login?${searchParams}`
    : `${redirectBase}/login`;

  return NextResponse.redirect(targetUrl);
}


// export default function page() {
//   return (
//     <div className="flex h-screen items-center justify-center">
//       <div className="w-full max-w-md">
//         <Suspense fallback={<div className="text-center">Loading...</div>}>
//           {/* <GoogleSignInRedirect /> */}
//           <Calle />
//         </Suspense>
//       </div>
//     </div>
//   );
// }


// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams.toString();
//   console.log(searchParams);
//   if(!searchParams) return NextResponse.redirect(new URL(`/login`, request.url));

//   // Redirect to /login with query attached
//   return NextResponse.redirect(new URL(`/login?${searchParams}`, request.url));
// }