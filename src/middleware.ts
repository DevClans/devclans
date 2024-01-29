import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware(req) {
    console.log("Incoming request:", req.method, req.url);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        console.log("authorized", req.nextUrl.pathname, token);
        const nextSession = req.cookies.get("next-auth.session-token");
        // console.log(
        //   "nextSession",
        //   nextSession,
        //   jwtToken,
        //   req.nextUrl.pathname
        // );
        if (req.nextUrl.pathname.startsWith("/api")) {
          return false;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/api/:path*"],
};
