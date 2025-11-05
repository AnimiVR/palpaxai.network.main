import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer, webpack }) => {
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
    
    // Note: We've manually patched @phantom/openapi-wallet-service/dist/esm/model/index.js
    // and dist/model/index.js to export KmsUserRole which was missing.
    // This is a temporary fix until the package is updated.
    
    // Fix for @solana/codecs-numbers exports issue (set here to avoid override)
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@solana/codecs-numbers': path.resolve(
          process.cwd(),
          'node_modules/@solana/codecs-numbers/dist/index.browser.mjs'
        ),
      };
    }

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
    
    // Fix for base-x and other commonjs/esm interop issues
    config.resolve.mainFields = ['browser', 'module', 'main'];
    
    // Handle sub-path exports for @ledgerhq/devices
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.mjs': ['.mjs', '.js'],
    };
    
    // Fix for Phantom SDK ESM imports and Solana packages
    if (!isServer) {
      config.resolve.conditionNames = ['browser', 'import', 'require', 'default'];
      
      // Fix for base-x and other commonjs modules that might have interop issues
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      
      // Add rule to handle commonjs modules properly
      config.module.rules.push({
        test: /node_modules[\/\\](base-x|bs58)[\/\\]/,
        type: 'javascript/auto',
      });
    }
    
    return config;
  },
  // Transpile packages that need to be processed by Next.js
  transpilePackages: [
    '@ledgerhq/devices',
    '@ledgerhq/errors',
    '@ledgerhq/hw-transport',
    '@ledgerhq/hw-transport-webhid',
    '@ledgerhq/logs',
    '@phantom/react-sdk',
    '@phantom/browser-sdk',
    '@phantom/client',
    '@phantom/openapi-wallet-service',
    '@phantom/embedded-provider-core',
    '@solana/web3.js',
    '@solana/codecs-numbers',
    '@solana/transaction-messages',
    '@solana/codecs-core',
    'bs58',
    'base-x',
  ],
};

export default nextConfig;
