#!/usr/bin/env node

/**
 * ===============================================
 * סקריפט לבדיקת תקינות מערכת הטיפוסים
 * ===============================================
 */

const fs = require('fs');
const path = require('path');

// Resolved workspace root — all file traversal must stay within this directory
const WORKSPACE_ROOT = path.resolve(__dirname, '..');

const TYPES_DIR = path.join(__dirname, '../lib/types');
const COMPONENTS_DIR = path.join(__dirname, '../components');
const APP_DIR = path.join(__dirname, '../app');

/**
 * מוצא את כל הקבצים עם סיומת מסוימת
 */
function findFiles(dir, extension) {
  const files = [];
  const baseReal = fs.existsSync(dir) ? fs.realpathSync(dir) : null;
  if (!baseReal) return files;

  function traverse(currentDir) {
    let items;
    try {
      items = fs.readdirSync(currentDir);
    } catch {
      return; // unreadable directory — skip
    }

    for (const item of items) {
      const fullPath = path.join(currentDir, item);

      // Use lstat so we inspect the link itself, not its target
      let stat;
      try {
        stat = fs.lstatSync(fullPath);
      } catch {
        continue;
      }

      // Skip symlinks — they could point outside the workspace
      if (stat.isSymbolicLink()) continue;

      if (stat.isDirectory()) {
        if (item === 'node_modules' || item === '.next') continue;
        // Guard: resolved path must stay inside the workspace root
        let resolved;
        try { resolved = fs.realpathSync(fullPath); } catch { continue; }
        if (!resolved.startsWith(WORKSPACE_ROOT + path.sep) && resolved !== WORKSPACE_ROOT) continue;
        traverse(fullPath);
      } else if (item.endsWith(extension)) {
        // Guard: resolved path must stay inside the base directory
        let resolved;
        try { resolved = fs.realpathSync(fullPath); } catch { continue; }
        if (!resolved.startsWith(baseReal + path.sep) && resolved !== baseReal) continue;
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

/**
 * מוצא interfaces בקובץ
 */
function findInterfaces(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const interfaceRegex = /export\s+interface\s+(\w+)/g;
  const interfaces = [];
  let match;
  
  while ((match = interfaceRegex.exec(content)) !== null) {
    interfaces.push({
      name: match[1],
      file: filePath,
      line: content.substring(0, match.index).split('\n').length
    });
  }
  
  return interfaces;
}

/**
 * בודק דופליקייטים
 */
function checkDuplicates() {
  console.log('🔍 בודק דופליקייטים בטיפוסים...\n');
  
  const tsFiles = [
    ...findFiles(TYPES_DIR, '.ts'),
    ...findFiles(COMPONENTS_DIR, '.tsx'),
    ...findFiles(APP_DIR, '.tsx')
  ];
  
  const allInterfaces = [];
  
  for (const file of tsFiles) {
    const interfaces = findInterfaces(file);
    allInterfaces.push(...interfaces);
  }
  
  // מאגד לפי שם
  const byName = {};
  for (const iface of allInterfaces) {
    if (!byName[iface.name]) {
      byName[iface.name] = [];
    }
    byName[iface.name].push(iface);
  }
  
  // מוצא דופליקייטים
  const duplicates = Object.entries(byName)
    .filter(([name, instances]) => instances.length > 1)
    .map(([name, instances]) => ({ name, instances }));
  
  if (duplicates.length === 0) {
    console.log('✅ לא נמצאו דופליקייטים!');
  } else {
    console.log(`❌ נמצאו ${duplicates.length} טיפוסים דופליקטיביים:\n`);
    
    for (const duplicate of duplicates) {
      console.log(`🔴 ${duplicate.name}:`);
      for (const instance of duplicate.instances) {
        const relativePath = path.relative(process.cwd(), instance.file);
        console.log(`  - ${relativePath}:${instance.line}`);
      }
      console.log();
    }
  }
  
  return duplicates.length;
}

/**
 * בודק imports שבורים
 */
function checkBrokenImports() {
  console.log('🔗 בודק imports שבורים...\n');
  
  const tsFiles = findFiles(TYPES_DIR, '.ts');
  const brokenImports = [];
  
  for (const file of tsFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /import.*from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      
      if (importPath.startsWith('.')) {
        // יחסי
        const dir = path.dirname(file);
        const fullPath = path.resolve(dir, importPath);
        const possiblePaths = [
          fullPath + '.ts',
          path.join(fullPath, 'index.ts')
        ];
        
        const exists = possiblePaths.some(p => fs.existsSync(p));
        
        if (!exists) {
          brokenImports.push({
            file: path.relative(process.cwd(), file),
            importPath,
            line: content.substring(0, match.index).split('\n').length
          });
        }
      }
    }
  }
  
  if (brokenImports.length === 0) {
    console.log('✅ כל ה-imports תקינים!');
  } else {
    console.log(`❌ נמצאו ${brokenImports.length} imports שבורים:\n`);
    
    for (const broken of brokenImports) {
      console.log(`🔴 ${broken.file}:${broken.line}`);
      console.log(`  ייבוא שבור: "${broken.importPath}"`);
      console.log();
    }
  }
  
  return brokenImports.length;
}

/**
 * מריץ את כל הבדיקות
 */
function main() {
  console.log('🏥 בדיקת תקינות מערכת הטיפוסים\n');
  console.log('='.repeat(50) + '\n');
  
  const duplicatesCount = checkDuplicates();
  console.log('\n' + '-'.repeat(50) + '\n');
  
  const brokenImportsCount = checkBrokenImports();
  console.log('\n' + '='.repeat(50) + '\n');
  
  if (duplicatesCount === 0 && brokenImportsCount === 0) {
    console.log('🎉 מערכת הטיפוסים תקינה לחלוטין!');
    process.exit(0);
  } else {
    console.log(`💔 נמצאו ${duplicatesCount + brokenImportsCount} בעיות`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkDuplicates, checkBrokenImports };
