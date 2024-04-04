/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/api/auth/:path*",
        permanent: true,
        has: [
          {
            type: "host",
            value: "links." + process.env.NEXT_PUBLIC_ROOT_DOMAIN,
          },
        ],
        destination: process.env.NEXT_PUBLIC_SITE_URL + "/api/auth/:path*",
      },
    ];
  },
  // rewrites: async () => {
  //   console.log("rewriting");
  //   return [
  //     {
  //       source: "/:path",
  //       destination: "/:path/links",
  //       has: [
  //         {
  //           type: "host",
  //           value: "links." + process.env.NEXT_PUBLIC_ROOT_DOMAIN,
  //         },
  //       ],
  //     },
  //   ];
  // },
  env: {
    GH_CLIENT_ID: process.env.AUSPY_GITHUB_CLIENT_ID,
    GH_REDIRECT_URI: process.env.AUSPY_GITHUB_REDIRECT_URI,
    GOOGLE_ADD_ID: process.env.NEXT_PUBLIC_GOOGLE_ADD_ID,
  },
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
    domains: [
      "picsum.photos",
      "avatars.githubusercontent.com",
      "cdn.discordapp.com",
      "github-readme-activity-graph.vercel.app",
      "example.com",
      "i.postimg.cc",
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
