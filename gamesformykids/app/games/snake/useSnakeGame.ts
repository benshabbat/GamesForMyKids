'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const COLS = 20;
const ROWS = 20;
const CELL = 20;
export const W = COLS * CELL;
export const H = ROWS * CELL;

type Dir = 'U' | 'D' | 'L' | 'R';
import type { PhaseDead as Phase } from '@/lib/types';
interface Pt { x: number; y: number; }

const EMOJIS = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🥝'];
const SPEEDS = [180, 160, 140, 120, 100, 85, 70];

function rnd(max: number) { return Math.floor(Math.random() * max); }
function ptEq(a: Pt, b: Pt) { return a.x === b.x && a.y === b.y; }

export function useSnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    snake: [{ x: 10, y: 10 }] as Pt[],
    dir: 'R' as Dir,
    nextDir: 'R' as Dir,
    food: { x: 15, y: 10 } as Pt,
    foodEmoji: '🍎',
    score: 0,
    best: 0,
    level: 1,
    timer: 0 as ReturnType<typeof setTimeout> | number,
    raf: 0,
    animFrame: 0,
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; best: number; level: number }>({ phase: 'menu', score: 0, best: 0, level: 1 });

  function placeFood(snake: Pt[]): Pt {
    let pt: Pt;
    do { pt = { x: rnd(COLS), y: rnd(ROWS) }; }
    while (snake.some(s => ptEq(s, pt)));
    return pt;
  }

  function scheduleStep() {
    const s = st.current;
    const speed = SPEEDS[Math.min(s.level - 1, SPEEDS.length - 1)];
    s.timer = setTimeout(step, speed);
  }

  function die() {
    const s = st.current;
    s.phase = 'dead';
    if (s.score > s.best) s.best = s.score;
    setUi({ phase: 'dead', score: s.score, best: s.best, level: s.level });
  }

  function step() {
    const s = st.current;
    if (s.phase !== 'playing') return;

    s.dir = s.nextDir;
    const head = s.snake[0];
    let nx = head.x, ny = head.y;
    if (s.dir === 'R') nx++;
    else if (s.dir === 'L') nx--;
    else if (s.dir === 'U') ny--;
    else ny++;

    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) { die(); return; }
    if (s.snake.some(p => ptEq(p, { x: nx, y: ny }))) { die(); return; }

    const newHead = { x: nx, y: ny };
    const ate = ptEq(newHead, s.food);
    const newSnake = [newHead, ...s.snake];
    if (!ate) newSnake.pop();

    s.snake = newSnake;

    if (ate) {
      s.score += 10;
      s.level = Math.min(7, 1 + Math.floor(s.score / 50));
      s.food = placeFood(newSnake);
      s.foodEmoji = EMOJIS[rnd(EMOJIS.length)];
      setUi(u => ({ ...u, score: s.score, level: s.level }));
    }

    scheduleStep();
  }

  const startGame = useCallback(() => {
    const s = st.current;
    clearTimeout(s.timer as ReturnType<typeof setTimeout>);
    s.phase = 'playing';
    s.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    s.dir = 'R';
    s.nextDir = 'R';
    s.food = placeFood(s.snake);
    s.foodEmoji = EMOJIS[rnd(EMOJIS.length)];
    s.score = 0;
    s.level = 1;
    setUi({ phase: 'playing', score: 0, best: s.best, level: 1 });
    scheduleStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function draw() {
      const s = st.current;
      s.animFrame++;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          ctx.fillStyle = (r + c) % 2 === 0 ? '#1a472a' : '#1e5230';
          ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
        }
      }

      if (s.phase === 'playing' || s.phase === 'dead') {
        ctx.font = `${CELL - 2}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const pulse = 1 + Math.sin(s.animFrame * 0.2) * 0.1;
        ctx.save();
        ctx.translate((s.food.x + 0.5) * CELL, (s.food.y + 0.5) * CELL);
        ctx.scale(pulse, pulse);
        ctx.fillText(s.foodEmoji, 0, 1);
        ctx.restore();

        for (let i = 0; i < s.snake.length; i++) {
          const p = s.snake[i];
          const isHead = i === 0;
          const t = 1 - i / s.snake.length;
          const r = Math.round(50 + t * 100);
          const g = Math.round(180 + t * 40);
          ctx.fillStyle = isHead ? '#00E676' : `rgb(${r},${g},40)`;
          const pad = isHead ? 1 : 2;
          ctx.beginPath();
          ctx.roundRect(p.x * CELL + pad, p.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, isHead ? 5 : 3);
          ctx.fill();

          if (isHead) {
            const eyeOff = { R: [1, -1], L: [-1, -1], U: [-1, -1], D: [1, 1] }[s.dir];
            ctx.fillStyle = 'white';
            ctx.beginPath(); ctx.arc(p.x * CELL + CELL * 0.65 + eyeOff[0] * 2, p.y * CELL + CELL * 0.3 + eyeOff[1] * 2, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#111';
            ctx.beginPath(); ctx.arc(p.x * CELL + CELL * 0.65 + eyeOff[0] * 2 + 1, p.y * CELL + CELL * 0.3 + eyeOff[1] * 2 + 1, 1.5, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      s.raf = requestAnimationFrame(draw);
    }

    st.current.raf = requestAnimationFrame(draw);
    const stRef = st.current;
    return () => {
      cancelAnimationFrame(stRef.raf);
      clearTimeout(stRef.timer as ReturnType<typeof setTimeout>);
    };
  }, []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      const map: Record<string, Dir> = {
        ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R',
        w: 'U', s: 'D', a: 'L', d: 'R',
      };
      const newDir = map[e.key];
      if (!newDir) return;
      const opposite: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
      if (newDir !== opposite[s.dir]) s.nextDir = newDir;
      e.preventDefault();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    const s = st.current;
    if (s.phase !== 'playing') return;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    if (Math.max(adx, ady) < 20) return;
    const opposite: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
    let newDir: Dir;
    if (adx > ady) newDir = dx > 0 ? 'R' : 'L';
    else newDir = dy > 0 ? 'D' : 'U';
    if (newDir !== opposite[s.dir]) s.nextDir = newDir;
  }, []);

  const controlDir = useCallback((dir: Dir) => {
    const s = st.current;
    if (s.phase !== 'playing') return;
    const opposite: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
    if (dir !== opposite[s.dir]) s.nextDir = dir;
  }, []);

  return { canvasRef, ui, startGame, handleTouchStart, handleTouchEnd, controlDir };
}
