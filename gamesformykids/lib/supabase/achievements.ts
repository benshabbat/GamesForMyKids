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

/** Returns an existing achievement row if the user already has it, or null. */
export async function findAchievement(
  userId: string,
  achievementType: string,
  gameType: string,
): Promise<{ id: string } | null> {
  const { data } = await supabase
    .from('achievements')
    .select('id')
    .eq('user_id', userId)
    .eq('achievement_type', achievementType)
    .eq('game_type', gameType)
    .single();

  return data ?? null;
}

/** Insert a new achievement row and return it. */
export async function insertAchievement(
  userId: string,
  achievement: NewAchievement,
): Promise<Achievement> {
  const { data, error } = await supabase
    .from('achievements')
    .insert({
      user_id: userId,
      ...achievement,
      earned_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as Achievement;
}
