import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async rewrites() {
    return [
      { source: "/seatrackph", destination: "/seatrackph/index.html" },
      { source: "/seatrackph/", destination: "/seatrackph/index.html" },
    ];
  },
};

export default nextConfig;
