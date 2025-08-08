import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  const redirectBase = "https://tabula-rasa-frontend.up.railway.app";

  const targetUrl = searchParams
    ? `${redirectBase}/login?${searchParams}`
    : `${redirectBase}/login`;

  return NextResponse.redirect(targetUrl);
}