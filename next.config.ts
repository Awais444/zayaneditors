import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
      { protocol: "https", hostname: "*.b-cdn.net" },
    ],
  },
};

export default nextConfig;
