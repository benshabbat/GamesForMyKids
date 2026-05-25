/**
 * ===============================================
 * Supabase Service — Game Progress
 * ===============================================
 * All raw `supabase.from('game_progress')` calls live here.
 * Hooks import these functions instead of calling supabase directly.
 */

import { supabase } from './client';
import type { GameProgress } from '@/hooks/shared/progress/useGameProgress';

/** Fetch all progress rows for a user, optionally filtered by game type. */
export async function fetchGameProgress(
  userId: string,
  gameType?: string,
): Promise<GameProgress[]> {
  let query = supabase
    .from('game_progress')
    .select('*')
    .eq('user_id', userId);

  if (gameType) {
    query = query.eq('game_type', gameType);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as GameProgress[];
}

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

/** Update specific fields on a game progress row (upserts on user_id + game_type). */
export async function updateGameProgress(
  userId: string,
  gameType: string,
  updates: Partial<GameProgress>,
): Promise<GameProgress> {
  const { data, error } = await supabase
    .from('game_progress')
    .upsert(
      { user_id: userId, game_type: gameType, ...updates, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,game_type' },
    )
    .select()
    .single();

  if (error) throw error;
  return data as GameProgress;
}
