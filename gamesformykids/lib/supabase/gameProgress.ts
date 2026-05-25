/**
 * ===============================================
 * Supabase Service — Game Progress
 * ===============================================
 * All raw `supabase.from('game_progress')` calls live here.
 * Hooks import these functions instead of calling supabase directly.
 */

import { supabase } from './client';
import type { GameProgress } from '@/hooks/shared/progress/useGameProgress';

/** Upsert a game progress row and return the saved record. */
export async function upsertGameProgress(
  userId: string,
  data: Omit<GameProgress, 'id' | 'user_id' | 'created_at'>,
): Promise<GameProgress> {
  const { data: row, error } = await supabase
    .from('game_progress')
    .upsert({ user_id: userId, ...data })
    .select()
    .single();

  if (error) throw error;
  return row as GameProgress;
}
