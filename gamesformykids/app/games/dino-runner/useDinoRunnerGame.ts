'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export const W = 400;
export const H = 220;
const GROUND_Y = 160;
const DINO_X = 60;
const DINO_W = 40;
const DINO_H = 50;
const GRAVITY = 0.7;
const JUMP_V = -14;
const BASE_SPEED = 4;

import type { PhaseDead as Phase, Point as Cloud } from '@/lib/types';
interface Obstacle { x: number; w: number; h: number; emoji: string; }

const OBSTACLE_EMOJIS = ['🌵', '🪨', '🌴', '🌿', '🍄'];

export function useDinoRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    dinoY: GROUND_Y - DINO_H,
    dinoVY: 0,
    onGround: true,
    obstacles: [] as Obstacle[],
    clouds: [{ x: 100, y: 40 }, { x: 280, y: 25 }, { x: 360, y: 55 }] as Cloud[],
    score: 0,
    best: 0,
    frame: 0,
    speed: BASE_SPEED,
    raf: 0,
    nextObstacle: 80,
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; best: number }>({ phase: 'menu', score: 0, best: 0 });

  const jump = useCallback(() => {
    const s = st.current;
    if (s.phase === 'playing' && s.onGround) {
      s.dinoVY = JUMP_V;
      s.onGround = false;
    } else if (s.phase === 'menu') {
      s.phase = 'playing';
      s.dinoY = GROUND_Y - DINO_H;
      s.dinoVY = JUMP_V;
      s.onGround = false;
      s.obstacles = [];
      s.score = 0;
      s.frame = 0;
      s.speed = BASE_SPEED;
      s.nextObstacle = 80;
      setUi({ phase: 'playing', score: 0, best: s.best });
    } else if (s.phase === 'dead') {
      s.phase = 'menu';
      setUi(u => ({ ...u, phase: 'menu' }));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    function loop() {
      const s = st.current;

      if (s.phase === 'playing') {
        s.frame++;
        s.score = Math.floor(s.frame / 6);
        s.speed = BASE_SPEED + Math.floor(s.score / 200) * 0.5;

        s.dinoVY += GRAVITY;
        s.dinoY += s.dinoVY;
        if (s.dinoY >= GROUND_Y - DINO_H) {
          s.dinoY = GROUND_Y - DINO_H;
          s.dinoVY = 0;
          s.onGround = true;
        }

        s.nextObstacle--;
        if (s.nextObstacle <= 0) {
          const w = 28 + Math.random() * 20;
          const h = 35 + Math.random() * 25;
          s.obstacles.push({
            x: W + 20,
            w,
            h,
            emoji: OBSTACLE_EMOJIS[Math.floor(Math.random() * OBSTACLE_EMOJIS.length)],
          });
          s.nextObstacle = 60 + Math.random() * 80;
        }
        for (const o of s.obstacles) o.x -= s.speed;
        s.obstacles = s.obstacles.filter(o => o.x > -60);

        for (const c of s.clouds) {
          c.x -= s.speed * 0.3;
          if (c.x < -60) c.x = W + 60;
        }

        if (s.frame % 6 === 0) setUi(u => ({ ...u, score: s.score }));

        const margin = 8;
        for (const o of s.obstacles) {
          if (
            DINO_X + DINO_W - margin > o.x + margin &&
            DINO_X + margin < o.x + o.w - margin &&
            s.dinoY + DINO_H - margin > GROUND_Y - o.h + margin
          ) {
            s.phase = 'dead';
            if (s.score > s.best) s.best = s.score;
            setUi({ phase: 'dead', score: s.score, best: s.best });
          }
        }
      }

      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(200,230,255,0.6)';
      for (const c of st.current.clouds) {
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, 30, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(c.x + 18, c.y - 8, 20, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(c.x - 18, c.y - 4, 18, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#d97706';
      ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(0, GROUND_Y, W, 3);

      if (st.current.phase !== 'menu') {
        const s2 = st.current;
        ctx.font = `${DINO_W}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('🦖', DINO_X + DINO_W / 2, s2.dinoY + DINO_H + 2);

        ctx.textBaseline = 'bottom';
        for (const o of s2.obstacles) {
          ctx.font = `${o.h}px serif`;
          ctx.fillText(o.emoji, o.x + o.w / 2, GROUND_Y + 4);
        }
      }

      ctx.fillStyle = '#555';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText(`${st.current.score}`, W - 12, 10);

      st.current.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [jump]);

  const handleTap = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    jump();
  }, [jump]);

  return { canvasRef, ui, jump, handleTap };
}
