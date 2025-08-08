// import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, publicRoutes } from "./middleware-config";
// export default withAuth(
//   async function middleware(req: NextRequest) {
//     const token =
//       req.cookies.get("next-auth.session-token")?.value ||
//       req.cookies.get("__Secure-next-auth.session-token")?.value;

//     const path = req.nextUrl.pathname;

//     // const isPublic = publicRoutes.some(
//     //       (route) => path === route || path.startsWith(`${route}/`)
//     //     );
//     const isAuthRoute = authRoutes.some(
//       (route) => path === route || path.startsWith(`${route}/`)
//     );
//     console.log("We are in middleware!")

//     // If already logged in and visiting /login or /signup → redirect to /dashboard
//     if (token && isAuthRoute) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/dashboard";
//       return NextResponse.redirect(url);
//     }
//     // If visiting a public route, allow access
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ req }) => {
//         console.log("Authorized callback triggered for:", req.nextUrl.pathname);
//         return true; // Allow all requests to pass through
//       },
//     }
//   }
// );

// Custom redirect logic as a separate export
export async function middleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  const isPublicRoute = publicRoutes.some(
    // We need to ensure that the public routes do not include payment-related paths
    // This is to prevent access to payment-related pages without authentication which is normally accessible from an authenticated user's dashboard
    (route) =>
      path === route ||
      (path.startsWith(`${route}/`) &&
        !path.includes("payment-successful") &&
        !path.includes("checkout"))
  );

  // Implement business protected routes logic

  // If visiting a authRoute and is authenticated, redirect to /dashboard
  if (token && isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Allow access to public and auth routes without token
  if (!token && (isPublicRoute || isAuthRoute)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users from protected routes
  if (!token) {
    const url = req.nextUrl.clone();
    // We redirect strictly to /login no search params to prevent toast from showing up unintentionally
    url.pathname = "/login";
    url.search = "";
    url.hash = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// With the current middleware setup, it runs on all routes even when those routes are not defined in our file routing based system.
// (So if normally you go to /me, it runs and go to /login and we do not want that to be the case, so we go to the config below to specify which routes we want the middleware to run on)
// I am writing down the routes manually  to prevent runtime errors and to ensure that the middleware only runs on the specified routes.
export const config = {
  matcher: [
    "/",
    "/account",
    "/auth/google/callback/:path*",
    "/availability",
    "/bookings",
    "/business-profile",
    "/contact",
    "/create-event",
    "/dashboard",
    "/events",
    "/events/:path*",
    "/insufficient-funds",
    "/list-venue",
    "/login",
    "/my-events",
    "/my-events/:path*",
    "/my-venues",
    "/my-venues/:path*",
    "/notifications",
    "/personal-profile",
    "/pick-account",
    "/practicioners",
    "/practicioners/:path*",
    "/saved",
    "/signup",
    "/venues",
    "/venues/:path*",
    "/verify-email",
  ],
};
