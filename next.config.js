/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GH_CLIENT_ID: process.env.AUSPY_GITHUB_CLIENT_ID,
    GH_REDIRECT_URI: process.env.AUSPY_GITHUB_REDIRECT_URI,
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
