'use client';

import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBrickBreakerStore } from './brickBreakerStore';
import { createCanvasArcadeHook } from '@/hooks/canvas';
import {
  W, H, PAD_W, PAD_H, PAD_Y, BALL_R, ROW_COLORS,
  type Phase, type BrickParticle,
} from './brickBreakerConstants';
import { makeBricks, brickRect, drawBrickBreakerScene } from './brickBreakerDraw';

export { W, H } from './brickBreakerConstants';

/**
 * Bridge ref: populated by useBrickBreakerGame on mount, read by the draw callback.
 * Using a plain object rather than React.useRef because the draw function is defined
 * outside the component render cycle.
 */
const _nextLevelRef: { current: ((level: number) => void) | null } = { current: null };

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
          if (!s.bricks[i]!.alive) continue;
          const { x, y, w, h } = brickRect(i);
          if (s.ballX + BALL_R > x && s.ballX - BALL_R < x + w && s.ballY + BALL_R > y && s.ballY - BALL_R < y + h) {
            s.bricks[i]!.alive = false; s.score += 10;
            const overlapLeft = s.ballX + BALL_R - x, overlapRight = x + w - (s.ballX - BALL_R);
            const overlapTop = s.ballY + BALL_R - y, overlapBottom = y + h - (s.ballY - BALL_R);
            if (Math.min(overlapLeft, overlapRight) < Math.min(overlapTop, overlapBottom)) s.ballVX *= -1; else s.ballVY *= -1;
            const colors = ROW_COLORS[s.bricks[i]!.row]!;
            for (let p = 0; p < 6; p++) s.particles.push({ x: x + w / 2, y: y + h / 2, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, life: 1, color: colors[Math.floor(Math.random() * colors.length)]! });
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

    drawBrickBreakerScene(ctx, {
      bricks: s.bricks,
      particles: s.particles,
      ballX: s.ballX,
      ballY: s.ballY,
      padX: s.padX,
      phase: s.phase,
      launched: s.launched,
    });
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
  }, [startGame, st]);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleClick();
    handlers.onTouchMove(e);
  };

  const nudgeLeft = () => { st.current.padX = Math.max(0, st.current.padX - 40); };
  const nudgeRight = () => { st.current.padX = Math.min(W - PAD_W, st.current.padX + 40); };


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
