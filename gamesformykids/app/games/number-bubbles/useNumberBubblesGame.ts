'use client';
import { useState, useCallback, useRef, useEffect } from 'react';

export const BUBBLE_COLORS = [
  'bg-red-400','bg-blue-400','bg-green-400','bg-yellow-400',
  'bg-purple-400','bg-pink-400','bg-orange-400','bg-teal-400',
  'bg-indigo-400','bg-rose-400','bg-lime-400','bg-cyan-400',
  'bg-fuchsia-400','bg-amber-400','bg-emerald-400',
];

import type { PhaseResults as GamePhase } from '@/lib/types';

export interface Bubble { id: number; num: number; x: number; y: number; color: string; popped: boolean; }

let uid = 0;

export function makeBubbles(count: number): Bubble[] {
  const nums = Array.from({ length: count }, (_, i) => i + 1);
  return nums.map(n => ({
    id: uid++,
    num: n,
    x: 5 + Math.random() * 75,
    y: 5 + Math.random() * 80,
    color: BUBBLE_COLORS[n % BUBBLE_COLORS.length],
    popped: false,
  }));
}

export function useNumberBubblesGame() {
  const [phase,   setPhase]   = useState<GamePhase>('menu');
  const [level,   setLevel]   = useState(1);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [next,    setNext]    = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [best,    setBest]    = useState<{ level: number; time: number } | null>(null);
  const [wrong,   setWrong]   = useState(false);

  const phaseRef    = useRef<GamePhase>('menu');
  const startRef    = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const startRound = useCallback((lvl: number) => {
    const count = 5 + lvl * 3;
    const bs = makeBubbles(count);
    phaseRef.current = 'playing';
    setPhase('playing');
    setBubbles(bs);
    setNext(1);
    setElapsed(0);
    setWrong(false);
    startRef.current = Date.now();
    stopTimer();
    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 100) / 10);
    }, 100);
  }, [stopTimer]);

  const startGame = useCallback(() => {
    setLevel(1);
    startRound(1);
  }, [startRound]);

  const nextLevel = useCallback((currentLevel: number) => {
    const nl = currentLevel + 1;
    setLevel(nl);
    startRound(nl);
    return nl;
  }, [startRound]);

  const tap = useCallback((bubble: Bubble, currentNext: number, currentLevel: number) => {
    if (phaseRef.current !== 'playing' || bubble.popped) return;
    if (bubble.num !== currentNext) {
      setWrong(true);
      setTimeout(() => setWrong(false), 600);
      return;
    }
    setBubbles(prev => {
      const updated = prev.map(b => b.id === bubble.id ? { ...b, popped: true } : b);
      const total = updated.length;
      const popped = updated.filter(b => b.popped).length;
      if (popped >= total) {
        stopTimer();
        const t = Math.floor((Date.now() - startRef.current) / 100) / 10;
        setElapsed(t);
        phaseRef.current = 'results';
        setPhase('results');
        setBest(old => old && old.time <= t && old.level >= currentLevel ? old : { level: currentLevel, time: t });
      }
      return updated;
    });
    setNext(currentNext + 1);
  }, [stopTimer]);
  useEffect(() => stopTimer, [stopTimer]);
  return { phase, level, bubbles, next, elapsed, best, wrong, startGame, startRound, nextLevel, tap };
}
