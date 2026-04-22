// find-unused-types.js
// Finds all exported type names in lib/types that are never referenced
// outside of lib/types (i.e. in components, hooks, app, etc.)

const fs = require('fs');
const path = require('path');

function walk(dir, exts, excludeSegments) {
  let results = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return results; }
  for (const f of entries) {
    const fp = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (!excludeSegments.some(e => fp.replace(/\\/g, '/').includes(e))) {
        results = results.concat(walk(fp, exts, excludeSegments));
      }
    } else if (exts.some(e => f.name.endsWith(e))) {
      results.push(fp);
    }
  }
  return results;
}

const root = process.cwd();
const excludedForSource = ['node_modules', '.next', 'lib/types'];

// All source files outside lib/types (normalize paths to forward slashes)
const sourceFiles = walk(root, ['.ts', '.tsx'], excludedForSource);
const outsideContent = sourceFiles
  .map(f => fs.readFileSync(f, 'utf8'))
  .join('\n');

// All type exports from lib/types
const typesDir = path.join(root, 'lib', 'types');
const typeFiles = walk(typesDir, ['.ts'], []);
const typeNames = [];
for (const f of typeFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/export\s+(?:type|interface|enum|const)\s+(\w+)/g)];
  for (const m of matches) typeNames.push(m[1]);
}
const unique = [...new Set(typeNames)].sort();

// Find unused — word-boundary check
const unused = unique.filter(name => {
  const re = new RegExp('\\b' + name + '\\b');
  return !re.test(outsideContent);
});

console.log(`=== UNUSED TYPES (${unused.length} of ${unique.length}) ===`);
unused.forEach(n => console.log('  ' + n));

console.log('\n=== USED TYPES ===');
const used = unique.filter(n => !unused.includes(n));
used.forEach(n => console.log('  ' + n));
