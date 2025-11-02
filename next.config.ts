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

    // Fix for Ledger dependencies resolution
    // Ensure webpack can resolve modules from nested node_modules
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      'node_modules',
    ];

    // Ensure proper module resolution for nested dependencies
    config.resolve.symlinks = true;
    
    // Enable fullySpecified for ESM modules
    config.resolve.fullySpecified = false;
    
    // Handle sub-path exports for @ledgerhq/devices
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.mjs': ['.mjs', '.js'],
    };
    
    return config;
  },
  // Transpile packages that need to be processed by Next.js
  transpilePackages: [
    '@ledgerhq/devices',
    '@ledgerhq/errors',
    '@ledgerhq/hw-transport',
    '@ledgerhq/hw-transport-webhid',
    '@ledgerhq/logs',
  ],
  // Experimental settings for better module resolution
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
