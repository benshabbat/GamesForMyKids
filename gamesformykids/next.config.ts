import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Image optimization
  images: {
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression and security
  compress: true,
  poweredByHeader: false,

  // TypeScript and ESLint
  typescript: {
    // Type checking during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint checking during build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
