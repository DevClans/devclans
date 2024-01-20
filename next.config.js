/** @type {import('next').NextConfig} */
const nextConfig = {
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
