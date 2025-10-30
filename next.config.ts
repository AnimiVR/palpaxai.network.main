import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Fix for pino-pretty missing module error
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ignore pino-pretty in browser builds (it's server-side only)
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    };
    
    return config;
  },
};

export default nextConfig;
