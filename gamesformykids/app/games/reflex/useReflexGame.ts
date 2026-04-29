'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { TARGET_EMOJIS, GAME_DURATION, Target, getLifetime, getSpawnInterval } from './data/targets';

import type { PhaseResult as ReflexPhase } from '@/lib/types';

export function useReflexGame() {
  const [phase, setPhase] = useState<ReflexPhase>('menu');
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const nextIdRef = useRef(0);
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(0);

  const clear = () => {
    if (spawnRef.current) clearTimeout(spawnRef.current);
    if (tickRef.current) clearInterval(tickRef.current);
  };

  const spawnTarget = useCallback(() => {
    if (phase !== 'playing') return;
    const id = nextIdRef.current++;
    const t: Target = {
      id,
      x: 5 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      emoji: TARGET_EMOJIS[Math.floor(Math.random() * TARGET_EMOJIS.length)] ?? TARGET_EMOJIS[0] ?? '🎯',
      lifetime: getLifetime(scoreRef.current),
      born: Date.now(),
    };
    setTargets(prev => [...prev, t]);

    // Auto-remove after lifetime
    setTimeout(() => {
      setTargets(prev => {
        const still = prev.find(x => x.id === id);
        if (still) setMissed(m => m + 1);
        return prev.filter(x => x.id !== id);
      });
    }, t.lifetime);

    // Schedule next spawn
    spawnRef.current = setTimeout(spawnTarget, getSpawnInterval(scoreRef.current));
  }, [phase]);

  const startGame = useCallback(() => {
    clear();
    scoreRef.current = 0;
    setScore(0);
    setMissed(0);
    setTargets([]);
    setTimeLeft(GAME_DURATION);
    nextIdRef.current = 0;
    setPhase('playing');
  }, []);

  // Start spawning when phase becomes 'playing'
  useEffect(() => {
    if (phase !== 'playing') return;
    spawnRef.current = setTimeout(spawnTarget, 600);
    tickRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clear();
          setPhase('result');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return clear;
  }, [phase, spawnTarget]);

  const hitTarget = useCallback((id: number) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    setScore(s => {
      const next = s + 1;
      scoreRef.current = next;
      return next;
    });
  }, []);

  return {
    phase, targets, score, missed, timeLeft,
    startGame, hitTarget,
  };
}
