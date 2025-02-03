import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("Middleware is running for:", req.nextUrl.pathname); // Debugging output
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/signup/:path*"],
};
