'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export const W = 300;
export const H = 500;
const GRAVITY = 0.32;
const JUMP_VY = -10.5;
const PLAT_W = 70;
const PLAT_H = 12;
const PLAYER_R = 15;
const PLAT_GAP = 95;
const INIT_PLATS = 14;

type Phase = 'menu' | 'playing' | 'dead';
interface Platform { x: number; y: number; w: number; }

let platId = 0;
function makePlatform(y: number): Platform & { id: number } {
  return { id: platId++, x: Math.random() * (W - PLAT_W), y, w: PLAT_W };
}
function generateInitial(): Array<Platform & { id: number }> {
  const plats: Array<Platform & { id: number }> = [];
  plats.push({ id: platId++, x: W / 2 - 55, y: H - 60, w: 110 });
  for (let i = 1; i < INIT_PLATS; i++) {
    plats.push(makePlatform(H - 60 - i * (PLAT_GAP * 0.75)));
  }
  return plats;
}

export function useJumperGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    px: W / 2, py: H - 100,
    pvx: 0, pvy: 0,
    camY: 0,
    maxCamY: 0,
    platforms: generateInitial() as Array<Platform & { id: number }>,
    score: 0, best: 0,
    frame: 0, raf: 0,
    leftDown: false, rightDown: false,
    nextPlatY: H - 60 - INIT_PLATS * (PLAT_GAP * 0.75),
  });
  const [ui, setUi] = useState({ phase: 'menu' as Phase, score: 0, best: 0 });

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.px = W / 2; s.py = H - 100;
    s.pvx = 0; s.pvy = JUMP_VY;
    s.camY = 0; s.maxCamY = 0;
    s.score = 0; s.frame = 0;
    s.platforms = generateInitial();
    s.nextPlatY = H - 60 - INIT_PLATS * (PLAT_GAP * 0.75);
    setUi({ phase: 'playing', score: 0, best: s.best });
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (st.current.phase === 'menu') startGame();
  }, [startGame]);

  const pressLeft = useCallback(() => { st.current.leftDown = true; }, []);
  const releaseLeft = useCallback(() => { st.current.leftDown = false; }, []);
  const pressRight = useCallback(() => { st.current.rightDown = true; }, []);
  const releaseRight = useCallback(() => { st.current.rightDown = false; }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function loop() {
      const s = st.current;
      s.frame++;

      if (s.phase === 'playing') {
        const HSPEED = 4.5;
        if (s.leftDown)  s.pvx = Math.max(s.pvx - 0.8, -HSPEED);
        if (s.rightDown) s.pvx = Math.min(s.pvx + 0.8, HSPEED);
        if (!s.leftDown && !s.rightDown) s.pvx *= 0.85;

        s.pvy += GRAVITY;
        s.py += s.pvy;
        s.px += s.pvx;

        if (s.px < -PLAYER_R)    s.px = W + PLAYER_R;
        if (s.px > W + PLAYER_R) s.px = -PLAYER_R;

        if (s.pvy > 0) {
          for (const p of s.platforms) {
            const screenY = p.y - s.camY;
            if (
              s.py + PLAYER_R >= screenY &&
              s.py + PLAYER_R <= screenY + PLAT_H + Math.abs(s.pvy) + 2 &&
              s.px + PLAYER_R * 0.7 > p.x &&
              s.px - PLAYER_R * 0.7 < p.x + p.w
            ) {
              s.pvy = JUMP_VY;
              s.py = screenY - PLAYER_R;
            }
          }
        }

        const playerScreenY = s.py;
        if (playerScreenY < H * 0.45) {
          const shift = H * 0.45 - playerScreenY;
          s.camY += shift;
          s.py += shift;
        }

        s.score = Math.floor(s.camY / 10);
        if (s.camY > s.maxCamY) {
          s.maxCamY = s.camY;
          if (s.frame % 10 === 0) setUi(u => ({ ...u, score: s.score }));
        }

        while (s.nextPlatY > -(s.camY) - H) {
          s.platforms.push(makePlatform(s.nextPlatY - s.camY + (H * 2)));
          s.nextPlatY -= PLAT_GAP * (0.6 + Math.random() * 0.5);
        }
        s.platforms = s.platforms.filter(p => p.y - s.camY < H + 50);

        if (s.py > H + 60) {
          s.phase = 'dead';
          if (s.score > s.best) s.best = s.score;
          setUi({ phase: 'dead', score: s.score, best: s.best });
        }
      }

      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#0c1445');
      sky.addColorStop(1, '#1a237e');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 97 + st.current.camY * 0.05) % W + W) % W;
        const sy = ((i * 137) % H);
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      const s2 = st.current;
      for (const p of s2.platforms) {
        const drawY = p.y - s2.camY;
        if (drawY > H + 10 || drawY < -PLAT_H - 5) continue;
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(p.x, drawY, p.w, PLAT_H);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(p.x, drawY, p.w, 4);
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(p.x, drawY + PLAT_H - 3, p.w, 3);
      }

      if (s2.phase === 'playing') {
        ctx.font = `${PLAYER_R * 2.2}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🦘', s2.px, s2.py);
      }

      ctx.font = 'bold 22px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.textAlign = 'left';
      ctx.fillText(`${s2.score}m`, 10, 30);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft'  || e.key === 'a') st.current.leftDown  = true;
      if (e.key === 'ArrowRight' || e.key === 'd') st.current.rightDown = true;
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft'  || e.key === 'a') st.current.leftDown  = false;
      if (e.key === 'ArrowRight' || e.key === 'd') st.current.rightDown = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const tx = (e.touches[0].clientX - rect.left) * (W / rect.width);
    const s = st.current;
    if (s.phase !== 'playing') return;
    if (tx < W / 2) { s.leftDown = true; s.rightDown = false; }
    else             { s.rightDown = true; s.leftDown = false; }
  }, []);

  const handleTouchEnd = useCallback(() => {
    st.current.leftDown = false;
    st.current.rightDown = false;
  }, []);

  return { canvasRef, ui, startGame, handleTouchMove, handleTouchEnd, handleCanvasClick, pressLeft, releaseLeft, pressRight, releaseRight };
}
