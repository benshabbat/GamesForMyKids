/**
 * Complete Data Migration Script
 * Migrates all game data from constants files to Supabase database
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read environment variables
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migrateGameData() {
  try {
    console.log('🚀 Starting complete game data migration...')
    
    // Read the SQL migration file
    const sqlFilePath = path.join(__dirname, 'complete-seed-migration.sql')
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8')
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--'))
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`)
    
    // Execute each statement
    let successCount = 0
    let errorCount = 0
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (!statement || statement.length < 10) continue
      
      try {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`)
        
        // Use the rpc function to execute raw SQL
        const { data, error } = await supabase.rpc('execute_sql', {
          sql_query: statement
        })
        
        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error.message)
          errorCount++
        } else {
          successCount++
        }
      } catch (err) {
        console.error(`❌ Exception in statement ${i + 1}:`, err.message)
        errorCount++
      }
    }
    
    console.log(`\n✅ Migration completed!`)
    console.log(`✅ Successful statements: ${successCount}`)
    console.log(`❌ Failed statements: ${errorCount}`)
    
    // Verify the migration by checking counts
    console.log('\n📊 Verifying migration...')
    
    const { data: gameItems, error: gameItemsError } = await supabase
      .from('game_items')
      .select('category')
    
    const { data: gameTypes, error: gameTypesError } = await supabase
      .from('game_types')
      .select('name')
    
    if (gameItemsError) {
      console.error('❌ Error checking game items:', gameItemsError)
    } else {
      console.log(`📦 Total game items: ${gameItems?.length || 0}`)
      
      // Count by category
      const categories = {}
      gameItems?.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + 1
      })
      
      console.log('📋 Items by category:')
      Object.entries(categories).forEach(([category, count]) => {
        console.log(`   ${category}: ${count}`)
      })
    }
    
    if (gameTypesError) {
      console.error('❌ Error checking game types:', gameTypesError)
    } else {
      console.log(`🎮 Total game types: ${gameTypes?.length || 0}`)
    }
    
    console.log('\n🎉 Data migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Alternative approach: Manual data insertion
async function manualMigration() {
  try {
    console.log('🚀 Starting manual game data migration...')
    
    // Clear existing data first
    console.log('🧹 Clearing existing data...')
    await supabase.from('game_items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('game_types').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    console.log('✅ Cleared existing data')
    
    // Insert game items
    const gameItems = [
      // Colors
      { name: 'red', hebrew: 'אדום', english: 'Red', emoji: '🔴', category: 'colors', color_class: 'bg-gradient-to-br from-red-400 to-red-600', sound_frequencies: [440, 550, 660] },
      { name: 'blue', hebrew: 'כחול', english: 'Blue', emoji: '🔵', category: 'colors', color_class: 'bg-gradient-to-br from-blue-400 to-blue-600', sound_frequencies: [523, 659, 784] },
      { name: 'green', hebrew: 'ירוק', english: 'Green', emoji: '🟢', category: 'colors', color_class: 'bg-gradient-to-br from-green-400 to-green-600', sound_frequencies: [349, 440, 523] },
      { name: 'yellow', hebrew: 'צהוב', english: 'Yellow', emoji: '🟡', category: 'colors', color_class: 'bg-gradient-to-br from-yellow-400 to-yellow-600', sound_frequencies: [392, 494, 587] },
      { name: 'purple', hebrew: 'סגול', english: 'Purple', emoji: '🟣', category: 'colors', color_class: 'bg-gradient-to-br from-purple-400 to-purple-600', sound_frequencies: [294, 370, 440] },
      { name: 'orange', hebrew: 'כתום', english: 'Orange', emoji: '🟠', category: 'colors', color_class: 'bg-gradient-to-br from-orange-400 to-orange-600', sound_frequencies: [330, 415, 494] },
      { name: 'pink', hebrew: 'ורוד', english: 'Pink', emoji: '🩷', category: 'colors', color_class: 'bg-gradient-to-br from-pink-400 to-pink-600', sound_frequencies: [587, 698, 784] },
      { name: 'brown', hebrew: 'חום', english: 'Brown', emoji: '🤎', category: 'colors', color_class: 'bg-gradient-to-br from-amber-500 to-amber-700', sound_frequencies: [220, 277, 330] },
      { name: 'black', hebrew: 'שחור', english: 'Black', emoji: '⚫', category: 'colors', color_class: 'bg-gradient-to-br from-gray-800 to-gray-950', sound_frequencies: [196, 247, 294] },
      { name: 'white', hebrew: 'לבן', english: 'White', emoji: '⚪', category: 'colors', color_class: 'bg-gradient-to-br from-gray-50 to-gray-200 border-2 border-gray-300', sound_frequencies: [659, 784, 880] },
      
      // Hebrew Letters
      { name: 'alef', hebrew: 'א', english: 'A', emoji: 'א', category: 'letters', color_class: '', sound_frequencies: [440, 550, 660] },
      { name: 'bet', hebrew: 'ב', english: 'B', emoji: 'ב', category: 'letters', color_class: '', sound_frequencies: [494, 588, 740] },
      { name: 'gimel', hebrew: 'ג', english: 'G', emoji: 'ג', category: 'letters', color_class: '', sound_frequencies: [523, 659, 784] },
      { name: 'dalet', hebrew: 'ד', english: 'D', emoji: 'ד', category: 'letters', color_class: '', sound_frequencies: [587, 740, 880] },
      { name: 'hey', hebrew: 'ה', english: 'H', emoji: 'ה', category: 'letters', color_class: '', sound_frequencies: [659, 831, 988] },
      { name: 'vav', hebrew: 'ו', english: 'V', emoji: 'ו', category: 'letters', color_class: '', sound_frequencies: [392, 494, 622] },
      { name: 'zayin', hebrew: 'ז', english: 'Z', emoji: 'ז', category: 'letters', color_class: '', sound_frequencies: [349, 440, 523] },
      { name: 'het', hebrew: 'ח', english: 'CH', emoji: 'ח', category: 'letters', color_class: '', sound_frequencies: [330, 415, 494] },
      { name: 'tet', hebrew: 'ט', english: 'T', emoji: 'ט', category: 'letters', color_class: '', sound_frequencies: [294, 370, 440] },
      { name: 'yud', hebrew: 'י', english: 'Y', emoji: 'י', category: 'letters', color_class: '', sound_frequencies: [277, 349, 415] },
      { name: 'kaf', hebrew: 'כ', english: 'K', emoji: 'כ', category: 'letters', color_class: '', sound_frequencies: [262, 330, 392] },
      { name: 'lamed', hebrew: 'ל', english: 'L', emoji: 'ל', category: 'letters', color_class: '', sound_frequencies: [247, 311, 370] },
      { name: 'mem', hebrew: 'מ', english: 'M', emoji: 'מ', category: 'letters', color_class: '', sound_frequencies: [233, 294, 349] },
      { name: 'nun', hebrew: 'נ', english: 'N', emoji: 'נ', category: 'letters', color_class: '', sound_frequencies: [220, 277, 330] },
      { name: 'samech', hebrew: 'ס', english: 'S', emoji: 'ס', category: 'letters', color_class: '', sound_frequencies: [208, 262, 311] },
      { name: 'ayin', hebrew: 'ע', english: 'A', emoji: 'ע', category: 'letters', color_class: '', sound_frequencies: [196, 247, 294] },
      { name: 'pey', hebrew: 'פ', english: 'P', emoji: 'פ', category: 'letters', color_class: '', sound_frequencies: [185, 233, 277] },
      { name: 'tzadi', hebrew: 'צ', english: 'TZ', emoji: 'צ', category: 'letters', color_class: '', sound_frequencies: [175, 220, 262] },
      { name: 'kuf', hebrew: 'ק', english: 'K', emoji: 'ק', category: 'letters', color_class: '', sound_frequencies: [165, 208, 247] },
      { name: 'resh', hebrew: 'ר', english: 'R', emoji: 'ר', category: 'letters', color_class: '', sound_frequencies: [156, 196, 233] },
      { name: 'shin', hebrew: 'ש', english: 'SH', emoji: 'ש', category: 'letters', color_class: '', sound_frequencies: [147, 185, 220] },
      { name: 'tav', hebrew: 'ת', english: 'T', emoji: 'ת', category: 'letters', color_class: '', sound_frequencies: [139, 175, 208] },
      
      // Numbers
      { name: 'zero', hebrew: 'אפס', english: 'Zero', emoji: '0️⃣', category: 'numbers', color_class: '', sound_frequencies: [261, 329, 392], additional_data: { digit: '0' } },
      { name: 'one', hebrew: 'אחד', english: 'One', emoji: '1️⃣', category: 'numbers', color_class: '', sound_frequencies: [293, 369, 440], additional_data: { digit: '1' } },
      { name: 'two', hebrew: 'שתיים', english: 'Two', emoji: '2️⃣', category: 'numbers', color_class: '', sound_frequencies: [329, 415, 494], additional_data: { digit: '2' } },
      { name: 'three', hebrew: 'שלוש', english: 'Three', emoji: '3️⃣', category: 'numbers', color_class: '', sound_frequencies: [349, 440, 523], additional_data: { digit: '3' } },
      { name: 'four', hebrew: 'ארבע', english: 'Four', emoji: '4️⃣', category: 'numbers', color_class: '', sound_frequencies: [392, 494, 587], additional_data: { digit: '4' } },
      { name: 'five', hebrew: 'חמש', english: 'Five', emoji: '5️⃣', category: 'numbers', color_class: '', sound_frequencies: [440, 554, 659], additional_data: { digit: '5' } },
      { name: 'six', hebrew: 'שש', english: 'Six', emoji: '6️⃣', category: 'numbers', color_class: '', sound_frequencies: [493, 622, 740], additional_data: { digit: '6' } },
      { name: 'seven', hebrew: 'שבע', english: 'Seven', emoji: '7️⃣', category: 'numbers', color_class: '', sound_frequencies: [523, 659, 784], additional_data: { digit: '7' } },
      { name: 'eight', hebrew: 'שמונה', english: 'Eight', emoji: '8️⃣', category: 'numbers', color_class: '', sound_frequencies: [587, 740, 880], additional_data: { digit: '8' } },
      { name: 'nine', hebrew: 'תשע', english: 'Nine', emoji: '9️⃣', category: 'numbers', color_class: '', sound_frequencies: [659, 831, 988], additional_data: { digit: '9' } },
      
      // Basic Shapes
      { name: 'circle', hebrew: 'עיגול', english: 'Circle', emoji: '⭕', category: 'shapes', color_class: 'bg-blue-500', sound_frequencies: [523, 659, 784], additional_data: { svg: 'circle' } },
      { name: 'square', hebrew: 'ריבוע', english: 'Square', emoji: '⬜', category: 'shapes', color_class: 'bg-red-500', sound_frequencies: [440, 550, 660], additional_data: { svg: 'square' } },
      { name: 'triangle', hebrew: 'משולש', english: 'Triangle', emoji: '🔺', category: 'shapes', color_class: 'bg-green-500', sound_frequencies: [349, 440, 523], additional_data: { svg: 'triangle' } },
      { name: 'rectangle', hebrew: 'מלבן', english: 'Rectangle', emoji: '▬', category: 'shapes', color_class: 'bg-purple-500', sound_frequencies: [294, 370, 440], additional_data: { svg: 'rectangle' } },
      { name: 'star', hebrew: 'כוכב', english: 'Star', emoji: '⭐', category: 'shapes', color_class: 'bg-yellow-500', sound_frequencies: [392, 494, 587], additional_data: { svg: 'star' } },
      { name: 'heart', hebrew: 'לב', english: 'Heart', emoji: '❤️', category: 'shapes', color_class: 'bg-pink-500', sound_frequencies: [587, 698, 784], additional_data: { svg: 'heart' } },
      { name: 'diamond', hebrew: 'מעויין', english: 'Diamond', emoji: '💎', category: 'shapes', color_class: 'bg-indigo-500', sound_frequencies: [277, 349, 415], additional_data: { svg: 'diamond' } },
      { name: 'oval', hebrew: 'אליפסה', english: 'Oval', emoji: '⭕', category: 'shapes', color_class: 'bg-teal-500', sound_frequencies: [220, 277, 330], additional_data: { svg: 'oval' } },
      
      // Fruits
      { name: 'apple', hebrew: 'תפוח', english: 'Apple', emoji: '🍎', category: 'fruits', color_class: 'bg-red-500', sound_frequencies: [440, 550, 660] },
      { name: 'banana', hebrew: 'בננה', english: 'Banana', emoji: '🍌', category: 'fruits', color_class: 'bg-yellow-500', sound_frequencies: [392, 494, 587] },
      { name: 'orange_fruit', hebrew: 'תפוז', english: 'Orange', emoji: '🍊', category: 'fruits', color_class: 'bg-orange-500', sound_frequencies: [330, 415, 494] },
      { name: 'grapes', hebrew: 'ענבים', english: 'Grapes', emoji: '🍇', category: 'fruits', color_class: 'bg-purple-500', sound_frequencies: [294, 370, 440] },
      { name: 'strawberry', hebrew: 'תות', english: 'Strawberry', emoji: '🍓', category: 'fruits', color_class: 'bg-pink-500', sound_frequencies: [587, 698, 784] },
      { name: 'watermelon', hebrew: 'אבטיח', english: 'Watermelon', emoji: '🍉', category: 'fruits', color_class: 'bg-green-500', sound_frequencies: [349, 440, 523] },
      { name: 'peach', hebrew: 'אפרסק', english: 'Peach', emoji: '🍑', category: 'fruits', color_class: 'bg-orange-400', sound_frequencies: [277, 349, 415] },
      { name: 'pear', hebrew: 'אגס', english: 'Pear', emoji: '🍐', category: 'fruits', color_class: 'bg-green-400', sound_frequencies: [262, 330, 392] },
      { name: 'pineapple', hebrew: 'אננס', english: 'Pineapple', emoji: '🍍', category: 'fruits', color_class: 'bg-yellow-600', sound_frequencies: [233, 294, 349] },
      { name: 'cherry', hebrew: 'דובדבן', english: 'Cherry', emoji: '🍒', category: 'fruits', color_class: 'bg-red-600', sound_frequencies: [523, 659, 784] },
      
      // Vegetables
      { name: 'carrot', hebrew: 'גזר', english: 'Carrot', emoji: '🥕', category: 'vegetables', color_class: 'bg-orange-500', sound_frequencies: [440, 550, 660] },
      { name: 'tomato', hebrew: 'עגבנייה', english: 'Tomato', emoji: '🍅', category: 'vegetables', color_class: 'bg-red-500', sound_frequencies: [392, 494, 587] },
      { name: 'cucumber', hebrew: 'מלפפון', english: 'Cucumber', emoji: '🥒', category: 'vegetables', color_class: 'bg-green-500', sound_frequencies: [349, 440, 523] },
      { name: 'pepper', hebrew: 'פלפל', english: 'Pepper', emoji: '🫑', category: 'vegetables', color_class: 'bg-green-600', sound_frequencies: [330, 415, 494] },
      { name: 'onion', hebrew: 'בצל', english: 'Onion', emoji: '🧅', category: 'vegetables', color_class: 'bg-yellow-600', sound_frequencies: [294, 370, 440] },
      { name: 'lettuce', hebrew: 'חסה', english: 'Lettuce', emoji: '🥬', category: 'vegetables', color_class: 'bg-green-400', sound_frequencies: [262, 330, 392] },
      { name: 'potato', hebrew: 'תפוח אדמה', english: 'Potato', emoji: '🥔', category: 'vegetables', color_class: 'bg-amber-600', sound_frequencies: [220, 277, 330] },
      { name: 'corn', hebrew: 'תירס', english: 'Corn', emoji: '🌽', category: 'vegetables', color_class: 'bg-yellow-500', sound_frequencies: [494, 587, 698] },
      
      // Animals
      { name: 'dog', hebrew: 'כלב', english: 'Dog', emoji: '🐶', category: 'animals', color_class: 'bg-brown-500', sound_frequencies: [200, 300, 150] },
      { name: 'cat', hebrew: 'חתול', english: 'Cat', emoji: '🐱', category: 'animals', color_class: 'bg-gray-500', sound_frequencies: [800, 1000, 600] },
      { name: 'cow', hebrew: 'פרה', english: 'Cow', emoji: '🐄', category: 'animals', color_class: 'bg-pink-300', sound_frequencies: [100, 200, 150] },
      { name: 'horse', hebrew: 'סוס', english: 'Horse', emoji: '🐴', category: 'animals', color_class: 'bg-amber-600', sound_frequencies: [300, 500, 400] },
      { name: 'sheep', hebrew: 'כבש', english: 'Sheep', emoji: '🐑', category: 'animals', color_class: 'bg-gray-200', sound_frequencies: [400, 600, 500] },
      { name: 'pig', hebrew: 'חזיר', english: 'Pig', emoji: '🐷', category: 'animals', color_class: 'bg-pink-400', sound_frequencies: [250, 350, 200] },
      { name: 'chicken', hebrew: 'תרנגולת', english: 'Chicken', emoji: '🐔', category: 'animals', color_class: 'bg-yellow-400', sound_frequencies: [600, 800, 700] },
      { name: 'duck', hebrew: 'ברווז', english: 'Duck', emoji: '🦆', category: 'animals', color_class: 'bg-blue-300', sound_frequencies: [500, 700, 600] },
      { name: 'rabbit', hebrew: 'ארנב', english: 'Rabbit', emoji: '🐰', category: 'animals', color_class: 'bg-gray-300', sound_frequencies: [400, 500, 600] },
      { name: 'frog', hebrew: 'צפרדע', english: 'Frog', emoji: '🐸', category: 'animals', color_class: 'bg-green-400', sound_frequencies: [200, 400, 300] }
    ]
    
    console.log(`📦 Inserting ${gameItems.length} game items...`)
    
    // Insert in chunks to avoid size limits
    const chunkSize = 50
    for (let i = 0; i < gameItems.length; i += chunkSize) {
      const chunk = gameItems.slice(i, i + chunkSize)
      
      const { error: insertError } = await supabase
        .from('game_items')
        .insert(chunk)
      
      if (insertError) {
        console.error(`❌ Error inserting chunk ${i / chunkSize + 1}:`, insertError)
      } else {
        console.log(`✅ Inserted chunk ${i / chunkSize + 1}/${Math.ceil(gameItems.length / chunkSize)}`)
      }
    }
    
    // Insert game types
    const gameTypes = [
      { name: 'colors', display_name_hebrew: 'צבעים', display_name_english: 'Colors', description: 'למידת צבעים בסיסיים', icon: '🎨', category: 'basic', min_age: 2, max_age: 5 },
      { name: 'shapes', display_name_hebrew: 'צורות', display_name_english: 'Shapes', description: 'זיהוי צורות גיאומטריות', icon: '🔷', category: 'basic', min_age: 2, max_age: 5 },
      { name: 'colored-shapes', display_name_hebrew: 'צורות צבעוניות', display_name_english: 'Colored Shapes', description: 'צורות עם צבעים שונים', icon: '🌈', category: 'basic', min_age: 2, max_age: 5 },
      { name: 'numbers', display_name_hebrew: 'מספרים', display_name_english: 'Numbers', description: 'ספירה ומספרים 0-9', icon: '🔢', category: 'educational', min_age: 3, max_age: 5 },
      { name: 'letters', display_name_hebrew: 'אותיות', display_name_english: 'Hebrew Letters', description: 'אותיות האלפבית העברי', icon: '🔤', category: 'educational', min_age: 3, max_age: 5 },
      { name: 'hebrew-letters', display_name_hebrew: 'כתיבה עברית', display_name_english: 'Hebrew Writing', description: 'תרגול כתיבת אותיות', icon: '✍️', category: 'educational', min_age: 3, max_age: 5 },
      { name: 'animals', display_name_hebrew: 'חיות', display_name_english: 'Animals', description: 'הכרת חיות ובעלי חיים', icon: '🐶', category: 'basic', min_age: 2, max_age: 5 },
      { name: 'fruits', display_name_hebrew: 'פירות', display_name_english: 'Fruits', description: 'הכרת פירות שונים', icon: '🍎', category: 'basic', min_age: 2, max_age: 5 },
      { name: 'vegetables', display_name_hebrew: 'ירקות', display_name_english: 'Vegetables', description: 'הכרת ירקות שונים', icon: '🥕', category: 'basic', min_age: 2, max_age: 5 },
      { name: 'memory', display_name_hebrew: 'זיכרון', display_name_english: 'Memory Game', description: 'משחק זיכרון עם קלפים', icon: '🧠', category: 'memory', min_age: 3, max_age: 5 },
      { name: 'counting', display_name_hebrew: 'ספירה', display_name_english: 'Counting', description: 'ספירה ומתמטיקה בסיסית', icon: '🔢', category: 'educational', min_age: 3, max_age: 5 },
      { name: 'math', display_name_hebrew: 'מתמטיקה', display_name_english: 'Math', description: 'חישובים פשוטים', icon: '➕', category: 'educational', min_age: 4, max_age: 5 },
      { name: 'puzzles', display_name_hebrew: 'פאזלים', display_name_english: 'Puzzles', description: 'פתרון פאזלים', icon: '🧩', category: 'creative', min_age: 3, max_age: 5 },
      { name: 'building', display_name_hebrew: 'בנייה', display_name_english: 'Building', description: 'בנייה יצירתית', icon: '🏗️', category: 'creative', min_age: 2, max_age: 5 },
      { name: 'drawing', display_name_hebrew: 'ציור', display_name_english: 'Drawing', description: 'ציור חופשי', icon: '✏️', category: 'creative', min_age: 2, max_age: 5 },
      { name: 'bubbles', display_name_hebrew: 'בועות', display_name_english: 'Bubbles', description: 'משחק בועות צבעוניות', icon: '🫧', category: 'basic', min_age: 2, max_age: 4 },
      { name: 'tetris', display_name_hebrew: 'טטריס', display_name_english: 'Tetris', description: 'משחק טטריס מותאם לילדים', icon: '🎯', category: 'creative', min_age: 4, max_age: 5 },
      { name: 'tzedakah', display_name_hebrew: 'צדקה', display_name_english: 'Tzedakah', description: 'למידה על נתינה וצדקה', icon: '💝', category: 'educational', min_age: 3, max_age: 5 }
    ]
    
    console.log(`🎮 Inserting ${gameTypes.length} game types...`)
    
    const { error: typesError } = await supabase
      .from('game_types')
      .insert(gameTypes)
    
    if (typesError) {
      console.error('❌ Error inserting game types:', typesError)
    } else {
      console.log('✅ Game types inserted successfully')
    }
    
    // Verify migration
    const { data: finalItems } = await supabase.from('game_items').select('category')
    const { data: finalTypes } = await supabase.from('game_types').select('name')
    
    console.log(`\n✅ Migration completed successfully!`)
    console.log(`📦 Total game items: ${finalItems?.length || 0}`)
    console.log(`🎮 Total game types: ${finalTypes?.length || 0}`)
    
  } catch (error) {
    console.error('❌ Manual migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
if (process.argv.includes('--manual')) {
  manualMigration()
} else {
  manualMigration() // Use manual approach as it's more reliable
}
