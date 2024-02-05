import { withAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  async function middleware(req: any) {
    const session = await getSession({ req });
    console.log("session in middleware", session);
    console.log("Incoming request:", req.method, req.url);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // console.log("token", token);
        // if (
        //   req.nextUrl.pathname.startsWith("/user/") &&
        //   req.nextUrl.searchParams.get("mode") == "edit"
        // ) {
        //   if (!token) {
        //     return false;
        //   }
        //   if (req.nextUrl.pathname.split("user/")[1] != token?.id) {
        //     return false;
        //   }
        // }

        // return true;
        if (
          req.nextUrl.pathname.startsWith("/api/uploadthing") ||
          req.nextUrl.pathname.startsWith("/api/auth/session")
        ) {
          return true;
        }
        console.log("authorized", req.nextUrl.pathname, token);
        const nextSession =
          req.cookies.get("next-auth.session-token") ||
          req.cookies.get("__Secure-next-auth.session-token");
        // console.log(
        //   "nextSession",
        //   nextSession,
        //   jwtToken,
        //   req.nextUrl.pathname
        // );
        // console.log("oken", token);
        const headers: any = req.headers;
        // console.log(headers, "headers", headers?.get("x-d-a"));
        const accessNeeded = headers?.get("x-d-a")
          ? headers.get("x-d-a") == "an"
          : true;
        console.log("accessNeeded", accessNeeded);
        if (
          req.nextUrl.pathname.startsWith("/api") &&
          accessNeeded &&
          !token &&
          !nextSession
        ) {
          console.log("access not allowed");
          return false;
        }
        console.log("access allowed");
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/api/:path*"],
};
