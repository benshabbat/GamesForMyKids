'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export const W = 360;
export const H = 560;
const SHIP_W = 40;
const SHIP_H = 40;
const BULLET_SPEED = 8;
const BULLET_R = 5;
const ASTEROID_EMOJIS = ['☄️', '🪨', '💫'];
const GAME_DURATION = 60;

import type { PhaseResult as Phase } from '@/lib/types';
interface Bullet { id: number; x: number; y: number; }
interface Asteroid { id: number; x: number; y: number; speed: number; r: number; emoji: string; angle: number; spin: number; }

let uid = 0;

export function useSpaceDefenderGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    shipX: W / 2,
    bullets: [] as Bullet[],
    asteroids: [] as Asteroid[],
    score: 0, lives: 3, timeLeft: GAME_DURATION, frame: 0, raf: 0, nextAsteroid: 60, best: 0,
    stars: Array.from({ length: 40 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.5 + Math.random() * 2, twinkle: Math.random() * Math.PI * 2 })),
    lastShot: 0,
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; lives: number; timeLeft: number; best: number }>(
    { phase: 'menu', score: 0, lives: 3, timeLeft: GAME_DURATION, best: 0 }
  );

  const shoot = useCallback(() => {
    const s = st.current;
    if (s.phase !== 'playing') return;
    const now = s.frame;
    if (now - s.lastShot < 12) return;
    s.lastShot = now;
    s.bullets.push({ id: uid++, x: s.shipX, y: H - 80 });
  }, []);

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.shipX = W / 2; s.bullets = []; s.asteroids = [];
    s.score = 0; s.lives = 3; s.timeLeft = GAME_DURATION; s.frame = 0; s.nextAsteroid = 60; s.lastShot = 0;
    setUi({ phase: 'playing', score: 0, lives: 3, timeLeft: GAME_DURATION, best: s.best });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    st.current.shipX = Math.max(SHIP_W / 2, Math.min(W - SHIP_W / 2, (e.clientX - rect.left) * scaleX));
  }, []);

  const handleCanvasClick = useCallback(() => {
    const s = st.current;
    if (s.phase === 'playing') { shoot(); return; }
    if (s.phase === 'menu') startGame();
  }, [shoot, startGame]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    st.current.shipX = Math.max(SHIP_W / 2, Math.min(W - SHIP_W / 2, (e.touches[0].clientX - rect.left) * scaleX));
    shoot();
  }, [shoot]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase !== 'playing') startGame();
  }, [startGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let lastTime = performance.now();

    function loop(now: number) {
      const s = st.current;
      const dt = now - lastTime;
      lastTime = now;

      if (s.phase === 'playing') {
        s.frame++;
        s.timeLeft -= dt / 1000;
        if (s.timeLeft <= 0) {
          s.timeLeft = 0;
          s.phase = 'result';
          if (s.score > s.best) s.best = s.score;
          setUi({ phase: 'result', score: s.score, lives: s.lives, timeLeft: 0, best: s.best });
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
            if (Math.sqrt(dx * dx + dy * dy) < a.r + BULLET_R) { toRemoveBullets.add(b.id); toRemoveAsteroids.add(a.id); s.score += 10; setUi(u => ({ ...u, score: s.score })); }
          }
        }
        s.bullets = s.bullets.filter(b => !toRemoveBullets.has(b.id));
        s.asteroids = s.asteroids.filter(a => !toRemoveAsteroids.has(a.id));

        const shipY = H - 80;
        s.asteroids = s.asteroids.filter(a => {
          if (a.y + a.r > H) { s.lives--; if (s.lives <= 0) { s.lives = 0; s.phase = 'result'; if (s.score > s.best) s.best = s.score; setUi({ phase: 'result', score: s.score, lives: 0, timeLeft: Math.ceil(s.timeLeft), best: s.best }); } else { setUi(u => ({ ...u, lives: s.lives })); } return false; }
          if (Math.abs(a.x - s.shipX) < SHIP_W / 2 + a.r && Math.abs(a.y - shipY) < SHIP_H / 2 + a.r) { s.lives--; if (s.lives <= 0) { s.lives = 0; s.phase = 'result'; if (s.score > s.best) s.best = s.score; setUi({ phase: 'result', score: s.score, lives: 0, timeLeft: Math.ceil(s.timeLeft), best: s.best }); } else { setUi(u => ({ ...u, lives: s.lives })); } return false; }
          return true;
        });
        if (s.frame % 20 === 0) setUi(u => u.phase === 'playing' ? { ...u, timeLeft: Math.ceil(s.timeLeft) } : u);
      }

      ctx.fillStyle = '#050514';
      ctx.fillRect(0, 0, W, H);

      for (const star of s.stars) {
        const alpha = 0.4 + Math.sin(s.frame * 0.03 + star.twinkle) * 0.3;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,220,${alpha})`; ctx.fill();
      }

      const curr = st.current;
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

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

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
  }, [shoot]);

  return { canvasRef, ui, shoot, startGame, handleMouseMove, handleCanvasClick, handleTouchMove, handleTouchStart,
    nudgeLeft: () => { const s = st.current; s.shipX = Math.max(SHIP_W / 2, s.shipX - 40); },
    nudgeRight: () => { const s = st.current; s.shipX = Math.min(W - SHIP_W / 2, s.shipX + 40); },
  };
}
