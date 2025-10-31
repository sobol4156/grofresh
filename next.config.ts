import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['t.me', 'telegram.org', 'grofresh.vercel.app'],
  },
};

export default nextConfig;
