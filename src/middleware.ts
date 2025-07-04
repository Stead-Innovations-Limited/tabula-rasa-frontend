// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

// const publicRoutes = ["/", "/login", "/signup", "/about"];

// export default withAuth(
//   function middleware(req: NextRequest) {
//     // const path = req.nextUrl.pathname;
//     console.log("Middleware triggered for:", req.nextUrl.pathname, req.nextUrl.pathname === "/");
//     if (publicRoutes.includes(req.nextUrl.pathname)) {
//       return NextResponse.next();
//     }

//   },
//   {
//     pages: {
//       signIn: "/login",
//     },
//   }
// );

// export const config = {
//   matcher: ["/((?!api|_next|favicon.ico).*)"],
// };

// import { withAuth } from "next-auth/middleware";
// // import { NextRequest, NextResponse } from "next/server";

// const publicRoutes = ["/", "/about"];
// const authRoutes = ["/login", "/signup"];

// export default withAuth({
//   callbacks: {
//     authorized: ({ req, token }) => {
//       const path = req.nextUrl.pathname;

//       const isPublic = publicRoutes.some(
//         (route) => path === route || path.startsWith(`${route}/`)
//       );

//       if (isPublic) return true;

//       const isAuthRoute = authRoutes.some(
//         (route) => path === route || path.startsWith(`${route}/`)
//       );

//       // ✅ Allow anyone to access public routes
//       if (isPublic) return true;

//       // ✅ Allow unauthenticated users to access login/signup
//       if (isAuthRoute && !token) return true;

//       // ❌ Prevent authenticated users from accessing login/signup
//       if (isAuthRoute && token) {
//         return false; // we'll redirect manually below
//       }

//       // ✅ Require auth for all other routes
//       return !!token;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// });

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import type { NextRequest } from 'next/server'

// const publicRoutes = ["/", "/about"];
// const authRoutes = ["/login", "/signup"];

// export default withAuth({
//   callbacks: {
//     authorized: ({ req, token }) => {
//       const path = req.nextUrl.pathname;

//       const isPublic = publicRoutes.some(
//         (route) => path === route || path.startsWith(`${route}/`)
//       );

//       const isAuthRoute = authRoutes.some(
//         (route) => path === route || path.startsWith(`${route}/`)
//       );

//       // ✅ Allow anyone to access public routes
//       if (isPublic) return true;

//       // ✅ Allow unauthenticated users to access login/signup
//       if (isAuthRoute && !token) return true;

//       // ❌ Prevent authenticated users from accessing login/signup
//       if (isAuthRoute && token) {
//         return false; // we'll redirect manually below
//       }

//       // ✅ Require auth for all other routes
//       return !!token;
//     },
//   },

//   // Handle redirects manually below
//   pages: {
//     signIn: "/login", // used when not authenticated
//   },
// });

// // Custom redirect for when authorized() returns false
// export async function middleware(req: NextRequest) {
//   const token =
//     req.cookies.get("next-auth.session-token")?.value ||
//     req.cookies.get("__Secure-next-auth.session-token")?.value;

//   const path = req.nextUrl.pathname;

//   const isAuthRoute = ["/login", "/signup"].some(
//     (route) => path === route || path.startsWith(`${route}/`)
//   );

//   // If already logged in and visiting /login or /signup → redirect to /dashboard
//   if (token && isAuthRoute) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };

// import { console } from "inspector";
// import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const publicRoutes = ["/", "/about"];
const authRoutes = ["/login", "/signup"];

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
  // console.log("Middleware triggered for:", req.nextUrl.pathname);
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const path = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // const isPublicRoute = publicRoutes.some(
  //   (route) => path === route || path.startsWith(`${route}/`)
  // );

  // If visiting a authRoute and is authenticated, redirect to /dashboard
  if (token && isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // If not authenticated and visit any other route
  // if (!token && !isPublicRoute && !isAuthRoute) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/login"; // Redirect to login if not authenticated
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}
