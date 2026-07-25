import 'server-only';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client — bypasses RLS entirely. Only for auth.admin.*
 * operations (suspend/delete) that have no RLS-reachable equivalent on
 * public.profiles. Import this ONLY from app/api/admin/** route handlers,
 * never from a component or a client-importable module.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Admin Supabase client is not configured (missing SUPABASE_SERVICE_ROLE_KEY)');
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
