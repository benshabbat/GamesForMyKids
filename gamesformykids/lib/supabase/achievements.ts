/**
 * ===============================================
 * Supabase Service — Achievements
 * ===============================================
 * All raw `supabase.from('achievements')` calls live here.
 * Hooks import these functions instead of calling supabase directly.
 */

import { supabase } from './client';
import type { Achievement } from '@/hooks/shared/progress/useAchievements';

type NewAchievement = Omit<Achievement, 'id' | 'user_id' | 'earned_at'>;

/** Fetch all achievements for a user, optionally filtered by game type. */
export async function fetchAchievements(
  userId: string,
  gameType?: string,
): Promise<Achievement[]> {
  let query = supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });

  if (gameType) {
    query = query.eq('game_type', gameType);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Achievement[];
}

/**
 * Returns an existing achievement row if the user already has it, or null.
 * Cross-game achievements are stored with a NULL game_type, so an empty
 * gameType is matched with `IS NULL` (`= ''` would never match them).
 * Uses limit(1) + maybeSingle() so duplicate rows never turn into an error
 * (`.single()` errors on 2+ rows, which made every later unlock insert again).
 */
export async function findAchievement(
  userId: string,
  achievementType: string,
  gameType: string,
): Promise<{ id: string } | null> {
  let query = supabase
    .from('achievements')
    .select('id')
    .eq('user_id', userId)
    .eq('achievement_type', achievementType);

  query = gameType
    ? query.eq('game_type', gameType)
    : query.is('game_type', null);

  const { data } = await query.limit(1).maybeSingle();

  return data ?? null;
}

/** Postgres unique_violation — the achievement row already exists. */
const UNIQUE_VIOLATION = '23505';

/**
 * Insert a new achievement row and return it.
 * Returns null when the row already exists (unique violation), i.e. the
 * achievement was already unlocked, so callers should not announce it again.
 */
export async function insertAchievement(
  userId: string,
  achievement: NewAchievement,
): Promise<Achievement | null> {
  const { data, error } = await supabase
    .from('achievements')
    .insert({
      user_id: userId,
      ...achievement,
      earned_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error?.code === UNIQUE_VIOLATION) return null;
  if (error) throw error;
  return data as Achievement;
}
