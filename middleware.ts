import { NextResponse, type NextRequest } from "next/server";

/**
 * One URL format: https, no "www.", lowercase path, no trailing slash (Next handles that via
 * trailingSlash: false). Query-string variants of pages are marked noindex (the canonical
 * tag already points at the clean URL).
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") ?? "";
  let redirect = false;
  if (host.startsWith("www.")) {
    url.host = host.slice(4);
    url.port = "";
    redirect = true;
  }
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    redirect = true;
  }
  if (redirect) return NextResponse.redirect(url, 301);
  const res = NextResponse.next();
  if (url.search) res.headers.set("X-Robots-Tag", "noindex, follow");
  return res;
}

export const config = {
  // Pages only: skip Next internals, API routes and static files
  matcher: ["/((?!_next/|api/|.*\\.[a-z0-9]+$).*)"],
};
