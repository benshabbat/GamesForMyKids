import { createBrowserClient } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Whether Supabase is configured and (likely) available
export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey

// Use createBrowserClient (SSR-safe, stores session in cookies) when configured,
// otherwise fall back to a dummy client so imports don't break
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl!, supabaseAnonKey!)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

export default supabase
