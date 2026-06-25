'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useSpeedBurstStore } from '@/lib/stores/speedBurstStore';

const DURATION = 60;
const lsKey = (gt: string) => `gfk_speed_best_${gt}`;

export function useSpeedBurst(gameType: string) {
  const resetBurst = useSpeedBurstStore((s) => s.reset);

  const [timeLeft, setTimeLeft]     = useState(DURATION);
  const [done, setDone]             = useState(false);
  const [personalBest, setPersonalBest] = useState(0);
  const [correct, setCorrect]       = useState(0);
  const [total, setTotal]           = useState(0);

  const startScoreRef    = useRef(0);
  const startAttemptsRef = useRef(0);

  useEffect(() => {
    const stored = localStorage.getItem(lsKey(gameType));
    if (stored) setPersonalBest(parseInt(stored, 10) || 0);

    const state = useGameProgressStore.getState();
    startScoreRef.current    = state.score;
    startAttemptsRef.current = state.attempts;
  }, [gameType]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          const state = useGameProgressStore.getState();
          const c   = state.score    - startScoreRef.current;
          const tot = state.attempts - startAttemptsRef.current;
          setCorrect(c);
          setTotal(tot);
          if (c > 0) {
            const stored = localStorage.getItem(lsKey(gameType));
            const prev   = parseInt(stored ?? '0', 10) || 0;
            if (c > prev) {
              localStorage.setItem(lsKey(gameType), String(c));
              setPersonalBest(c);
            }
          }
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRestart = useCallback(() => { resetBurst(); }, [resetBurst]);

  const pct = (timeLeft / DURATION) * 100;
  const barColor = pct > 50 ? 'bg-green-400' : pct > 25 ? 'bg-yellow-400' : 'bg-red-500';

  return { timeLeft, done, personalBest, correct, total, pct, barColor, handleRestart };
}
