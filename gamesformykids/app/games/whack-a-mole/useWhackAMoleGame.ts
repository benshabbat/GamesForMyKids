'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const GRID = 9;
export const GAME_DURATION = 30;
const MOLES = ['🐹', '🐭', '🦔', '🐿️'];
const BAD = '💣';

export type HoleState = 'empty' | 'mole' | 'bad' | 'hit' | 'miss';
import type { PhaseResult as Phase } from '@/lib/types';

interface Hole {
  state: HoleState;
  value: string;
  timer: ReturnType<typeof setTimeout> | null;
}

function makeHoles(): Hole[] {
  return Array.from({ length: GRID }, () => ({ state: 'empty', value: '', timer: null }));
}

export function useWhackAMoleGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [holes, setHoles] = useState<HoleState[]>(Array(GRID).fill('empty'));
  const [holeValues, setHoleValues] = useState<string[]>(Array(GRID).fill(''));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [best, setBest] = useState(0);
  const [combo, setCombo] = useState(0);
  const holesRef = useRef<Hole[]>(makeHoles());
  const phaseRef = useRef<Phase>('menu');
  const scoreRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const moleTimers = useRef<(ReturnType<typeof setTimeout> | null)[]>(Array(GRID).fill(null));
  const moleSpawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function syncUI() {
    setHoles(holesRef.current.map(h => h.state));
    setHoleValues(holesRef.current.map(h => h.value));
  }

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (moleSpawnRef.current) clearTimeout(moleSpawnRef.current);
    moleTimers.current.forEach(t => t && clearTimeout(t));
    moleTimers.current = Array(GRID).fill(null);
  }, []);

  const spawnMole = useCallback(() => {
    if (phaseRef.current !== 'playing') return;

    const empty = holesRef.current
      .map((h, i) => ({ h, i }))
      .filter(({ h }) => h.state === 'empty')
      .map(({ i }) => i);

    if (empty.length > 0) {
      const idx = empty[Math.floor(Math.random() * empty.length)];
      const isBad = Math.random() < 0.15;
      const val = isBad ? BAD : MOLES[Math.floor(Math.random() * MOLES.length)];
      holesRef.current[idx].state = isBad ? 'bad' : 'mole';
      holesRef.current[idx].value = val;
      syncUI();

      const hideDelay = 800 + Math.random() * 800;
      moleTimers.current[idx] = setTimeout(() => {
        if (holesRef.current[idx].state === 'mole' || holesRef.current[idx].state === 'bad') {
          holesRef.current[idx].state = 'empty';
          holesRef.current[idx].value = '';
          syncUI();
        }
      }, hideDelay);
    }

    const nextDelay = 400 + Math.random() * 600;
    moleSpawnRef.current = setTimeout(spawnMole, nextDelay);
  }, []);

  const startGame = useCallback(() => {
    clearAllTimers();
    holesRef.current = makeHoles();
    phaseRef.current = 'playing';
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setCombo(0);
    setPhase('playing');
    syncUI();

    let t = GAME_DURATION;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) {
        clearAllTimers();
        phaseRef.current = 'result';
        setPhase('result');
        setBest(b => Math.max(b, scoreRef.current));
      }
    }, 1000);

    moleSpawnRef.current = setTimeout(spawnMole, 400);
  }, [clearAllTimers, spawnMole]);

  const whack = useCallback((idx: number) => {
    if (phaseRef.current !== 'playing') return;
    const h = holesRef.current[idx];
    if (h.state === 'mole') {
      if (moleTimers.current[idx]) clearTimeout(moleTimers.current[idx]);
      h.state = 'hit';
      scoreRef.current += 10;
      setScore(scoreRef.current);
      setCombo(c => c + 1);
      syncUI();
      setTimeout(() => {
        holesRef.current[idx].state = 'empty';
        holesRef.current[idx].value = '';
        syncUI();
      }, 300);
    } else if (h.state === 'bad') {
      if (moleTimers.current[idx]) clearTimeout(moleTimers.current[idx]);
      h.state = 'miss';
      scoreRef.current = Math.max(0, scoreRef.current - 15);
      setScore(scoreRef.current);
      setCombo(0);
      syncUI();
      setTimeout(() => {
        holesRef.current[idx].state = 'empty';
        holesRef.current[idx].value = '';
        syncUI();
      }, 300);
    }
  }, []);

  useEffect(() => () => clearAllTimers(), [clearAllTimers]);

  const pct = (timeLeft / GAME_DURATION) * 100;
  const bgColor = timeLeft <= 10 ? 'from-red-100 to-rose-200' : 'from-yellow-50 to-amber-100';

  return { phase, holes, holeValues, score, timeLeft, best, combo, bgColor, pct, startGame, whack };
}
