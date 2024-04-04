import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis as Rd } from "@upstash/redis";
import { isDev, urlApi, urlBase } from "./constants";
import { getToken } from "next-auth/jwt";
// import { kv } from "@vercel/kv";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /_next (Next.js internals)
     * 2. /_static (inside /public)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

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

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isApi =
    url.pathname.startsWith("/api") && !url.pathname.includes("/auth");
  const headerVals = new Headers(req.headers);

  console.log(
    "Incoming request:",
    // host,
    req.method,
    url.pathname,
    req.ip
  );

  // STOP ACCESS TO API
  if (isApi) {
    console.log("API request:", url.pathname);
    // const accessNeeded = headerVals?.get("x-d-a")
    //   ? headerVals.get("x-d-a") == "an"
    //   : true;
    // console.log("accessNeeded", accessNeeded);
    // if (
    //   accessNeeded &&
    //   !(
    //     url.pathname.startsWith("/api/uploadthing") ||
    //     url.pathname.startsWith("/api/auth/session")
    //   )
    // ) {
    //   const session = await getToken({ req });
    //   if (!session) {
    //     return NextResponse.json(
    //       { error: "access denied" },
    //       { status: 401, statusText: "Unauthorized" }
    //     );
    //   }
    // }
    // RATELIMITING THE API
    if (ratelimit) {
      const ip = req.ip ?? "127.0.0.1";
      const { success, pending, limit, reset, remaining } =
        await ratelimit.limit(ip);

      console.log(
        "ratelimit: within limit?",
        success,
        await pending,
        limit,
        reset,
        remaining
      );
      if (!success) {
        return NextResponse.json(
          { error: "rate limit exceeded" },
          { status: 429, statusText: "Rate imit exceeded" }
        );
      }
    }
  }

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    console.log("Vercel preview deployment URL", hostname);
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const path = `${url.pathname}`;
  // rewrites for app pages
  if (hostname == `links.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    console.log("links subdomain");
    if (path.split("/").length == 2) {
      const username = path.split("/").length > 1 && path.split("/")[1];
      if (username) {
        console.log("isUsername", username, req.url, path);
        return NextResponse.rewrite(new URL(`${path}/links`, req.url));
      }
    }
    // else if (path.includes("/auth")) {
    //   console.log("redirecting to ", new URL(path, urlBase));
    //   return NextResponse.redirect(new URL(path, urlBase));
    // }
  }

  return NextResponse.next();
}
