import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Public website
  if (hostname === "pixtack.app" || hostname === "www.pixtack.app") {
    return NextResponse.next();
  }

  // Photographer console
  if (hostname === "console.pixtack.app") {
    const url = request.nextUrl.clone();
    url.pathname = `/console${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};