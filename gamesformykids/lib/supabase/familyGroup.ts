/**
 * ===============================================
 * Supabase Service — Family Group / Sibling Leaderboard
 * ===============================================
 */

import { supabase } from './client';
import type { GameProgress } from '@/hooks/shared/progress/useGameProgress';

export interface FamilyMemberProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  family_group_id: string;
}

/** Fetch all profiles that share the same family_group_id. */
export async function fetchFamilyMembers(familyGroupId: string): Promise<FamilyMemberProfile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, family_group_id')
    .eq('family_group_id', familyGroupId);

  if (error) throw error;
  return (data ?? []) as FamilyMemberProfile[];
}

/** Fetch game_progress rows for a list of user IDs (family members). */
export async function fetchFamilyProgress(userIds: string[]): Promise<GameProgress[]> {
  if (userIds.length === 0) return [];
  const { data, error } = await supabase
    .from('game_progress')
    .select('*')
    .in('user_id', userIds);

  if (error) throw error;
  return (data ?? []) as GameProgress[];
}

/** Set a user's family_group_id (join an existing group). */
export async function joinFamilyGroup(userId: string, familyGroupId: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ family_group_id: familyGroupId, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) throw error;
}

/** Create a new family group by assigning a fresh UUID to the current user and returning it. */
export async function createFamilyGroup(userId: string): Promise<string> {
  // Generate UUID in-JS so we can return it without a separate DB call
  const groupId = crypto.randomUUID();
  const { error } = await supabase
    .from('profiles')
    .update({ family_group_id: groupId, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) throw error;
  return groupId;
}

/** Remove the current user from their family group. */
export async function leaveFamilyGroup(userId: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ family_group_id: null, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) throw error;
}
