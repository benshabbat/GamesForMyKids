'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useUserProfile } from './useUserProfile';
import {
  fetchFamilyMembers,
  fetchFamilyProgress,
  joinFamilyGroup,
  createFamilyGroup,
  leaveFamilyGroup,
  type FamilyMemberProfile,
} from '@/lib/supabase/familyGroup';
import type { GameProgress } from '@/hooks/shared/progress/useGameProgress';

export interface LeaderboardRow {
  gameType: string;
  myBest: number;
  siblingBest: number;
  winner: 'me' | 'sibling' | 'tie';
}

export interface FamilyLeaderboardState {
  members: FamilyMemberProfile[];
  myProgress: GameProgress[];
  siblingProgress: GameProgress[];
  leaderboard: LeaderboardRow[];
  loading: boolean;
  error: string | null;
  familyGroupId: string | null;
}

export function useFamilyLeaderboard() {
  const { user } = useAuth();
  const { profile, updateProfile } = useUserProfile();
  const [state, setState] = useState<FamilyLeaderboardState>({
    members: [],
    myProgress: [],
    siblingProgress: [],
    leaderboard: [],
    loading: false,
    error: null,
    familyGroupId: null,
  });

  const load = useCallback(async () => {
    if (!user || !profile?.family_group_id) {
      setState(s => ({ ...s, familyGroupId: profile?.family_group_id ?? null, loading: false }));
      return;
    }

    setState(s => ({ ...s, loading: true, error: null, familyGroupId: profile.family_group_id }));
    try {
      const members = await fetchFamilyMembers(profile.family_group_id!);
      const allProgress = await fetchFamilyProgress(members.map(m => m.id));

      const mine = allProgress.filter(p => p.user_id === user.id);
      const siblings = allProgress.filter(p => p.user_id !== user.id);

      // Build leaderboard: only games where BOTH me and a sibling have played
      const myMap = Object.fromEntries(mine.map(p => [p.game_type, p.best_score]));
      const sibMap: Record<string, number> = {};
      for (const p of siblings) {
        sibMap[p.game_type] = Math.max(sibMap[p.game_type] ?? 0, p.best_score);
      }

      const shared = Object.keys(myMap).filter(gt => gt in sibMap && (myMap[gt]! > 0 || (sibMap[gt] ?? 0) > 0));
      const rows: LeaderboardRow[] = shared
        .map(gt => {
          const me = myMap[gt] ?? 0;
          const sib = sibMap[gt] ?? 0;
          return {
            gameType: gt,
            myBest: me,
            siblingBest: sib,
            winner: (me > sib ? 'me' : sib > me ? 'sibling' : 'tie') as 'me' | 'sibling' | 'tie',
          };
        })
        .sort((a, b) => Math.max(b.myBest, b.siblingBest) - Math.max(a.myBest, a.siblingBest))
        .slice(0, 10);

      setState(s => ({
        ...s,
        members,
        myProgress: mine,
        siblingProgress: siblings,
        leaderboard: rows,
        loading: false,
        familyGroupId: profile.family_group_id,
      }));
    } catch (err) {
      setState(s => ({ ...s, loading: false, error: err instanceof Error ? err.message : 'שגיאה בטעינה' }));
    }
  }, [user, profile]);

  useEffect(() => { load(); }, [load]);

  async function handleCreate() {
    if (!user) return;
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const groupId = await createFamilyGroup(user.id);
      await updateProfile({ family_group_id: groupId });
      await load();
    } catch (err) {
      setState(s => ({ ...s, loading: false, error: err instanceof Error ? err.message : 'שגיאה ביצירת הקבוצה' }));
    }
  }

  async function handleJoin(groupId: string) {
    if (!user) return;
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      await joinFamilyGroup(user.id, groupId.trim());
      await updateProfile({ family_group_id: groupId.trim() });
      await load();
    } catch (err) {
      setState(s => ({ ...s, loading: false, error: err instanceof Error ? err.message : 'שגיאה בהצטרפות לקבוצה' }));
    }
  }

  async function handleLeave() {
    if (!user) return;
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      await leaveFamilyGroup(user.id);
      await updateProfile({ family_group_id: null });
      setState({ members: [], myProgress: [], siblingProgress: [], leaderboard: [], loading: false, error: null, familyGroupId: null });
    } catch (err) {
      setState(s => ({ ...s, loading: false, error: err instanceof Error ? err.message : 'שגיאה ביציאה מהקבוצה' }));
    }
  }

  return { ...state, create: handleCreate, join: handleJoin, leave: handleLeave, refresh: load };
}
