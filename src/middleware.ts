import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

// middleware is applied to all routes, use conditionals to select
const cache = new Map();
const ratelimit = new Ratelimit({
  redis: kv,
  timeout: 1000,
  analytics: true,
  ephemeralCache: cache,
  limiter: Ratelimit.slidingWindow(80, "60 s"),
});
export default withAuth(
  async function middleware(req: any) {
    // return NextResponse.next();
    console.log("Incoming request:", req.method, req.url, req.ip);
    if (process.env.NODE_ENV === "development") {
      console.log("dev mode");
      return NextResponse.next();
    }
    const ip = req.ip ?? "127.0.0.1";
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
      ip
    );
    console.log("ratelimit", success, await pending, limit, reset, remaining);
    return success
      ? NextResponse.next()
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
  matcher: ["/api/:path*"],
};
