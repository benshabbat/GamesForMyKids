'use client';

import { useEffect, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBrickBreakerStore } from './brickBreakerStore';
import { createCanvasArcadeHook } from '@/hooks/canvas';

export const W = 360;
export const H = 560;
const PAD_W = 80;
const PAD_H = 12;
const PAD_Y = H - 50;
const BALL_R = 8;
const ROWS = 6;
const COLS = 8;
const BRICK_W = Math.floor((W - 20) / COLS);
const BRICK_H = 20;
const BRICK_PAD = 3;
const BRICK_TOP = 50;

const ROW_COLORS = [
  ['#EF4444', '#DC2626'],
  ['#F97316', '#EA580C'],
  ['#EAB308', '#CA8A04'],
  ['#22C55E', '#16A34A'],
  ['#3B82F6', '#2563EB'],
  ['#8B5CF6', '#7C3AED'],
];

import type { PhaseWonDead as Phase } from '@/lib/types';
interface Brick { alive: boolean; row: number; }
type BrickParticle = { x: number; y: number; vx: number; vy: number; life: number; color: string };

/**
 * Bridge ref: populated by useBrickBreakerGame on mount, read by the draw callback.
 * Using a plain object rather than React.useRef because the draw function is defined
 * outside the component render cycle.
 */
const _nextLevelRef: { current: ((level: number) => void) | null } = { current: null };

// ── Gradient caches ──────────────────────────────────────────────────────────
// Canvas gradients are tied to a specific rendering context — re-create them if
// the context ever changes (canvas remount), but reuse across frames otherwise.
let _gradCtx: CanvasRenderingContext2D | null = null;
let _bgGradient: CanvasGradient | null = null;
const _rowGradients: (CanvasGradient | null)[] = new Array(ROWS).fill(null);

function ensureGradients(ctx: CanvasRenderingContext2D) {
  if (ctx === _gradCtx) return; // already cached for this context
  _gradCtx = ctx;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0f0c29'); bg.addColorStop(1, '#302b63');
  _bgGradient = bg;

  // Per-row brick gradients (vertical, normalised to x=0)
  for (let row = 0; row < ROWS; row++) {
    const y = BRICK_TOP + row * (BRICK_H + BRICK_PAD);
    const [c1, c2] = ROW_COLORS[row];
    const g = ctx.createLinearGradient(0, y, 0, y + BRICK_H);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    _rowGradients[row] = g;
  }
}

function makeBricks(): Brick[] {
  return Array.from({ length: ROWS * COLS }, (_, i) => ({ alive: true, row: Math.floor(i / COLS) }));
}

function brickRect(i: number) {
  const col = i % COLS, row = Math.floor(i / COLS);
  const x = 10 + col * BRICK_W, y = BRICK_TOP + row * (BRICK_H + BRICK_PAD);
  return { x, y, w: BRICK_W - BRICK_PAD, h: BRICK_H };
}

const _useBrickBreaker = createCanvasArcadeHook({
  gameType: 'brick-breaker',
  width: W,
  height: H,
  initialState: () => ({
    phase: 'menu' as Phase,
    padX: W / 2 - PAD_W / 2,
    ballX: W / 2, ballY: PAD_Y - BALL_R - 2, ballVX: 3, ballVY: -4, launched: false,
    bricks: makeBricks(), score: 0, lives: 3, level: 1, frame: 0,
    startTime: 0,
    particles: [] as BrickParticle[],
  }),
  onPointerX: (s, x) => { s.padX = Math.max(0, Math.min(W - PAD_W, x - PAD_W / 2)); },
  draw: (ctx, s, _dt, saveRef) => {    s.frame++;

    if (s.phase === 'playing') {
      if (!s.launched) { s.ballX = s.padX + PAD_W / 2; s.ballY = PAD_Y - BALL_R - 2; }
      else {
        s.ballX += s.ballVX; s.ballY += s.ballVY;
        if (s.ballX - BALL_R <= 0) { s.ballX = BALL_R; s.ballVX = Math.abs(s.ballVX); }
        if (s.ballX + BALL_R >= W) { s.ballX = W - BALL_R; s.ballVX = -Math.abs(s.ballVX); }
        if (s.ballY - BALL_R <= 0) { s.ballY = BALL_R; s.ballVY = Math.abs(s.ballVY); }
        if (s.ballY + BALL_R >= PAD_Y && s.ballY + BALL_R <= PAD_Y + PAD_H && s.ballX >= s.padX && s.ballX <= s.padX + PAD_W) {
          const rel = (s.ballX - s.padX) / PAD_W - 0.5;
          const spd = Math.sqrt(s.ballVX ** 2 + s.ballVY ** 2);
          s.ballVX = rel * spd * 2.2; s.ballVY = -Math.abs(s.ballVY);
        }
        if (s.ballY + BALL_R > H) {
          s.lives--;
          s.launched = false; s.ballX = s.padX + PAD_W / 2; s.ballY = PAD_Y - BALL_R - 2;
          if (s.lives <= 0) {
            s.lives = 0; s.phase = 'dead';
            const elapsed = Math.round((Date.now() - s.startTime) / 1000);
            saveRef.current({ score: s.score, level: s.level, durationSeconds: elapsed });
            useBrickBreakerStore.getState().setGameOver(s.score, s.level);
          } else { useBrickBreakerStore.getState().setLives(s.lives); }
        }
        for (let i = 0; i < s.bricks.length; i++) {
          if (!s.bricks[i].alive) continue;
          const { x, y, w, h } = brickRect(i);
          if (s.ballX + BALL_R > x && s.ballX - BALL_R < x + w && s.ballY + BALL_R > y && s.ballY - BALL_R < y + h) {
            s.bricks[i].alive = false; s.score += 10;
            const overlapLeft = s.ballX + BALL_R - x, overlapRight = x + w - (s.ballX - BALL_R);
            const overlapTop = s.ballY + BALL_R - y, overlapBottom = y + h - (s.ballY - BALL_R);
            if (Math.min(overlapLeft, overlapRight) < Math.min(overlapTop, overlapBottom)) s.ballVX *= -1; else s.ballVY *= -1;
            const colors = ROW_COLORS[s.bricks[i].row];
            for (let p = 0; p < 6; p++) s.particles.push({ x: x + w / 2, y: y + h / 2, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, life: 1, color: colors[Math.floor(Math.random() * colors.length)] });
            useBrickBreakerStore.getState().setScore(s.score);
          }
        }
        if (s.bricks.every(b => !b.alive)) {
          const nextLevel = s.level + 1;
          if (nextLevel > 5) {
            s.phase = 'won';
            const elapsed = Math.round((Date.now() - s.startTime) / 1000);
            saveRef.current({ score: s.score, level: s.level, durationSeconds: elapsed });
            useBrickBreakerStore.getState().setWon(s.score, s.lives, s.level);
          }
          else { _nextLevelRef.current?.(nextLevel); }
        }
      }
      s.particles = s.particles.filter(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.04; return p.life > 0; });
    }

    ensureGradients(ctx);
    ctx.fillStyle = _bgGradient!; ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < s.bricks.length; i++) {
      if (!s.bricks[i].alive) continue;
      const { x, y, w, h } = brickRect(i);
      ctx.fillStyle = _rowGradients[s.bricks[i].row]!;
      ctx.beginPath(); ctx.roundRect(x, y, w, h, 4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.roundRect(x + 2, y + 2, w - 4, 5, 3); ctx.fill();
    }

    for (const p of s.particles) { ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = 1;

    const ballGlow = ctx.createRadialGradient(s.ballX, s.ballY, 0, s.ballX, s.ballY, BALL_R * 2.5);
    ballGlow.addColorStop(0, 'rgba(255,255,255,0.4)'); ballGlow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = ballGlow; ctx.beginPath(); ctx.arc(s.ballX, s.ballY, BALL_R * 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2); ctx.fill();

    const padGrad = ctx.createLinearGradient(s.padX, PAD_Y, s.padX + PAD_W, PAD_Y);
    padGrad.addColorStop(0, '#60A5FA'); padGrad.addColorStop(0.5, '#93C5FD'); padGrad.addColorStop(1, '#60A5FA');
    ctx.fillStyle = padGrad; ctx.beginPath(); ctx.roundRect(s.padX, PAD_Y, PAD_W, PAD_H, 6); ctx.fill();

    if (s.phase === 'playing' && !s.launched) { ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '14px Arial'; ctx.textAlign = 'center'; ctx.fillText('הקש להשיק! 🏏', W / 2, PAD_Y - 20); }
  },
});

export function useBrickBreakerGame() {
  const { st, canvasRef, handlers } = _useBrickBreaker();


  const startGame = useCallback((level = 1) => {
    const s = st.current;
    s.phase = 'playing';
    s.padX = W / 2 - PAD_W / 2; s.ballX = W / 2; s.ballY = PAD_Y - BALL_R - 2;
    const spd = 3.5 + (level - 1) * 0.5;
    s.ballVX = spd; s.ballVY = -(spd + 0.5); s.launched = false;
    s.bricks = makeBricks();
    if (level === 1) s.startTime = Date.now();
    s.score = level === 1 ? 0 : s.score;
    s.lives = level === 1 ? 3 : s.lives;
    s.level = level; s.particles = [];
    useBrickBreakerStore.getState().startLevel({ score: s.score, lives: s.lives, level });
  }, [st]);

  // Wire startGame into the module-level ref so the draw loop can trigger level
  // progression. Clean up on unmount so a stale callback is never called.
  useEffect(() => {
    _nextLevelRef.current = startGame;
    return () => { _nextLevelRef.current = null; };
  }, [startGame]);

  const handleClick = useCallback(() => {
    const s = st.current;
    if (s.phase === 'playing' && !s.launched) { s.launched = true; }
    else if (s.phase === 'menu') { startGame(1); }
  }, [st, startGame]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleClick();
    handlers.onTouchMove(e);
  }, [handleClick, handlers]);

  const nudgeLeft = useCallback(() => { st.current.padX = Math.max(0, st.current.padX - 40); }, [st]);
  const nudgeRight = useCallback(() => { st.current.padX = Math.min(W - PAD_W, st.current.padX + 40); }, [st]);


  useEffect(() => {
    let left = false, right = false;
    const interval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (left) s.padX = Math.max(0, s.padX - 8);
      if (right) s.padX = Math.min(W - PAD_W, s.padX + 8);
    }, 16);
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') left = true;
      if (e.key === 'ArrowRight') right = true;
      if (e.code === 'Space') { e.preventDefault(); handleClick(); }
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') left = false;
      if (e.key === 'ArrowRight') right = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { clearInterval(interval); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, [handleClick, st]);

  const { phase, score, best, lives, level } = useBrickBreakerStore(useShallow(s => ({ phase: s.phase, score: s.score, best: s.best, lives: s.lives, level: s.level })));

  return { canvasRef, startGame, handleMouseMove: handlers.onMouseMove, handleTouchMove: handlers.onTouchMove, handleTouchStart, handleClick, nudgeLeft, nudgeRight, phase, score, best, lives, level };
}
