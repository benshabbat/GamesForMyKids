'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const GAME_DURATION = 40;
const BALLOON_COLORS: [string, string][] = [
  ['#EF4444', '#B91C1C'],
  ['#F97316', '#C2410C'],
  ['#EAB308', '#A16207'],
  ['#22C55E', '#15803D'],
  ['#3B82F6', '#1D4ED8'],
  ['#EC4899', '#BE185D'],
  ['#8B5CF6', '#6D28D9'],
  ['#14B8A6', '#0F766E'],
];
const BOMB_CHANCE = 0.12;

export type Phase = 'menu' | 'playing' | 'result';

export interface Balloon {
  id: number;
  x: number;
  y: number;
  r: number;
  vy: number;
  color: [string, string];
  isBomb: boolean;
  popped: boolean;
  popAnim: number;
}

let uid = 0;

function makeBalloon(w: number, h: number): Balloon {
  const isBomb = Math.random() < BOMB_CHANCE;
  return {
    id: uid++,
    x: 30 + Math.random() * (w - 60),
    y: h + 40,
    r: 22 + Math.random() * 18,
    vy: -(0.8 + Math.random() * 1.2),
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    isBomb,
    popped: false,
    popAnim: 0,
  };
}

export function useBalloonPopGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const phaseRef = useRef<Phase>('menu');
  const scoreRef = useRef(0);
  const livesRef = useRef(5);
  const balloonsRef = useRef<Balloon[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animRef = useRef<ReturnType<typeof requestAnimationFrame>>(0);
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const W = useRef(350);
  const H = useRef(560);

  useEffect(() => {
    if (containerRef.current) {
      W.current = containerRef.current.offsetWidth || 350;
      H.current = containerRef.current.offsetHeight || 560;
    }
  }, []);

  const endGame = useCallback((reason: 'time' | 'lives') => {
    void reason;
    phaseRef.current = 'result';
    setPhase('result');
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    cancelAnimationFrame(animRef.current);
    setBest(b => Math.max(b, scoreRef.current));
  }, []);

  const spawnBalloon = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    const b = makeBalloon(W.current, H.current);
    balloonsRef.current = [...balloonsRef.current, b];
    setBalloons([...balloonsRef.current]);
    const delay = Math.max(500, 1200 - frameRef.current * 2);
    spawnRef.current = setTimeout(spawnBalloon, delay);
  }, []);

  const animate = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    frameRef.current++;
    let needsUpdate = false;
    const escaped: number[] = [];
    balloonsRef.current = balloonsRef.current.map(b => {
      if (b.popped) {
        if (b.popAnim < 1) { needsUpdate = true; return { ...b, popAnim: b.popAnim + 0.1 }; }
        return b;
      }
      const ny = b.y + b.vy;
      if (ny + b.r < 0 && !b.isBomb) { escaped.push(b.id); needsUpdate = true; }
      needsUpdate = true;
      return { ...b, y: ny };
    }).filter(b => {
      if (b.popped && b.popAnim >= 1) return false;
      if (escaped.includes(b.id)) return false;
      return true;
    });

    if (escaped.length > 0) {
      livesRef.current = Math.max(0, livesRef.current - escaped.length);
      setLives(livesRef.current);
      if (livesRef.current <= 0) { endGame('lives'); return; }
    }

    if (needsUpdate) setBalloons([...balloonsRef.current]);
    animRef.current = requestAnimationFrame(animate);
  }, [endGame]);

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    cancelAnimationFrame(animRef.current);
    balloonsRef.current = [];
    scoreRef.current = 0;
    livesRef.current = 5;
    frameRef.current = 0;
    phaseRef.current = 'playing';
    setPhase('playing');
    setScore(0);
    setLives(5);
    setTimeLeft(GAME_DURATION);
    setBalloons([]);

    let t = GAME_DURATION;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) { endGame('time'); }
    }, 1000);

    spawnRef.current = setTimeout(spawnBalloon, 600);
    animRef.current = requestAnimationFrame(animate);
  }, [animate, endGame, spawnBalloon]);

  const pop = useCallback((id: number) => {
    if (phaseRef.current !== 'playing') return;
    const b = balloonsRef.current.find(b => b.id === id);
    if (!b || b.popped) return;
    if (b.isBomb) {
      livesRef.current = Math.max(0, livesRef.current - 2);
      setLives(livesRef.current);
      balloonsRef.current = balloonsRef.current.map(x => x.id === id ? { ...x, popped: true } : x);
      setBalloons([...balloonsRef.current]);
      if (livesRef.current <= 0) endGame('lives');
    } else {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      balloonsRef.current = balloonsRef.current.map(x => x.id === id ? { ...x, popped: true } : x);
      setBalloons([...balloonsRef.current]);
    }
  }, [endGame]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    cancelAnimationFrame(animRef.current);
  }, []);

  const pct = (timeLeft / GAME_DURATION) * 100;

  return { phase, score, best, lives, timeLeft, balloons, pct, containerRef, startGame, pop };
}
