'use client';

import { useCallback, useRef, useEffect } from 'react';
import type { GameType } from '@/lib/types';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useGameProgressDataStore } from '@/lib/stores/gameProgressDataStore';
import { fetchGameProgress, upsertGameProgress } from '@/lib/supabase/gameProgress';
import { useAchievements } from './useAchievements';

export interface GameResult {
  score: number;
  level: number;
  durationSeconds: number;
}

export function useGameCompletion(gameType: GameType) {
  const { user } = useAuth();
  const { checkScoreAchievements, checkLevelAchievements } = useAchievements();

  const saveGameResult = useCallback(
    async ({ score, level, durationSeconds }: GameResult) => {
      if (!user) return;

      const gt = gameType as string;
      let cur = useGameProgressDataStore.getState().progress.find((p) => p.game_type === gt);

      // If not yet cached, fetch from DB so best_score / total_play_time are correct
      if (!cur) {
        try {
          const rows = await fetchGameProgress(user.id, gt);
          if (rows.length > 0) {
            cur = rows[0];
            useGameProgressDataStore.getState().upsertProgressItem(cur!);
          }
        } catch {
          // non-fatal — proceed with 0 as baseline
        }
      }

      try {
        const data = await upsertGameProgress(user.id, {
          game_type: gt,
          score,
          last_score: score,
          best_score: Math.max(cur?.best_score ?? 0, score),
          level,
          completed_levels: Math.max(cur?.completed_levels ?? 0, level - 1),
          total_play_time: (cur?.total_play_time ?? 0) + durationSeconds,
          last_played_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        useGameProgressDataStore.getState().upsertProgressItem(data);
      } catch {
        // progress save failure is non-fatal — continue to achievements
      }

      checkScoreAchievements(gt, score);
      checkLevelAchievements(gt, level);
    },
    [gameType, user, checkScoreAchievements, checkLevelAchievements],
  );

  const saveGameResultRef = useRef(saveGameResult);
  useEffect(() => {
    saveGameResultRef.current = saveGameResult;
  }, [saveGameResult]);

  return { saveGameResult, saveGameResultRef };
}
