import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const host = hostname.split(":")[0];

  const url = request.nextUrl.clone();

  // Main Pixtack website
  if (host === "pixtack.app" || host === "www.pixtack.app") {
    return NextResponse.next();
  }

  // Pixtack Console
  if (host === "console.pixtack.app") {
    url.pathname = `/console${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Photographer subdomains
  if (host.endsWith(".pixtack.app")) {
    const subdomain = host.replace(".pixtack.app", "");

    if (subdomain && subdomain !== "www" && subdomain !== "console") {
      url.pathname = `/photographer${url.pathname}`;

      url.searchParams.set("photographer", subdomain);

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};