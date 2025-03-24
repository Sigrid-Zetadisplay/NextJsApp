// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If user is not logged in and tries to access restricted routes:
  if (!token && (pathname.startsWith("/blog") || pathname.startsWith("/wine"))) {
    const url = new URL("/", req.url); // redirect to home
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:path*", "/wine/:path*"],
};
