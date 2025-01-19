import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['your-supabase-storage-url.supabase.co'],
  },
  webpack: (config) => {
    // vis.js requires this to work with webpack 5
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;