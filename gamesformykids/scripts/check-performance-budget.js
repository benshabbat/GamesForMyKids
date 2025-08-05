const fs = require('fs');
const path = require('path');

async function checkPerformanceBudget() {
  console.log('📊 Checking performance budget...');

  try {
    // Read performance budget
    const budgetPath = path.join(process.cwd(), 'performance-budget.json');
    const budget = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));

    // Read build stats
    const buildStatsPath = path.join(process.cwd(), '.next/build-manifest.json');
    
    if (!fs.existsSync(buildStatsPath)) {
      console.error('❌ Build manifest not found. Run build first.');
      process.exit(1);
    }

    const buildStats = JSON.parse(fs.readFileSync(buildStatsPath, 'utf8'));
    
    // Check bundle sizes
    let budgetPassed = true;

    for (const budgetItem of budget.budgets) {
      if (budgetItem.type === 'initial') {
        // Check initial bundle size
        const maxSize = parseSize(budgetItem.maximumError);
        const maxWarning = parseSize(budgetItem.maximumWarning);
        
        // Calculate total initial bundle size
        let totalSize = 0;
        Object.values(buildStats.pages).forEach(page => {
          if (Array.isArray(page)) {
            page.forEach(file => {
              if (file.endsWith('.js')) {
                const filePath = path.join(process.cwd(), '.next/static', file);
                if (fs.existsSync(filePath)) {
                  totalSize += fs.statSync(filePath).size;
                }
              }
            });
          }
        });

        console.log(`📦 Initial bundle size: ${formatSize(totalSize)}`);
        
        if (totalSize > maxSize) {
          console.error(`❌ Initial bundle exceeds maximum size (${formatSize(maxSize)})`);
          budgetPassed = false;
        } else if (totalSize > maxWarning) {
          console.warn(`⚠️ Initial bundle exceeds warning size (${formatSize(maxWarning)})`);
        } else {
          console.log('✅ Initial bundle size within budget');
        }
      }
    }

    if (budgetPassed) {
      console.log('🎉 All performance budgets passed!');
    } else {
      console.error('❌ Performance budget check failed');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error checking performance budget:', error.message);
    process.exit(1);
  }
}

function parseSize(sizeString) {
  const units = { kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024 };
  const match = sizeString.toLowerCase().match(/^(\d+(?:\.\d+)?)(kb|mb|gb)$/);
  
  if (!match) {
    throw new Error(`Invalid size format: ${sizeString}`);
  }
  
  const [, value, unit] = match;
  return parseFloat(value) * units[unit];
}

function formatSize(bytes) {
  const units = ['bytes', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

if (require.main === module) {
  checkPerformanceBudget();
}

module.exports = checkPerformanceBudget;
