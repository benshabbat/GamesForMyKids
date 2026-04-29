'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export const W = 300;
export const H = 480;
const BH = 22;
const FLOOR_Y = H - 40;
const INIT_W = 170;
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
const TARGET_TOP = 90;

import type { PhaseDead as Phase } from '@/lib/types';
interface Block { x: number; y: number; w: number; color: string; }

function makeBricks() { return [] as Block[]; } // placeholder, actual init in startGame

export function useStackGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    blocks: [] as Block[],
    curX: 0, curW: INIT_W,
    curDir: 1 as 1 | -1,
    curSpeed: 2.5,
    camOffset: 0,
    score: 0, best: 0,
    colorIdx: 0,
    frame: 0, raf: 0,
  });
  const [ui, setUi] = useState({ phase: 'menu' as Phase, score: 0, best: 0 });

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.score = 0; s.frame = 0; s.camOffset = 0;
    s.curW = INIT_W; s.curX = (W - INIT_W) / 2;
    s.curDir = 1; s.curSpeed = 2.5; s.colorIdx = 0;
    s.blocks = [{ x: (W - INIT_W) / 2, y: FLOOR_Y, w: INIT_W, color: '#6b7280' }];
    setUi({ phase: 'playing', score: 0, best: s.best });
  }, []);

  const drop = useCallback(() => {
    const s = st.current;
    if (s.phase !== 'playing') return;

    const top = s.blocks[s.blocks.length - 1];
    if (!top) return;
    const sliderWorldY = top.y - BH;
    const left = Math.max(s.curX, top.x);
    const right = Math.min(s.curX + s.curW, top.x + top.w);
    const overlap = right - left;

    if (overlap <= 2) {
      s.phase = 'dead';
      if (s.score > s.best) s.best = s.score;
      setUi({ phase: 'dead', score: s.score, best: s.best });
      return;
    }

    s.colorIdx = (s.colorIdx + 1) % COLORS.length;
    s.blocks.push({ x: left, y: sliderWorldY, w: overlap, color: COLORS[s.colorIdx] ?? COLORS[0] ?? '#ef4444' });
    s.score++;
    s.curW = overlap;
    s.curDir = (Math.random() < 0.5 ? 1 : -1) as 1 | -1;
    s.curX = s.curDir > 0 ? -s.curW - 10 : W + 10;
    s.curSpeed = Math.min(7, 2.5 + s.score * 0.09);

    const topWorldY = sliderWorldY;
    s.camOffset = Math.max(0, TARGET_TOP - topWorldY);
    setUi(u => ({ ...u, score: s.score }));
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (st.current.phase === 'playing') drop();
    else if (st.current.phase === 'menu') startGame();
  }, [drop, startGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    function loop() {
      const s = st.current;
      s.frame++;

      if (s.phase === 'playing') {
        s.curX += s.curDir * s.curSpeed;
        const top = s.blocks[s.blocks.length - 1];
        if (s.curDir > 0 && s.curX > W + 20) s.curDir = -1;
        if (s.curDir < 0 && s.curX + s.curW < -20) s.curDir = 1;
        if (s.curX < -W * 0.4) { s.curDir = 1; s.curX = -W * 0.4; }
        if (s.curX + s.curW > W + W * 0.4) { s.curDir = -1; s.curX = W + W * 0.4 - s.curW; }
        void top;
      }

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      for (const block of s.blocks) {
        const drawY = block.y + s.camOffset;
        if (drawY > H + BH || drawY < -BH) continue;
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, drawY, block.w, BH - 2);
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fillRect(block.x, drawY, block.w, 5);
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(block.x, drawY + BH - 5, block.w, 3);
      }

      if (s.phase === 'playing' && s.blocks.length > 0) {
        const top = s.blocks[s.blocks.length - 1];
        if (!top) return;
        const sliderScreenY = top.y - BH + s.camOffset;
        const nextColor = COLORS[(s.colorIdx + 1) % COLORS.length] ?? COLORS[0] ?? '#ef4444';
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(top.x, sliderScreenY, top.w, BH - 2);
        ctx.fillStyle = nextColor;
        ctx.fillRect(s.curX, sliderScreenY, s.curW, BH - 2);
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillRect(s.curX, sliderScreenY, s.curW, 5);
      }

      ctx.font = 'bold 36px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.textAlign = 'center';
      ctx.fillText(`${s.score}`, W / 2, 55);
      ctx.font = '13px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText('TAP to drop!', W / 2, 74);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); drop(); }
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [drop]);

  // suppress unused warning from module-level helper
  void makeBricks;

  return { canvasRef, ui, startGame, drop, handleCanvasClick };
}
