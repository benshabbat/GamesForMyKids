import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for AVIF/WebP
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
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
      // Ultra-aggressive production optimizations - safer chunking
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 10000, // Increased for stability
        maxSize: 80000, // More conservative
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
            maxSize: 60000, // More conservative
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 30,
            maxSize: 50000,
          },
          // Removed problematic chunking that causes loading issues
        },
      };
      
      // Safe tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Stable module and chunk IDs
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }
    return config;
  },

  // Headers for aggressive caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
      {
        source: '/(.*)\\.(js|css|woff2|woff|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      }
    ];
  }
};

export default nextConfig;
