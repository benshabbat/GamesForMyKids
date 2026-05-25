'use client';

import { useEffect, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSpaceDefenderStore, GAME_DURATION } from './spaceDefenderStore';
import { createCanvasArcadeHook } from '@/hooks/canvas';

export const W = 360;
export const H = 560;
const SHIP_W = 40;
const SHIP_H = 40;
const BULLET_SPEED = 8;
const BULLET_R = 5;
const ASTEROID_EMOJIS = ['☄️', '🪨', '💫'];
import type { PhaseResult as Phase } from '@/lib/types';
interface Bullet { id: number; x: number; y: number; }
interface Asteroid { id: number; x: number; y: number; speed: number; r: number; emoji: string; angle: number; spin: number; }

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
        s.asteroids.push({ id: uid++, x: r + Math.random() * (W - r * 2), y: -r, speed: 1.5 + Math.random() * 2 + s.score / 500, r, emoji: ASTEROID_EMOJIS[Math.floor(Math.random() * ASTEROID_EMOJIS.length)], angle: 0, spin: (Math.random() - 0.5) * 0.06 });
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

    ctx.fillStyle = '#050514';
    ctx.fillRect(0, 0, W, H);

    for (const star of s.stars) {
      const alpha = 0.4 + Math.sin(s.frame * 0.03 + star.twinkle) * 0.3;
      ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,220,${alpha})`; ctx.fill();
    }

    const curr = s;
    for (const b of curr.bullets) {
      const grad = ctx.createLinearGradient(b.x, b.y - 14, b.x, b.y + 4);
      grad.addColorStop(0, '#FFD700'); grad.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.ellipse(b.x, b.y - 7, BULLET_R, 14, 0, 0, Math.PI * 2); ctx.fill();
    }

    ctx.font = 'serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const a of curr.asteroids) {
      ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(a.angle);
      ctx.font = `${a.r * 1.8}px serif`; ctx.fillText(a.emoji, 0, 0); ctx.restore();
    }

    const sx = curr.shipX, sy = H - 80;
    ctx.save(); ctx.translate(sx, sy);
    if (curr.phase === 'playing') {
      const thrustGrad = ctx.createRadialGradient(0, SHIP_H / 2 + 6, 0, 0, SHIP_H / 2 + 6, 18);
      thrustGrad.addColorStop(0, 'rgba(255,140,0,0.9)'); thrustGrad.addColorStop(0.5, 'rgba(255,60,0,0.5)'); thrustGrad.addColorStop(1, 'rgba(255,0,0,0)');
      ctx.fillStyle = thrustGrad;
      const flicker = curr.frame % 4 < 2 ? 14 : 10;
      ctx.beginPath(); ctx.ellipse(0, SHIP_H / 2 + flicker / 2, 8, flicker, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#4FC3F7';
    ctx.beginPath(); ctx.moveTo(0, -SHIP_H / 2); ctx.lineTo(SHIP_W / 2, SHIP_H / 2); ctx.lineTo(-SHIP_W / 2, SHIP_H / 2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#B3E5FC';
    ctx.beginPath(); ctx.ellipse(0, -4, 9, 13, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0288D1';
    ctx.beginPath(); ctx.moveTo(SHIP_W / 2, SHIP_H / 2); ctx.lineTo(SHIP_W / 2 + 14, SHIP_H / 2 + 6); ctx.lineTo(SHIP_W / 3, 4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-SHIP_W / 2, SHIP_H / 2); ctx.lineTo(-SHIP_W / 2 - 14, SHIP_H / 2 + 6); ctx.lineTo(-SHIP_W / 3, 4); ctx.fill();
    ctx.restore();

    ctx.fillStyle = 'rgba(30,100,50,0.3)'; ctx.fillRect(0, H - 18, W, 18);
    ctx.fillStyle = 'rgba(50,150,80,0.5)'; ctx.fillRect(0, H - 10, W, 10);
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

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.shipX = W / 2; s.bullets = []; s.asteroids = [];
    s.score = 0; s.lives = 3; s.timeLeft = GAME_DURATION; s.frame = 0; s.nextAsteroid = 60; s.lastShot = 0; s.startTime = Date.now();
    useSpaceDefenderStore.getState().startGame();
  }, [st]);


  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    st.current.shipX = Math.max(SHIP_W / 2, Math.min(W - SHIP_W / 2, (e.clientX - rect.left) * scaleX));
  }, [st, canvasRef]);

  const handleCanvasClick = useCallback(() => {
    const s = st.current;
    if (s.phase === 'playing') { shoot(); return; }
    if (s.phase === 'menu') startGame();
  }, [st, shoot, startGame]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    st.current.shipX = Math.max(SHIP_W / 2, Math.min(W - SHIP_W / 2, (e.touches[0].clientX - rect.left) * scaleX));
    shoot();
  }, [st, canvasRef, shoot]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase !== 'playing') startGame();
  }, [st, startGame]);

  useEffect(() => {
    let leftDown = false, rightDown = false;
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') leftDown = true;
      if (e.key === 'ArrowRight') rightDown = true;
      if (e.code === 'Space') { e.preventDefault(); shoot(); }
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') leftDown = false;
      if (e.key === 'ArrowRight') rightDown = false;
    };
    const moveInterval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (leftDown) s.shipX = Math.max(SHIP_W / 2, s.shipX - 5);
      if (rightDown) s.shipX = Math.min(W - SHIP_W / 2, s.shipX + 5);
    }, 16);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); clearInterval(moveInterval); };
  }, [st, shoot]);

  const { phase, best, score, lives, timeLeft } = useSpaceDefenderStore(useShallow(s => ({ phase: s.phase, best: s.best, score: s.score, lives: s.lives, timeLeft: s.timeLeft })));

  return { canvasRef, shoot, startGame, handleMouseMove, handleCanvasClick, handleTouchMove, handleTouchStart,
    nudgeLeft: () => { const s = st.current; s.shipX = Math.max(SHIP_W / 2, s.shipX - 40); },
    nudgeRight: () => { const s = st.current; s.shipX = Math.min(W - SHIP_W / 2, s.shipX + 40); },
    phase, best, score, lives, timeLeft,
  };
}
