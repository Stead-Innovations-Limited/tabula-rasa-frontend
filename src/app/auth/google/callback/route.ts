// app/auth/google/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  console.log(searchParams);
  if(!searchParams) return NextResponse.redirect(new URL(`/login`, request.url));

  // Redirect to /login with query attached
  return NextResponse.redirect(new URL(`/login?${searchParams}`, request.url));
}
