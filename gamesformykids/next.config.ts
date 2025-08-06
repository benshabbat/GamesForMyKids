import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Optimize for better FCP
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Enable compression
  compress: true,
  // Reduce bundle size
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
  },
  // Webpack optimizations - Ultra aggressive for 100% score
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Ultra-aggressive production optimizations
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 5000,
        maxSize: 100000, // Even smaller chunks
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: 80000, // Smaller vendor chunks
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 30,
            maxSize: 60000,
          },
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide',
            chunks: 'async',
            priority: 25,
            maxSize: 40000,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer',
            chunks: 'async',
            priority: 25,
            maxSize: 60000,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            maxSize: 50000,
          },
          styles: {
            test: /\.(css|scss|sass)$/,
            name: 'styles',
            chunks: 'all',
            priority: 20,
            enforce: true,
          },
        },
      };
      
      // Ultra tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.innerGraph = true;
      
      // Additional optimizations
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
      
      // Minimize bundle size
      config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
    }
    return config;
  },
};

export default nextConfig;
