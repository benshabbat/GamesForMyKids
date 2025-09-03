/**
 * ===============================================
 * סקריפט לאיתור דופליקייטים של ערכים בטייפים
 * ===============================================
 * מוצא interfaces ו-types עם אותו תוכן אבל שמות שונים
 */

const fs = require('fs');
const path = require('path');

class TypeDuplicateFinder {
  constructor() {
    this.typeDefinitions = new Map(); // מפה של תוכן -> מערך של מקומות
    this.duplicates = [];
    this.stats = {
      filesScanned: 0,
      typesFound: 0,
      duplicatesFound: 0
    };
  }

  /**
   * סורק את כל הקבצים ומוצא טייפים
   */
  async scanDirectory(dirPath) {
    const files = this.getAllTypeScriptFiles(dirPath);
    
    for (const file of files) {
      try {
        await this.scanFile(file);
        this.stats.filesScanned++;
      } catch (error) {
        console.warn(`⚠️  שגיאה בסריקת קובץ ${file}: ${error.message}`);
      }
    }
  }

  /**
   * מוצא את כל קבצי ה-TypeScript
   */
  getAllTypeScriptFiles(dirPath) {
    const files = [];
    
    function scanDir(currentPath) {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.next')) {
          scanDir(fullPath);
        } else if (item.endsWith('.ts') && !item.endsWith('.d.ts')) {
          files.push(fullPath);
        }
      }
    }
    
    scanDir(dirPath);
    return files;
  }

  /**
   * סורק קובץ יחיד ומוצא בו type definitions
   */
  async scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // מוצא interfaces
    const interfaceMatches = content.matchAll(/export\s+interface\s+(\w+)(?:\s+extends\s+[^{]+)?\s*\{([^}]+)\}/g);
    for (const match of interfaceMatches) {
      this.processTypeDefinition('interface', match[1], match[2], relativePath, match.index);
    }
    
    // מוצא types
    const typeMatches = content.matchAll(/export\s+type\s+(\w+)\s*=\s*\{([^}]+)\}/g);
    for (const match of typeMatches) {
      this.processTypeDefinition('type', match[1], match[2], relativePath, match.index);
    }
    
    // מוצא types עם primitives
    const primitiveTypeMatches = content.matchAll(/export\s+type\s+(\w+)\s*=\s*([^;\n]+)/g);
    for (const match of primitiveTypeMatches) {
      if (!match[2].includes('{')) {
        this.processTypeDefinition('type', match[1], match[2].trim(), relativePath, match.index);
      }
    }
  }

  /**
   * מעבד הגדרת type יחידה
   */
  processTypeDefinition(kind, name, body, filePath, position) {
    const normalizedBody = this.normalizeTypeBody(body);
    const signature = this.createSignature(normalizedBody);
    
    if (!this.typeDefinitions.has(signature)) {
      this.typeDefinitions.set(signature, []);
    }
    
    this.typeDefinitions.get(signature).push({
      kind,
      name,
      normalizedBody,
      filePath,
      position,
      originalBody: body.trim()
    });
    
    this.stats.typesFound++;
  }

  /**
   * מנרמל את תוכן ה-type להשוואה
   */
  normalizeTypeBody(body) {
    return body
      .trim()
      .replace(/\s+/g, ' ')              // מחליף רווחים מרובים ברווח יחיד
      .replace(/;\s*/g, ';')             // מנקה רווחים אחרי ;
      .replace(/,\s*/g, ',')             // מנקה רווחים אחרי ,
      .replace(/\?\s*:/g, '?:')          // מנקה רווחים בoptional fields
      .replace(/readonly\s+/g, 'readonly ') // מנרמל readonly
      .split(';')                        // מפצל לשדות
      .filter(field => field.trim())     // מסיר שדות ריקים
      .map(field => field.trim())        // מנקה רווחים
      .sort()                            // ממיין כדי שסדר השדות לא ישפיע
      .join(';');
  }

  /**
   * יוצר חתימה ייחודית לtype
   */
  createSignature(normalizedBody) {
    // יוצר hash פשוט של התוכן
    const crypto = require('crypto');
    return crypto.createHash('md5').update(normalizedBody).digest('hex');
  }

  /**
   * מוצא דופליקייטים
   */
  findDuplicates() {
    for (const [signature, definitions] of this.typeDefinitions) {
      if (definitions.length > 1) {
        // בודק שזה באמת דופליקייט ולא type ריק
        const firstDef = definitions[0];
        if (firstDef.normalizedBody && firstDef.normalizedBody.length > 5) {
          this.duplicates.push({
            signature,
            normalizedContent: firstDef.normalizedBody,
            occurrences: definitions,
            severity: this.calculateSeverity(definitions)
          });
          this.stats.duplicatesFound++;
        }
      }
    }
    
    // ממיין לפי חומרה
    this.duplicates.sort((a, b) => b.severity - a.severity);
  }

  /**
   * מחשב חומרה של דופליקייט
   */
  calculateSeverity(definitions) {
    const numOccurrences = definitions.length;
    const contentLength = definitions[0].normalizedBody.length;
    const fileSpread = new Set(definitions.map(d => d.filePath)).size;
    
    return numOccurrences * contentLength * fileSpread;
  }

  /**
   * מדפיס דוח מפורט
   */
  printReport() {
    console.log('\n🔍 דוח איתור דופליקייטים של ערכים בטייפים');
    console.log('='.repeat(60));
    
    // סטטיסטיקות
    console.log(`📊 סטטיסטיקות:`);
    console.log(`   קבצים נסרקו: ${this.stats.filesScanned}`);
    console.log(`   טייפים נמצאו: ${this.stats.typesFound}`);
    console.log(`   דופליקייטים נמצאו: ${this.stats.duplicatesFound}`);
    
    if (this.duplicates.length === 0) {
      console.log('\n✅ לא נמצאו דופליקייטים של ערכים!');
      return;
    }
    
    console.log(`\n🚨 נמצאו ${this.duplicates.length} קבוצות דופליקייטים:\n`);
    
    for (let i = 0; i < this.duplicates.length; i++) {
      const duplicate = this.duplicates[i];
      this.printDuplicateGroup(duplicate, i + 1);
    }
    
    this.printRecommendations();
  }

  /**
   * מדפיס קבוצת דופליקייטים
   */
  printDuplicateGroup(duplicate, index) {
    console.log(`📋 דופליקייט #${index} (חומרה: ${duplicate.severity}):`);
    console.log('   תוכן משותף:');
    console.log(`   ${this.formatTypeContent(duplicate.normalizedContent)}`);
    console.log('\n   מופיע ב:');
    
    duplicate.occurrences.forEach((occurrence, idx) => {
      console.log(`   ${idx + 1}. ${occurrence.kind} ${occurrence.name}`);
      console.log(`      📁 ${occurrence.filePath}`);
      console.log(`      📝 ${occurrence.originalBody.substring(0, 100)}${occurrence.originalBody.length > 100 ? '...' : ''}`);
    });
    
    console.log('\n   💡 הצעה לתיקון:');
    console.log(`   צור base interface וחלק את השמות:`);
    const baseName = this.suggestBaseName(duplicate.occurrences);
    console.log(`   export interface ${baseName} {`);
    console.log(`     ${this.formatTypeContent(duplicate.normalizedContent, '     ')}`);
    console.log(`   }`);
    
    duplicate.occurrences.forEach(occ => {
      console.log(`   export interface ${occ.name} extends ${baseName} {}`);
    });
    
    console.log('\n' + '-'.repeat(50) + '\n');
  }

  /**
   * מציע שם base לinterface
   */
  suggestBaseName(occurrences) {
    const names = occurrences.map(o => o.name);
    
    // מוצא מילים משותפות
    const commonWords = this.findCommonWords(names);
    if (commonWords.length > 0) {
      return `Base${commonWords[0]}`;
    }
    
    // אם אין מילים משותפות, משתמש בשם הראשון
    return `Base${names[0].replace(/Props$|Type$|Interface$/, '')}`;
  }

  /**
   * מוצא מילים משותפות בשמות
   */
  findCommonWords(names) {
    const words = names.map(name => name.match(/[A-Z][a-z]*/g) || []);
    const wordCounts = {};
    
    for (const wordList of words) {
      for (const word of wordList) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    }
    
    return Object.entries(wordCounts)
      .filter(([word, count]) => count > 1)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word);
  }

  /**
   * מעצב תוכן type להדפסה
   */
  formatTypeContent(content, indent = '   ') {
    return content
      .split(';')
      .filter(field => field.trim())
      .map(field => `${indent}${field.trim()};`)
      .join('\n');
  }

  /**
   * מדפיס המלצות
   */
  printRecommendations() {
    console.log('💡 המלצות לתיקון:');
    console.log('==================');
    console.log('1. צור base interfaces עבור התכונות המשותפות');
    console.log('2. השתמש ב-composition (extends) במקום דופליקייט');
    console.log('3. החלק interfaces קטנים לפי עקרון Single Responsibility');
    console.log('4. השתמש ב-utility types כמו Pick, Omit, Partial כשמתאים');
    console.log('5. שקול שימוש ב-generic types עבור דפוסים חוזרים');
    
    if (this.duplicates.length > 0) {
      console.log('\n🔧 פקודת הרצה לתיקון אוטומטי:');
      console.log('node scripts/fix-value-duplicates.js');
    }
  }

  /**
   * שומר דוח לקובץ JSON
   */
  saveReport(outputPath = 'type-duplicates-report.json') {
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      duplicates: this.duplicates.map(dup => ({
        ...dup,
        recommendations: {
          baseName: this.suggestBaseName(dup.occurrences),
          baseInterface: this.formatTypeContent(dup.normalizedContent)
        }
      }))
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 דוח נשמר ל: ${outputPath}`);
  }
}

// הרצת הסקריפט
async function main() {
  const finder = new TypeDuplicateFinder();
  
  console.log('🔍 מתחיל סריקת טייפים עבור דופליקייטים של ערכים...\n');
  
  // סורק את תיקיית הtypes
  await finder.scanDirectory('./lib/types');
  
  // מוצא דופליקייטים
  finder.findDuplicates();
  
  // מדפיס דוח
  finder.printReport();
  
  // שומר דוח
  finder.saveReport();
}

// רץ רק אם הקובץ מופעל ישירות
if (require.main === module) {
  main().catch(console.error);
}

module.exports = TypeDuplicateFinder;
