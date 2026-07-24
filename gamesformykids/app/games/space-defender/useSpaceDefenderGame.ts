'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSpaceDefenderStore, GAME_DURATION } from './spaceDefenderStore';
import { createCanvasArcadeHook } from '@/hooks/canvas';
import { getRandomItem } from '@/lib/utils';
import { useHeldKeyControls, useKeyboardControls } from '@/hooks/shared/game-controls';
import {
  W, H, SHIP_W, SHIP_H, BULLET_SPEED, BULLET_R, ASTEROID_EMOJIS,
  type Bullet, type Asteroid,
} from './spaceDefenderConstants';
import { drawSpaceDefenderScene } from './spaceDefenderDraw';
import type { PhaseResult as Phase } from '@/lib/types';

export { W, H } from './spaceDefenderConstants';

let uid = 0;

const _useSpaceDefender = createCanvasArcadeHook({
  gameType: 'space-defender',
  width: W,
  height: H,
  initialState: () => ({
    phase: 'menu' as Phase,
    shipX: W / 2,
    bullets: [] as Bullet[],
    asteroids: [] as Asteroid[],
    score: 0, lives: 3, timeLeft: GAME_DURATION, frame: 0, nextAsteroid: 60, startTime: 0,
    stars: Array.from({ length: 40 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.5 + Math.random() * 2, twinkle: Math.random() * Math.PI * 2 })),
    lastShot: 0,
  }),
  draw: (ctx, s, dt, saveRef) => {
    if (s.phase === 'playing') {
      s.frame++;
      s.timeLeft -= dt / 1000;
      if (s.timeLeft <= 0) {
        s.timeLeft = 0;
        s.phase = 'result';
        saveRef.current({ score: s.score, level: 1, durationSeconds: Math.round((Date.now() - s.startTime) / 1000) });
        useSpaceDefenderStore.getState().setGameResult(s.score, s.lives, 0);
      }
      s.nextAsteroid--;
      if (s.nextAsteroid <= 0) {
        const r = 16 + Math.random() * 20;
        s.asteroids.push({ id: uid++, x: r + Math.random() * (W - r * 2), y: -r, speed: 1.5 + Math.random() * 2 + s.score / 500, r, emoji: getRandomItem(ASTEROID_EMOJIS)!, angle: 0, spin: (Math.random() - 0.5) * 0.06 });
        s.nextAsteroid = Math.max(20, 55 - Math.floor(s.score / 100) * 3);
      }
      s.bullets = s.bullets.filter(b => { b.y -= BULLET_SPEED; return b.y > -10; });
      for (const a of s.asteroids) { a.y += a.speed; a.angle += a.spin; }

      const toRemoveBullets = new Set<number>();
      const toRemoveAsteroids = new Set<number>();
      for (const b of s.bullets) {
        for (const a of s.asteroids) {
          const dx = b.x - a.x, dy = b.y - a.y;
          if (Math.sqrt(dx * dx + dy * dy) < a.r + BULLET_R) { toRemoveBullets.add(b.id); toRemoveAsteroids.add(a.id); s.score += 10; useSpaceDefenderStore.getState().setScore(s.score); }
        }
      }
      s.bullets = s.bullets.filter(b => !toRemoveBullets.has(b.id));
      s.asteroids = s.asteroids.filter(a => !toRemoveAsteroids.has(a.id));

      const shipY = H - 80;
      s.asteroids = s.asteroids.filter(a => {
        if (a.y + a.r > H) { s.lives--; if (s.lives <= 0) { s.lives = 0; s.phase = 'result'; saveRef.current({ score: s.score, level: 1, durationSeconds: Math.round((Date.now() - s.startTime) / 1000) }); useSpaceDefenderStore.getState().setGameResult(s.score, 0, Math.ceil(s.timeLeft)); } else { useSpaceDefenderStore.getState().setLives(s.lives); } return false; }
        if (Math.abs(a.x - s.shipX) < SHIP_W / 2 + a.r && Math.abs(a.y - shipY) < SHIP_H / 2 + a.r) { s.lives--; if (s.lives <= 0) { s.lives = 0; s.phase = 'result'; saveRef.current({ score: s.score, level: 1, durationSeconds: Math.round((Date.now() - s.startTime) / 1000) }); useSpaceDefenderStore.getState().setGameResult(s.score, 0, Math.ceil(s.timeLeft)); } else { useSpaceDefenderStore.getState().setLives(s.lives); } return false; }
        return true;
      });
      if (s.frame % 20 === 0 && s.phase === 'playing') useSpaceDefenderStore.getState().setTimeLeft(Math.ceil(s.timeLeft));
    }

    drawSpaceDefenderScene(ctx, {
      phase: s.phase,
      frame: s.frame,
      stars: s.stars,
      bullets: s.bullets,
      asteroids: s.asteroids,
      shipX: s.shipX,
    });
  },
});

export function useSpaceDefenderGame() {
  const { st, canvasRef } = _useSpaceDefender();


  const shoot = useCallback(() => {
    const s = st.current;
    if (s.phase !== 'playing') return;
    const now = s.frame;
    if (now - s.lastShot < 12) return;
    s.lastShot = now;
    s.bullets.push({ id: uid++, x: s.shipX, y: H - 80 });
  }, [st]);

  const startGame = () => {
    const s = st.current;
    s.phase = 'playing';
    s.shipX = W / 2; s.bullets = []; s.asteroids = [];
    s.score = 0; s.lives = 3; s.timeLeft = GAME_DURATION; s.frame = 0; s.nextAsteroid = 60; s.lastShot = 0; s.startTime = Date.now();
    useSpaceDefenderStore.getState().startGame();
  };


  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    st.current.shipX = Math.max(SHIP_W / 2, Math.min(W - SHIP_W / 2, (e.clientX - rect.left) * scaleX));
  };

  const handleCanvasClick = () => {
    const s = st.current;
    if (s.phase === 'playing') { shoot(); return; }
    if (s.phase === 'menu') startGame();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    st.current.shipX = Math.max(SHIP_W / 2, Math.min(W - SHIP_W / 2, (e.touches[0]!.clientX - rect.left) * scaleX));
    shoot();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase !== 'playing') startGame();
  };

  const heldRef = useRef({ left: false, right: false });
  useHeldKeyControls({
    ArrowLeft: { onDown: () => { heldRef.current.left = true; }, onUp: () => { heldRef.current.left = false; } },
    ArrowRight: { onDown: () => { heldRef.current.right = true; }, onUp: () => { heldRef.current.right = false; } },
  });
  useKeyboardControls({ ' ': shoot });

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (heldRef.current.left) s.shipX = Math.max(SHIP_W / 2, s.shipX - 5);
      if (heldRef.current.right) s.shipX = Math.min(W - SHIP_W / 2, s.shipX + 5);
    }, 16);
    return () => clearInterval(moveInterval);
  }, [st]);

  const { phase, best, score, lives, timeLeft } = useSpaceDefenderStore(useShallow(s => ({ phase: s.phase, best: s.best, score: s.score, lives: s.lives, timeLeft: s.timeLeft })));

  return { canvasRef, shoot, startGame, handleMouseMove, handleCanvasClick, handleTouchMove, handleTouchStart,
    nudgeLeft: () => { const s = st.current; s.shipX = Math.max(SHIP_W / 2, s.shipX - 40); },
    nudgeRight: () => { const s = st.current; s.shipX = Math.min(W - SHIP_W / 2, s.shipX + 40); },
    phase, best, score, lives, timeLeft,
  };
}
