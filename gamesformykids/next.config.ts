import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal performance optimizations
  experimental: {
    optimizeCss: true,
  },

  // Image optimization - simplified
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Output optimization
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Compression and security
  compress: true,
  poweredByHeader: false,

  // TypeScript and ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
