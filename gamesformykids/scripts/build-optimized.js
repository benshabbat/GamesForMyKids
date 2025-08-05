// Next.js 15 optimized build configuration
const nextBuild = require('next/dist/build').default;
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

async function buildWithOptimizations() {
  console.log('🚀 Starting optimized build process...');
  
  const startTime = Date.now();
  
  try {
    // Environment optimizations
    process.env.NODE_ENV = 'production';
    process.env.NEXT_TELEMETRY_DISABLED = '1';
    
    // Build the application
    await nextBuild(process.cwd(), null, false, false, true);
    
    const buildTime = Date.now() - startTime;
    console.log(`✅ Build completed in ${buildTime}ms`);
    
    // Performance analysis
    if (process.env.ANALYZE === 'true') {
      console.log('📊 Bundle analysis enabled');
    }
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildWithOptimizations();
}

module.exports = buildWithOptimizations;
