// import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/about", "/contact", "/dashboard", "/events", "/practicioners", "/venues"];
const authRoutes = ["/login", "/signup", "/verify-email", "/pick-account", "/auth/google/callback"];

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
  console.log("Middleware triggered for path:", path);
  const isAuthRoute = authRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  const isPublicRoute = publicRoutes.some(
    // We need to ensure that the public routes do not include payment-related paths
    // This is to prevent access to payment-related pages without authentication which is normally accessible from an authenticated user's dashboard
    (route) => path === route || (path.startsWith(`${route}/`) && !path.includes("payment-successful") && !path.includes("checkout"))
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
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
