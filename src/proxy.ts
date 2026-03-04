import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

const authRoutes = ["/login"];
const protectedRoutes = ["/user", "/settings"];

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const path = nextUrl.pathname;

  // logged in but going to auth route, redirect to home page
  if (isLoggedIn && authRoutes.includes(path))
    return Response.redirect(new URL("/", nextUrl));

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));

  // not logged in but going to protected route, force login
  if (isProtected && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/login?callback=${encodedCallbackUrl}`, nextUrl),
    );
  }

  // leave him alone
  return;
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon|avatars|sitemap.xml|.well-known|robots.txt|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
