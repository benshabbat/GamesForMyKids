'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { SCENES, TIMER_START, DIFF_POINTS } from './data';

export type Phase = 'menu' | 'playing' | 'result';

export function useSpotGame() {
  const [phase, setPhase]       = useState<Phase>('menu');
  const [sceneIdx, setSceneIdx] = useState(0);
  const [found, setFound]       = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(TIMER_START);
  const [score, setScore]       = useState(0);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [shakePanel, setShake]  = useState(false);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs to avoid stale closures
  const phaseRef    = useRef<Phase>('menu');
  const sceneIdxRef = useRef(0);
  const foundRef    = useRef<Set<number>>(new Set());
  const scoreRef    = useRef(0);

  phaseRef.current    = phase;
  sceneIdxRef.current = sceneIdx;
  foundRef.current    = found;
  scoreRef.current    = score;

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startScene = useCallback((idx: number, initialScore = 0) => {
    setSceneIdx(idx);
    setFound(new Set());
    setTimeLeft(TIMER_START);
    setScore(initialScore);
    setWrongIdx(null);
    setPhase('playing');
    const s = SCENES[idx]!;
    setTimeout(() => speakHebrew(`מְצָא 5 הֶבְדֵּלִים בְּ${s.name}!`), 300);
  }, []);

  const startGame = useCallback(() => {
    const idx = Math.floor(Math.random() * SCENES.length);
    startScene(idx, 0);
  }, [startScene]);

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          stopTimer();
          setPhase('result');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return stopTimer;
  }, [phase, stopTimer]);

  const handleTap = useCallback((index: number) => {
    if (phaseRef.current !== 'playing') return;
    const scene = SCENES[sceneIdxRef.current]!;
    const foundSet = foundRef.current;
    const diff = scene.diffs.find(d => d.index === index);

    if (diff && !foundSet.has(index)) {
      const newFound = new Set(foundSet);
      newFound.add(index);
      setFound(newFound);
      const newScore = scoreRef.current + DIFF_POINTS;
      setScore(newScore);
      speakHebrew(`כֵּן! מָצָאתָ! ${diff.hint}`);

      if (newFound.size >= scene.diffs.length) {
        stopTimer();
        setTimeout(() => {
          setPhase('result');
          speakHebrew('מַדְהִים! מָצָאתָ אֶת כָּל הַ-5 הֶבְדֵּלִים!');
        }, 600);
      }
    } else {
      setWrongIdx(index);
      setShake(true);
      speakHebrew('לֹא הֶבְדֵּל כָּאן!');
      if (flashRef.current) clearTimeout(flashRef.current);
      flashRef.current = setTimeout(() => {
        setWrongIdx(null);
        setShake(false);
      }, 500);
    }
  }, [stopTimer]);

  useEffect(() => () => {
    stopTimer();
    if (flashRef.current) clearTimeout(flashRef.current);
  }, [stopTimer]);

  return {
    phase, sceneIdx, found, timeLeft, score, wrongIdx, shakePanel,
    setPhase, startGame, startScene, handleTap, stopTimer,
    scene: SCENES[sceneIdx]!,
    SCENES,
  };
}
