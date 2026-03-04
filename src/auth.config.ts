import type { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";

export default {
  providers: [
    Discord({ allowDangerousEmailAccountLinking: true }),
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Facebook({ allowDangerousEmailAccountLinking: true }),
  ],
  trustHost: true,
  // put callback logic here so both Middleware and App can use it
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
    // Middleware auth
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    // map the pages that need protection
    //   const isOnProtectedPage =
    //     nextUrl.pathname.startsWith("/user") ||
    //     nextUrl.pathname.startsWith("/check-auth");
    //   const isOnLoginPage = nextUrl.pathname.startsWith("/login");

    //   if (isOnProtectedPage) {
    // if logged in, pass, otherwise go to login page
    //     if (isLoggedIn) return true;
    //     return false;
    //   } else if (isOnLoginPage) {
    //     if (isLoggedIn) {
    // if logged in and try to access, redirect to home page
    //       return Response.redirect(new URL("/", nextUrl));
    //     }
    //   }

    //   return true;
    // },
  },
  // redirect to custom login page
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
