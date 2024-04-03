import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis as Rd } from "@upstash/redis";
import { isDev } from "./constants";
// import { kv } from "@vercel/kv";

// middleware is applied to all routes, use conditionals to select
const cache = new Map();
const ratelimit =
  !isDev &&
  new Ratelimit({
    redis: Rd.fromEnv(),
    timeout: 1000,
    analytics: true,
    ephemeralCache: cache,
    limiter: Ratelimit.slidingWindow(80, "60 s"),
  });
export default withAuth(
  async function middleware(req: NextRequest) {
    // return NextResponse.next();
    const host = req.headers.get("host");
    const wild = host?.split(".")[0];
    const headerVals = new Headers(req.headers);
    headerVals.set("x-wildcard", wild ?? "none");
    const res = {
      request: {
        headers: headerVals,
      },
    };
    console.log(
      "Incoming request:",
      host,
      req.method,
      req.url,
      req.ip,
      headerVals
    );
    if (isDev) {
      console.log("dev mode");
      return NextResponse.next(res);
    }
    if (!ratelimit) {
      console.error("middleware: ratelimit not initialized");
      return NextResponse.next(res);
    }
    const ip = req.ip ?? "127.0.0.1";
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
      ip
    );
    console.log(
      "ratelimit: within limit?",
      success,
      await pending,
      limit,
      reset,
      remaining
    );
    return success
      ? NextResponse.next(res)
      : NextResponse.json(
          { error: "rate limit exceeded" },
          { status: 429, statusText: "Rate imit exceeded" }
        );
    // // const session = await getSession({ req }); //not working
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
  matcher: ["/api/:path*", "/[id]"],
};
