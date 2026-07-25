import { unauthorized, forbidden } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { createClient } from './server';

/**
 * Server-side admin gate for /admin pages and /api/admin routes.
 * Calls unauthorized() (401) if there's no session, forbidden() (403) if the
 * caller isn't an admin. Both are Next.js control-flow functions (they throw),
 * so callers don't need to check the return value's truthiness.
 */
export async function requireAdmin(): Promise<{
  supabase: Awaited<ReturnType<typeof createClient>>;
  user: User;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) unauthorized();

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') forbidden();

  return { supabase, user };
}
