/**
 * Create Tables Script for Supabase
 * 
 * This script creates the required tables in the Supabase database
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require('@supabase/supabase-js')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require('dotenv')

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTables() {
  console.log('🚀 Creating Supabase tables...')

  // Create game_items table
  const createGameItemsSQL = `
    CREATE TABLE IF NOT EXISTS public.game_items (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      hebrew TEXT NOT NULL,
      english TEXT NOT NULL,
      emoji TEXT NOT NULL,
      category TEXT NOT NULL,
      subcategory TEXT,
      color_class TEXT DEFAULT '',
      sound_frequencies INTEGER[] DEFAULT '{}',
      additional_data JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `

  // Create game_types table
  const createGameTypesSQL = `
    CREATE TABLE IF NOT EXISTS public.game_types (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      display_name_hebrew TEXT NOT NULL,
      display_name_english TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      category TEXT,
      difficulty_level TEXT DEFAULT 'normal',
      min_age INTEGER DEFAULT 2,
      max_age INTEGER DEFAULT 5,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `

  // Create indexes
  const createIndexesSQL = `
    CREATE INDEX IF NOT EXISTS idx_game_items_category ON public.game_items(category);
    CREATE INDEX IF NOT EXISTS idx_game_items_name ON public.game_items(name);
    CREATE INDEX IF NOT EXISTS idx_game_types_name ON public.game_types(name);
    CREATE INDEX IF NOT EXISTS idx_game_types_category ON public.game_types(category);
  `

  // Enable RLS
  const enableRLSSQL = `
    ALTER TABLE public.game_items ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.game_types ENABLE ROW LEVEL SECURITY;
  `

  // Create policies for public read access
  const createPoliciesSQL = `
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Game items are publicly readable" ON public.game_items;
    DROP POLICY IF EXISTS "Game types are publicly readable" ON public.game_types;
    
    -- Create new policies
    CREATE POLICY "Game items are publicly readable" ON public.game_items
      FOR SELECT USING (true);
    
    CREATE POLICY "Game types are publicly readable" ON public.game_types
      FOR SELECT USING (true);
  `

  try {
    // Execute table creation
    console.log('Creating game_items table...')
    const { error: itemsError } = await supabase.rpc('exec', { sql: createGameItemsSQL })
    if (itemsError) {
      console.log('Table might already exist or creating manually:', itemsError.message)
    } else {
      console.log('✅ game_items table created')
    }

    console.log('Creating game_types table...')
    const { error: typesError } = await supabase.rpc('exec', { sql: createGameTypesSQL })
    if (typesError) {
      console.log('Table might already exist or creating manually:', typesError.message)
    } else {
      console.log('✅ game_types table created')
    }

    console.log('Creating indexes...')
    const { error: indexError } = await supabase.rpc('exec', { sql: createIndexesSQL })
    if (indexError) {
      console.log('Indexes might already exist:', indexError.message)
    } else {
      console.log('✅ Indexes created')
    }

    console.log('Enabling RLS...')
    const { error: rlsError } = await supabase.rpc('exec', { sql: enableRLSSQL })
    if (rlsError) {
      console.log('RLS might already be enabled:', rlsError.message)
    } else {
      console.log('✅ RLS enabled')
    }

    console.log('Creating policies...')
    const { error: policiesError } = await supabase.rpc('exec', { sql: createPoliciesSQL })
    if (policiesError) {
      console.log('Policies might already exist:', policiesError.message)
    } else {
      console.log('✅ Policies created')
    }

  } catch (error) {
    console.error('Error during table creation:', error)
    console.log('\n📋 Please create the tables manually in Supabase Dashboard using the SQL from schema.sql')
    process.exit(1)
  }
}

async function verifyTables() {
  console.log('\n🔍 Verifying tables exist...')

  try {
    // Check if tables exist by trying to query them
    const { error: itemsError } = await supabase
      .from('game_items')
      .select('count')
      .limit(1)

    const { error: typesError } = await supabase
      .from('game_types')
      .select('count')
      .limit(1)

    if (!itemsError) {
      console.log('✅ game_items table exists and is accessible')
    } else {
      console.log('❌ game_items table not accessible:', itemsError.message)
    }

    if (!typesError) {
      console.log('✅ game_types table exists and is accessible')
    } else {
      console.log('❌ game_types table not accessible:', typesError.message)
    }

    return !itemsError && !typesError

  } catch (error) {
    console.error('Error verifying tables:', error)
    return false
  }
}

async function main() {
  console.log('🎯 Supabase Table Creation Script')
  console.log('=====================================\n')

  try {
    await createTables()
    
    console.log('\n⏳ Waiting a moment for changes to propagate...')
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const tablesReady = await verifyTables()
    
    if (tablesReady) {
      console.log('\n🎉 All tables created successfully!')
      console.log('You can now run: npm run supabase:migrate')
    } else {
      console.log('\n⚠️  Some tables may not be ready yet.')
      console.log('Please check your Supabase Dashboard or try again in a few moments.')
    }
    
  } catch (error) {
    console.error('❌ Script failed:', error)
    process.exit(1)
  }
}

main()
