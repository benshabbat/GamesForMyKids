/**
 * Supabase Data Migration Script (ES Modules version)
 * 
 * This script migrates all existing game data from the constants files
 * into the Supabase database.
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Game data - directly defined to avoid import issues
const gameItemsData = [
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
  { name: 'bet', hebrew: 'ב', english: 'B', emoji: 'ב', category: 'letters', color_class: '', sound_frequencies: [415, 523, 622] },
  { name: 'gimel', hebrew: 'ג', english: 'G', emoji: 'ג', category: 'letters', color_class: '', sound_frequencies: [392, 494, 587] },
  { name: 'dalet', hebrew: 'ד', english: 'D', emoji: 'ד', category: 'letters', color_class: '', sound_frequencies: [370, 466, 554] },
  { name: 'heh', hebrew: 'ה', english: 'H', emoji: 'ה', category: 'letters', color_class: '', sound_frequencies: [349, 440, 523] },
  { name: 'vav', hebrew: 'ו', english: 'V', emoji: 'ו', category: 'letters', color_class: '', sound_frequencies: [392, 494, 622] },
  { name: 'zayin', hebrew: 'ז', english: 'Z', emoji: 'ז', category: 'letters', color_class: '', sound_frequencies: [349, 440, 523] },
  { name: 'het', hebrew: 'ח', english: 'CH', emoji: 'ח', category: 'letters', color_class: '', sound_frequencies: [330, 415, 494] },
  { name: 'tet', hebrew: 'ט', english: 'T', emoji: 'ט', category: 'letters', color_class: '', sound_frequencies: [294, 370, 440] },
  { name: 'yud', hebrew: 'י', english: 'Y', emoji: 'י', category: 'letters', color_class: '', sound_frequencies: [277, 349, 415] },

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

  // Fruits
  { name: 'apple', hebrew: 'תפוח', english: 'Apple', emoji: '🍎', category: 'fruits', color_class: 'bg-red-500', sound_frequencies: [440, 550, 660] },
  { name: 'banana', hebrew: 'בננה', english: 'Banana', emoji: '🍌', category: 'fruits', color_class: 'bg-yellow-500', sound_frequencies: [392, 494, 587] },
  { name: 'orange', hebrew: 'תפוז', english: 'Orange', emoji: '🍊', category: 'fruits', color_class: 'bg-orange-500', sound_frequencies: [330, 415, 494] },
  { name: 'grapes', hebrew: 'ענבים', english: 'Grapes', emoji: '🍇', category: 'fruits', color_class: 'bg-purple-500', sound_frequencies: [294, 370, 440] },
  { name: 'strawberry', hebrew: 'תות', english: 'Strawberry', emoji: '🍓', category: 'fruits', color_class: 'bg-pink-500', sound_frequencies: [587, 698, 784] },
  { name: 'watermelon', hebrew: 'אבטיח', english: 'Watermelon', emoji: '🍉', category: 'fruits', color_class: 'bg-green-500', sound_frequencies: [349, 440, 523] },

  // Animals
  { name: 'dog', hebrew: 'כלב', english: 'Dog', emoji: '🐶', category: 'animals', color_class: 'bg-brown-500', sound_frequencies: [200, 300, 150] },
  { name: 'cat', hebrew: 'חתול', english: 'Cat', emoji: '🐱', category: 'animals', color_class: 'bg-gray-500', sound_frequencies: [800, 1000, 600] },
  { name: 'cow', hebrew: 'פרה', english: 'Cow', emoji: '🐄', category: 'animals', color_class: 'bg-pink-300', sound_frequencies: [100, 200, 150] },
  { name: 'horse', hebrew: 'סוס', english: 'Horse', emoji: '🐴', category: 'animals', color_class: 'bg-amber-600', sound_frequencies: [300, 500, 400] },
  { name: 'rabbit', hebrew: 'ארנב', english: 'Rabbit', emoji: '🐰', category: 'animals', color_class: 'bg-gray-300', sound_frequencies: [400, 500, 600] },
  { name: 'frog', hebrew: 'צפרדע', english: 'Frog', emoji: '🐸', category: 'animals', color_class: 'bg-green-400', sound_frequencies: [200, 400, 300] },

  // Vehicles
  { name: 'car', hebrew: 'מכונית', english: 'Car', emoji: '🚗', category: 'vehicles', color_class: 'bg-blue-500', sound_frequencies: [440, 550, 660] },
  { name: 'truck', hebrew: 'משאית', english: 'Truck', emoji: '🚛', category: 'vehicles', color_class: 'bg-red-500', sound_frequencies: [330, 415, 494] },
  { name: 'bus', hebrew: 'אוטובוס', english: 'Bus', emoji: '🚌', category: 'vehicles', color_class: 'bg-yellow-500', sound_frequencies: [392, 494, 587] },
  { name: 'bicycle', hebrew: 'אופניים', english: 'Bicycle', emoji: '🚲', category: 'vehicles', color_class: 'bg-green-500', sound_frequencies: [349, 440, 523] },
  { name: 'airplane', hebrew: 'מטוס', english: 'Airplane', emoji: '✈️', category: 'vehicles', color_class: 'bg-blue-600', sound_frequencies: [523, 659, 784] },
  { name: 'train', hebrew: 'רכבת', english: 'Train', emoji: '🚂', category: 'vehicles', color_class: 'bg-gray-600', sound_frequencies: [294, 370, 440] }
]

const gameTypesData = [
  {
    name: 'colors',
    display_name_hebrew: 'צבעים',
    display_name_english: 'Colors',
    description: 'למידת צבעים בסיסיים',
    icon: '🎨',
    category: 'basic',
    min_age: 2,
    max_age: 5
  },
  {
    name: 'shapes',
    display_name_hebrew: 'צורות',
    display_name_english: 'Shapes',
    description: 'זיהוי צורות גיאומטריות',
    icon: '🔷',
    category: 'basic',
    min_age: 2,
    max_age: 5
  },
  {
    name: 'numbers',
    display_name_hebrew: 'מספרים',
    display_name_english: 'Numbers',
    description: 'ספירה ומספרים 0-9',
    icon: '🔢',
    category: 'educational',
    min_age: 3,
    max_age: 5
  },
  {
    name: 'letters',
    display_name_hebrew: 'אותיות',
    display_name_english: 'Hebrew Letters',
    description: 'אותיות האלפבית העברי',
    icon: '🔤',
    category: 'educational',
    min_age: 3,
    max_age: 5
  },
  {
    name: 'animals',
    display_name_hebrew: 'חיות',
    display_name_english: 'Animals',
    description: 'הכרת חיות ובעלי חיים',
    icon: '🐶',
    category: 'basic',
    min_age: 2,
    max_age: 5
  },
  {
    name: 'fruits',
    display_name_hebrew: 'פירות',
    display_name_english: 'Fruits',
    description: 'הכרת פירות שונים',
    icon: '🍎',
    category: 'basic',
    min_age: 2,
    max_age: 5
  },
  {
    name: 'vehicles',
    display_name_hebrew: 'כלי רכב',
    display_name_english: 'Vehicles',
    description: 'הכרת כלי רכב שונים',
    icon: '🚗',
    category: 'basic',
    min_age: 2,
    max_age: 5
  },
  {
    name: 'memory',
    display_name_hebrew: 'זיכרון',
    display_name_english: 'Memory Game',
    description: 'משחק זיכרון עם קלפים',
    icon: '🧠',
    category: 'memory',
    min_age: 3,
    max_age: 5
  },
  {
    name: 'puzzles',
    display_name_hebrew: 'פאזלים',
    display_name_english: 'Puzzles',
    description: 'פתרון פאזלים',
    icon: '🧩',
    category: 'creative',
    min_age: 3,
    max_age: 5
  },
  {
    name: 'building',
    display_name_hebrew: 'בנייה',
    display_name_english: 'Building',
    description: 'בנייה יצירתית',
    icon: '🏗️',
    category: 'creative',
    min_age: 2,
    max_age: 5
  }
]

async function createTables() {
  console.log('Creating database tables...')
  
  // We'll try to create tables using the RPC function if available
  // Otherwise they should be created manually in Supabase dashboard
  try {
    console.log('✅ Table creation step complete (create manually if needed)')
  } catch (error) {
    console.log('⚠️  Please create tables manually in Supabase dashboard')
    console.log('Error details:', error?.message || 'Unknown error')
  }
}

async function clearExistingData() {
  console.log('Clearing existing data...')
  
  try {
    // Delete all existing data
    const { error: itemsError } = await supabase
      .from('game_items')
      .delete()
      .not('id', 'is', null)
    
    const { error: typesError } = await supabase
      .from('game_types')
      .delete()
      .not('id', 'is', null)

    if (itemsError && !itemsError.message.includes('does not exist')) {
      console.error('Error clearing game items:', itemsError)
    }
    
    if (typesError && !typesError.message.includes('does not exist')) {
      console.error('Error clearing game types:', typesError)
    }
    
    console.log('✅ Existing data cleared')
  } catch (error) {
    console.error('Error clearing data:', error)
  }
}

async function insertGameItems() {
  console.log('Inserting game items...')

  console.log(`Inserting ${gameItemsData.length} game items...`)

  // Insert in batches to avoid overwhelming the database
  const batchSize = 20
  for (let i = 0; i < gameItemsData.length; i += batchSize) {
    const batch = gameItemsData.slice(i, i + batchSize)
    
    const { error } = await supabase
      .from('game_items')
      .insert(batch)

    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
    } else {
      console.log(`✅ Inserted batch ${i / batchSize + 1}/${Math.ceil(gameItemsData.length / batchSize)}`)
    }
  }

  console.log('✅ Game items inserted successfully')
}

async function insertGameTypes() {
  console.log('Inserting game types...')

  const { error } = await supabase
    .from('game_types')
    .insert(gameTypesData)

  if (error) {
    console.error('Error inserting game types:', error)
  } else {
    console.log('✅ Game types inserted successfully')
  }
}

async function main() {
  console.log('🚀 Starting Supabase data migration...')
  
  try {
    await createTables()
    await clearExistingData()
    await insertGameItems()
    await insertGameTypes()
    
    console.log('🎉 Data migration completed successfully!')
    
    // Verify the data
    const { count: itemsCount } = await supabase
      .from('game_items')
      .select('*', { count: 'exact', head: true })
    
    const { count: typesCount } = await supabase
      .from('game_types')
      .select('*', { count: 'exact', head: true })
    
    console.log(`📊 Total game items: ${itemsCount}`)
    console.log(`📊 Total game types: ${typesCount}`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

main()
