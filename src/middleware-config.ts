export const publicRoutes = ["/", "/about", "/contact", "/dashboard", "/events", "/practicioners", "/venues"];
export const authRoutes = ["/login", "/signup", "/verify-email", "/pick-account", "/auth/google/callback"];
export const protectedRoutes = ["/account", "/availability", "/bookings", "/business-profile", "/create-event", "/insufficient-funds", "/list-venue", "/my-events", "/my-venues", "/notifications", "/personal-profile", "pick-account", "/saved"];

export const routeMatches = [
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
];