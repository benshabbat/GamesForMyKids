*\//**
 * Build optimization configuration for Next.js 15
 * This file contains build-time optimizations and performance enhancements
 */

// Bundle analyzer configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Additional webpack configuration
const webpackConfig = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  // Production optimizations
  if (!dev) {
    // Enable tree shaking for better bundle size
    config.optimization.usedExports = true;
    
    // Split chunks for better caching
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        // Vendor chunk for third-party libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
        // Common chunk for shared code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
        // Game-specific chunks
        games: {
          test: /[\\/]app[\\/]games[\\/]/,
          name: 'games',
          chunks: 'all',
          enforce: true,
        },
      },
    };
  }

  // Add custom loaders
  config.module.rules.push({
    test: /\.(mp3|wav|ogg)$/,
    use: {
      loader: 'file-loader',
      options: {
        publicPath: '/_next/static/sounds/',
        outputPath: 'static/sounds/',
      },
    },
  });

  // SVG optimization
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  return config;
};

// Performance monitoring
const performanceConfig = {
  // Monitor bundle size
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

module.exports = {
  webpackConfig,
  performanceConfig,
  withBundleAnalyzer,
};
