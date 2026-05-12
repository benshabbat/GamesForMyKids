'use client';

import { useCallback, useRef, useEffect } from 'react';
import type { GameType } from '@/lib/types';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useGameProgressDataStore } from '@/lib/stores/gameProgressDataStore';
import { useAchievements } from './useAchievements';

export interface GameResult {
  score: number;
  level: number;
  durationSeconds: number;
}

export function useGameCompletion(gameType: GameType) {
  const { user } = useAuth();
  const { checkScoreAchievements, checkLevelAchievements } = useAchievements();

  const saveGameResult = useCallback(async ({ score, level, durationSeconds }: GameResult) => {
    if (!user) return;

    const gt = gameType as string;
    const progress = useGameProgressDataStore.getState().progress;
    const cur = progress.find((p) => p.game_type === gt);

    const { data, error } = await supabase
      .from('game_progress')
      .upsert({
        user_id: user.id,
        game_type: gt,
        score,
        best_score: Math.max(cur?.best_score ?? 0, score),
        level,
        completed_levels: Math.max(cur?.completed_levels ?? 0, level - 1),
        total_play_time: (cur?.total_play_time ?? 0) + durationSeconds,
        last_played_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!error && data) {
      useGameProgressDataStore.getState().upsertProgressItem(data);
    }

    checkScoreAchievements(gt, score);
    checkLevelAchievements(gt, level);
  }, [gameType, user, checkScoreAchievements, checkLevelAchievements]);

  const saveGameResultRef = useRef(saveGameResult);
  useEffect(() => { saveGameResultRef.current = saveGameResult; }, [saveGameResult]);

  return { saveGameResult, saveGameResultRef };
}
