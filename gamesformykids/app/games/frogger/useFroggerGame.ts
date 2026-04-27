'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const CELL = 40;
const COLS = 9;
const ROWS = 9;
export const W = COLS * CELL;
export const H = ROWS * CELL;
const CAR_W = CELL * 1.7;

import type { PhaseDead as Phase } from '@/lib/types';

const LANE_CFG = [
  { row: 1, speed: -1.3, emoji: '🚑', color: '#ef4444' },
  { row: 2, speed:  1.6, emoji: '🚗', color: '#3b82f6' },
  { row: 3, speed: -2.1, emoji: '🚕', color: '#f97316' },
  { row: 5, speed:  1.9, emoji: '🚌', color: '#8b5cf6' },
  { row: 6, speed: -1.4, emoji: '🚙', color: '#06b6d4' },
  { row: 7, speed:  2.3, emoji: '🏎️', color: '#ec4899' },
];

function makeLanes() {
  return LANE_CFG.map(cfg => ({
    ...cfg,
    cars: Array.from({ length: 3 }, (_, i) => ({
      x: i * (W / 3) + (cfg.speed > 0 ? -CAR_W : 0),
      speed: cfg.speed, emoji: cfg.emoji, color: cfg.color,
    })),
  }));
}

export function useFroggerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    fCol: 4, fRow: 8,
    lives: 3, score: 0, best: 0, level: 1,
    frame: 0, raf: 0, dead: false, deadTimer: 0,
    lanes: makeLanes(),
  });
  const [ui, setUi] = useState({ phase: 'menu' as Phase, lives: 3, score: 0, best: 0 });

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing'; s.fCol = 4; s.fRow = 8;
    s.lives = 3; s.score = 0; s.level = 1; s.frame = 0; s.dead = false; s.deadTimer = 0;
    s.lanes = makeLanes();
    setUi({ phase: 'playing', lives: 3, score: 0, best: s.best });
  }, []);

  const moveFrog = useCallback((dc: number, dr: number) => {
    const s = st.current;
    if (s.phase !== 'playing' || s.dead) return;
    const nc = Math.max(0, Math.min(COLS - 1, s.fCol + dc));
    const nr = Math.max(0, Math.min(8, s.fRow + dr));
    if (dr < 0) s.score += 2;
    s.fCol = nc; s.fRow = nr;
    if (nr === 0) { s.score += 30; s.level++; s.fCol = 4; s.fRow = 8; setUi(u => ({ ...u, score: s.score })); }
  }, []);

  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) { moveFrog(0, -1); return; }
    if (Math.abs(dx) > Math.abs(dy)) moveFrog(dx > 0 ? 1 : -1, 0);
    else moveFrog(0, dy > 0 ? 1 : -1);
  }, [moveFrog]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    function loop() {
      const s = st.current;
      s.frame++;

      if (s.phase === 'playing') {
        const mul = 1 + (s.level - 1) * 0.18;
        if (s.dead) {
          s.deadTimer--;
          if (s.deadTimer <= 0) s.dead = false;
        } else {
          for (const lane of s.lanes) {
            for (const car of lane.cars) {
              car.x += lane.speed * mul;
              if (lane.speed > 0 && car.x > W + 5) car.x -= W + CAR_W * 3.5;
              if (lane.speed < 0 && car.x + CAR_W < -5) car.x += W + CAR_W * 3.5;
            }
          }
          const fx = s.fCol * CELL + CELL / 2, fy = s.fRow * CELL + CELL / 2;
          for (const lane of s.lanes) {
            if (Math.abs(fy - (lane.row * CELL + CELL / 2)) > CELL * 0.45) continue;
            for (const car of lane.cars) {
              const cx = car.x + CAR_W / 2;
              if (Math.abs(fx - cx) < CAR_W / 2 - 4) {
                s.lives--; s.dead = true; s.deadTimer = 55; s.fCol = 4; s.fRow = 8;
                if (s.lives <= 0) { s.phase = 'dead'; if (s.score > s.best) s.best = s.score; setUi({ phase: 'dead', lives: 0, score: s.score, best: s.best }); }
              }
            }
          }
        }
      }

      for (let row = 0; row < ROWS; row++) {
        if (row === 0) ctx.fillStyle = '#14532d';
        else if (row === 4) ctx.fillStyle = '#4b5563';
        else if (row === 8) ctx.fillStyle = '#166534';
        else ctx.fillStyle = '#374151';
        ctx.fillRect(0, row * CELL, W, CELL);
        if ((row >= 1 && row <= 3) || (row >= 5 && row <= 7)) {
          ctx.fillStyle = 'rgba(255,220,0,0.2)';
          for (let c = 0; c < COLS; c++) ctx.fillRect(c * CELL + CELL / 2 - 2, row * CELL + CELL / 2 - 7, 4, 14);
        }
      }

      ctx.font = `${CELL * 0.65}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (let c = 1; c < COLS; c += 2) ctx.fillText('🏁', c * CELL + CELL / 2, CELL / 2);

      const s2 = st.current;
      for (const lane of s2.lanes) {
        for (const car of lane.cars) {
          ctx.fillStyle = car.color; ctx.beginPath(); ctx.roundRect(car.x, lane.row * CELL + 5, CAR_W, CELL - 10, 5); ctx.fill();
          ctx.font = `${CELL * 0.65}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(car.emoji, car.x + CAR_W / 2, lane.row * CELL + CELL / 2);
        }
      }

      const blink = s2.dead && s2.frame % 6 < 3;
      if (!blink) {
        ctx.font = `${CELL * 0.75}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('🐸', s2.fCol * CELL + CELL / 2, s2.fRow * CELL + CELL / 2);
      }

      ctx.font = 'bold 15px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.textAlign = 'right'; ctx.textBaseline = 'top';
      ctx.fillText(`${s2.score}`, W - 6, 4);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'ArrowUp'    || e.key === 'w') moveFrog(0, -1);
      if (e.key === 'ArrowDown'  || e.key === 's') moveFrog(0,  1);
      if (e.key === 'ArrowLeft'  || e.key === 'a') moveFrog(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') moveFrog(1, 0);
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [moveFrog]);

  return { canvasRef, ui, startGame, moveFrog, handleTouchStart, handleTouchEnd };
}
