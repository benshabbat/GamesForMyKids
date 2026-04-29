'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export const W = 360;
export const H = 560;
const PLAYER_R = 18;
const PLAYER_Y = H - 70;
const METEOR_EMOJIS = ['☄️', '🪨', '💫', '⚡'];
const STAR_EMOJIS = ['⭐', '🌟', '💎'];

import type { PhaseDead as Phase } from '@/lib/types';
interface Meteor { id: number; x: number; y: number; r: number; speed: number; emoji: string; spin: number; angle: number; }
interface StarPick { id: number; x: number; y: number; vy: number; emoji: string; }

let uid = 0;

export function useMeteorDodgeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    playerX: W / 2,
    meteors: [] as Meteor[], stars: [] as StarPick[],
    score: 0, best: 0, frame: 0, raf: 0, nextMeteor: 50, nextStar: 120,
    bgStars: Array.from({ length: 50 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.5 + Math.random() * 1.5, twinkle: Math.random() * Math.PI * 2 })),
    invincible: 0,
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; best: number }>({ phase: 'menu', score: 0, best: 0 });

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing'; s.playerX = W / 2; s.meteors = []; s.stars = [];
    s.score = 0; s.frame = 0; s.nextMeteor = 50; s.nextStar = 120; s.invincible = 0;
    setUi({ phase: 'playing', score: 0, best: s.best });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (st.current.phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    st.current.playerX = Math.max(PLAYER_R, Math.min(W - PLAYER_R, (e.clientX - rect.left) * (W / rect.width)));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase !== 'playing') return;
    const t = e.touches[0];
    if (!t) return;
    const rect = e.currentTarget.getBoundingClientRect();
    st.current.playerX = Math.max(PLAYER_R, Math.min(W - PLAYER_R, (t.clientX - rect.left) * (W / rect.width)));
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (st.current.phase === 'menu') startGame();
  }, [startGame]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase === 'menu') startGame();
    handleTouchMove(e);
  }, [startGame, handleTouchMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    function loop() {
      const s = st.current;

      if (s.phase === 'playing') {
        s.frame++;
        s.score = Math.floor(s.frame / 4);
        if (s.invincible > 0) s.invincible--;

        const difficulty = 1 + Math.floor(s.score / 100) * 0.3;
        s.nextMeteor--;
        if (s.nextMeteor <= 0) {
          const r = 14 + Math.random() * 20;
          s.meteors.push({ id: uid++, x: r + Math.random() * (W - r * 2), y: -r, r, speed: (1.8 + Math.random() * 2) * difficulty, emoji: METEOR_EMOJIS[Math.floor(Math.random() * METEOR_EMOJIS.length)] ?? METEOR_EMOJIS[0] ?? '☄️', spin: (Math.random() - 0.5) * 0.1, angle: 0 });
          s.nextMeteor = Math.max(15, Math.floor((50 - s.score / 20)));
        }
        s.nextStar--;
        if (s.nextStar <= 0) {
          s.stars.push({ id: uid++, x: 20 + Math.random() * (W - 40), y: -20, vy: 1.5 + Math.random(), emoji: STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)] ?? STAR_EMOJIS[0] ?? '⭐' });
          s.nextStar = 100 + Math.random() * 100;
        }

        for (const m of s.meteors) { m.y += m.speed; m.angle += m.spin; }
        s.meteors = s.meteors.filter(m => m.y - m.r < H + 10);
        for (const st2 of s.stars) st2.y += st2.vy;
        s.stars = s.stars.filter(st2 => st2.y < H + 20);

        s.stars = s.stars.filter(st2 => {
          const dx = st2.x - s.playerX, dy = st2.y - PLAYER_Y;
          if (Math.sqrt(dx * dx + dy * dy) < PLAYER_R + 16) { s.score += 50; setUi(u => ({ ...u, score: s.score })); return false; }
          return true;
        });

        if (s.invincible === 0) {
          for (const m of s.meteors) {
            const dx = m.x - s.playerX, dy = m.y - PLAYER_Y;
            if (Math.sqrt(dx * dx + dy * dy) < PLAYER_R + m.r - 8) { s.phase = 'dead'; if (s.score > s.best) s.best = s.score; setUi({ phase: 'dead', score: s.score, best: s.best }); break; }
          }
        }

        if (s.frame % 8 === 0) setUi(u => u.phase === 'playing' ? { ...u, score: s.score } : u);
      }

      ctx.fillStyle = '#030712'; ctx.fillRect(0, 0, W, H);
      const curr = st.current;
      for (const star of curr.bgStars) {
        const alpha = 0.3 + Math.sin(curr.frame * 0.02 + star.twinkle) * 0.3;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,230,${alpha})`; ctx.fill();
      }

      const neb = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, 180);
      neb.addColorStop(0, 'rgba(99,0,150,0.08)'); neb.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = neb; ctx.fillRect(0, 0, W, H);

      ctx.font = '28px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (const st2 of curr.stars) {
        const glow = ctx.createRadialGradient(st2.x, st2.y, 0, st2.x, st2.y, 22);
        glow.addColorStop(0, 'rgba(255,220,0,0.4)'); glow.addColorStop(1, 'rgba(255,220,0,0)');
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(st2.x, st2.y, 22, 0, Math.PI * 2); ctx.fill();
        ctx.fillText(st2.emoji, st2.x, st2.y);
      }

      for (const m of curr.meteors) {
        ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.angle);
        ctx.font = `${m.r * 1.8}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(m.emoji, 0, 0); ctx.restore();
      }

      const blink = curr.invincible > 0 && curr.frame % 6 < 3;
      if (!blink) {
        const glow = ctx.createRadialGradient(curr.playerX, PLAYER_Y, 0, curr.playerX, PLAYER_Y, PLAYER_R * 2);
        glow.addColorStop(0, 'rgba(200,150,255,0.5)'); glow.addColorStop(1, 'rgba(150,50,255,0)');
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(curr.playerX, PLAYER_Y, PLAYER_R * 2, 0, Math.PI * 2); ctx.fill();
        ctx.font = `${PLAYER_R * 2}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('🚀', curr.playerX, PLAYER_Y);
      }

      ctx.font = 'bold 20px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.textAlign = 'right';
      ctx.fillText(`${curr.score}`, W - 12, 28);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  useEffect(() => {
    let left = false, right = false;
    const interval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (left) s.playerX = Math.max(PLAYER_R, s.playerX - 7);
      if (right) s.playerX = Math.min(W - PLAYER_R, s.playerX + 7);
    }, 16);
    const kd = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') left = true; if (e.key === 'ArrowRight') right = true; };
    const ku = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') left = false; if (e.key === 'ArrowRight') right = false; };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { clearInterval(interval); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  const nudgeLeft = useCallback(() => {
    const s = st.current;
    s.playerX = Math.max(PLAYER_R, s.playerX - 45);
  }, []);

  const nudgeRight = useCallback(() => {
    const s = st.current;
    s.playerX = Math.min(W - PLAYER_R, s.playerX + 45);
  }, []);

  return { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleCanvasClick, handleTouchStart, nudgeLeft, nudgeRight };
}
