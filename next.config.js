/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      }
    ],
    domains: ["picsum.photos"],
  },
};

module.exports = nextConfig;
