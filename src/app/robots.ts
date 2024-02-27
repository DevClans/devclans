import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [
        "/api",
        "/_next/",
        "/auth/",
        "/error",
        "/github_connect",
        "/bookmarks",
        "/likes",
        "/*?mode=edit",
        "/project/*?mode=edit",
        "/explore/*?filters=",
        "/explore/*?search=",
        "/404",
        "/user",
        "/project/404",
      ],
    },
    sitemap: "https://www.devclans.com/sitemap.xml",
  };
}
