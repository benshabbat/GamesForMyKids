'use client';

import { useEffect, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStackStore } from './stackStore';
import { createCanvasArcadeHook } from '@/hooks/canvas';

export const W = 300;
export const H = 480;
const BH = 22;
const FLOOR_Y = H - 40;
const INIT_W = 170;
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
const TARGET_TOP = 90;

import type { PhaseDead as Phase } from '@/lib/types';
interface Block { x: number; y: number; w: number; color: string; }

const _useStack = createCanvasArcadeHook({
  gameType: 'stack',
  width: W,
  height: H,
  initialState: () => ({
    phase: 'menu' as Phase,
    blocks: [] as Block[],
    curX: 0, curW: INIT_W,
    curDir: 1 as 1 | -1,
    curSpeed: 2.5,
    camOffset: 0,
    score: 0, best: 0,
    colorIdx: 0,
    frame: 0,
    startTime: 0,
  }),
  draw: (ctx, s, _dt, _saveRef) => {    s.frame++;

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
      const sliderScreenY = top.y - BH + s.camOffset;
      const nextColor = COLORS[(s.colorIdx + 1) % COLORS.length];
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
  },
});

export function useStackGame() {
  const { st, canvasRef, saveGameResultRef } = _useStack();


  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.score = 0; s.frame = 0; s.camOffset = 0;
    s.curW = INIT_W; s.curX = (W - INIT_W) / 2;
    s.curDir = 1; s.curSpeed = 2.5; s.colorIdx = 0;
    s.blocks = [{ x: (W - INIT_W) / 2, y: FLOOR_Y, w: INIT_W, color: '#6b7280' }];
    s.startTime = Date.now();
    useStackStore.getState().startPlaying();
  }, [st]);

  const drop = useCallback(() => {
    const s = st.current;
    if (s.phase !== 'playing') return;

    const top = s.blocks[s.blocks.length - 1];
    const sliderWorldY = top.y - BH;
    const left = Math.max(s.curX, top.x);
    const right = Math.min(s.curX + s.curW, top.x + top.w);
    const overlap = right - left;

    if (overlap <= 2) {
      s.phase = 'dead';
      const elapsed = Math.round((Date.now() - s.startTime) / 1000);
      saveGameResultRef.current({ score: s.score, level: 1, durationSeconds: elapsed });
      useStackStore.getState().endGame(s.score);
      return;
    }

    s.colorIdx = (s.colorIdx + 1) % COLORS.length;
    s.blocks.push({ x: left, y: sliderWorldY, w: overlap, color: COLORS[s.colorIdx] });
    s.score++;
    s.curW = overlap;
    s.curDir = (Math.random() < 0.5 ? 1 : -1) as 1 | -1;
    s.curX = s.curDir > 0 ? -s.curW - 10 : W + 10;
    s.curSpeed = Math.min(7, 2.5 + s.score * 0.09);

    const topWorldY = sliderWorldY;
    s.camOffset = Math.max(0, TARGET_TOP - topWorldY);
    useStackStore.getState().setScore(s.score);
  }, [st, saveGameResultRef]);

  const handleCanvasClick = useCallback(() => {
    if (st.current.phase === 'playing') drop();
    else if (st.current.phase === 'menu') startGame();
  }, [st, drop, startGame]);


  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); drop(); }
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [drop]);

  const { phase, best, score } = useStackStore(useShallow(s => ({ phase: s.phase, best: s.best, score: s.score })));

  return { canvasRef, startGame, drop, handleCanvasClick, phase, best, score };
}
