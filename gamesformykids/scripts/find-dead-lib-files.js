// find-dead-lib-files.js
// Finds lib/ files (non-index, non-types) that are never imported anywhere

const fs = require('fs');
const path = require('path');

function walk(dir, exts, excludeSegs) {
  let r = [];
  try { var e = fs.readdirSync(dir, { withFileTypes: true }); } catch { return r; }
  for (const f of e) {
    const fp = path.join(dir, f.name);
    const fpFwd = fp.replace(/\\/g, '/');
    if (f.isDirectory()) {
      if (!excludeSegs.some(s => fpFwd.includes(s))) r = r.concat(walk(fp, exts, excludeSegs));
    } else if (exts.some(x => f.name.endsWith(x))) r.push(fp);
  }
  return r;
}

const root = process.cwd();

// All source files
const allFiles = walk(root, ['.ts', '.tsx'], ['node_modules', '.next']);
// Concatenate all source content (to search imports)
const allContent = allFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

// lib files only (not lib/types — those are type-only, already analyzed)
const libDir = path.join(root, 'lib');
const libFiles = walk(libDir, ['.ts', '.tsx'], ['node_modules', '.next', 'lib/types']);

const dead = [];
for (const f of libFiles) {
  const rel = f.replace(root + path.sep, '').replace(/\\/g, '/');
  const base = path.basename(f, path.extname(f));

  // Skip index barrel files
  if (base === 'index') continue;

  // Build search patterns: 
  // e.g. for lib/stores/fooStore.ts we search for 'stores/fooStore'
  const dirName = path.basename(path.dirname(f));
  const searchStr = dirName + '/' + base;
  const re = new RegExp(searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const count = (allContent.match(re) || []).length;

  if (count === 0) {
    dead.push(rel);
  }
}

console.log('=== LIB FILES NEVER IMPORTED (' + dead.length + ') ===');
dead.forEach(f => console.log('  ' + f));
