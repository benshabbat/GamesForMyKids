'use client';

import { useState, useRef, useEffect } from 'react';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';

const WINDOW_SIZE = 10;
const HIGH_ACCURACY = 0.85;  // bump up when accuracy > 85%
const LOW_ACCURACY  = 0.40;  // bump down when accuracy < 40%
const LEVEL_JUMP    = 3;     // steps to skip when adjusting

export interface AdaptiveBanner {
  text: string;
  positive: boolean;
}

/**
 * Watches the last WINDOW_SIZE answers and automatically adjusts
 * the game level after every 10 attempts.
 *
 * Only runs while the game is active (isGameActive = true).
 * Returns a transient banner to show the child.
 */
export function useAdaptiveDifficulty() {
  const [banner, setBanner] = useState<AdaptiveBanner | null>(null);

  const windowRef  = useRef<boolean[]>([]);
  const prevRef    = useRef({ attempts: 0, correctAnswers: 0 });
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showBanner = (text: string, positive: boolean) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBanner({ text, positive });
    timerRef.current = setTimeout(() => setBanner(null), 3000);
  };

  useEffect(() => {
    const unsub = useGameProgressStore.subscribe((state) => {
      if (!state.isGameActive) return;
      if (state.attempts === prevRef.current.attempts) return;

      const wasCorrect = state.correctAnswers > prevRef.current.correctAnswers;
      prevRef.current = { attempts: state.attempts, correctAnswers: state.correctAnswers };

      windowRef.current.push(wasCorrect);
      if (windowRef.current.length > WINDOW_SIZE) windowRef.current.shift();

      if (windowRef.current.length < WINDOW_SIZE) return;
      if (state.attempts % WINDOW_SIZE !== 0) return;

      const accuracy = windowRef.current.filter(Boolean).length / WINDOW_SIZE;

      if (accuracy > HIGH_ACCURACY) {
        const next = Math.min(state.level + LEVEL_JUMP, 30);
        if (next > state.level) {
          useGameProgressStore.getState().updateProgress({ level: next });
          showBanner('🌟 מעולה! עלית לרמה קשה יותר', true);
        }
      } else if (accuracy < LOW_ACCURACY) {
        const next = Math.max(state.level - LEVEL_JUMP, 1);
        if (next < state.level) {
          useGameProgressStore.getState().updateProgress({ level: next });
          showBanner('💪 המשך להתאמן! חזרת לרמה קלה יותר', false);
        }
      }
    });

    return () => {
      unsub();
      windowRef.current = [];
      prevRef.current = { attempts: 0, correctAnswers: 0 };
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Reset window when a new game starts (attempts reset to 0)
  useEffect(() => {
    const unsub = useGameProgressStore.subscribe((state, prev) => {
      if (state.attempts === 0 && prev.attempts > 0) {
        windowRef.current = [];
        prevRef.current = { attempts: 0, correctAnswers: 0 };
        setBanner(null);
      }
    });
    return () => unsub();
  }, []);

  return { banner };
}
