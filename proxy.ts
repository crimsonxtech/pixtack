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

  // Photographer subdomains
  if (hostname.endsWith(".pixtack.app")) {
    const subdomain = hostname.replace(".pixtack.app", "");

    // Ignore reserved subdomains
    if (subdomain && subdomain !== "console" && subdomain !== "www") {
      const url = request.nextUrl.clone();

      // Keep the original path after the photographer route
      url.pathname = `/photographer${pathname}`;

      // Make the photographer slug available to the page
      url.searchParams.set("photographer", subdomain);

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};