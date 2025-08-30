import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "acrobatic-buffalo-852.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
