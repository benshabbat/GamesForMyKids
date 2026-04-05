'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export const W = 360;
export const H = 560;
const BIRD_X = 80;
const BIRD_R = 18;
const GRAVITY = 0.45;
const FLAP_STRENGTH = -9;
const PIPE_W = 54;
const PIPE_GAP = 145;
const PIPE_SPEED = 2.5;
const PIPE_INTERVAL = 95;
const GROUND_H = 55;

type Phase = 'menu' | 'playing' | 'dead';

interface Pipe { x: number; gapY: number; scored: boolean; }

export function useFlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const s = useRef({
    phase: 'menu' as Phase,
    birdY: H / 2,
    birdVY: 0,
    pipes: [] as Pipe[],
    score: 0,
    frame: 0,
    raf: 0,
    bgOffset: 0,
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; best: number }>({ phase: 'menu', score: 0, best: 0 });
  const bestRef = useRef(0);

  const resetGame = useCallback(() => {
    const st = s.current;
    st.phase = 'playing';
    st.birdY = H / 2;
    st.birdVY = FLAP_STRENGTH;
    st.pipes = [];
    st.score = 0;
    st.frame = 0;
    setUi({ phase: 'playing', score: 0, best: bestRef.current });
  }, []);

  const flap = useCallback(() => {
    const st = s.current;
    if (st.phase === 'playing') {
      st.birdVY = FLAP_STRENGTH;
    } else if (st.phase === 'menu') {
      resetGame();
    } else if (st.phase === 'dead') {
      st.phase = 'menu';
      setUi(u => ({ ...u, phase: 'menu' }));
    }
  }, [resetGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function drawRoundRect(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function drawFrame() {
      const st = s.current;
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H - GROUND_H);
      skyGrad.addColorStop(0, '#87CEEB');
      skyGrad.addColorStop(1, '#C9E8F5');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      st.bgOffset = (st.bgOffset + 0.3) % W;
      function cloud(x: number, y: number) {
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath(); ctx.ellipse(x, y, 38, 22, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(x + 28, y - 8, 26, 18, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(x - 25, y - 5, 20, 14, 0, 0, Math.PI * 2); ctx.fill();
      }
      const offs = st.bgOffset;
      cloud(((60 + offs) % (W + 100)) - 50, 60);
      cloud(((200 + offs) % (W + 100)) - 50, 95);
      cloud(((320 + offs) % (W + 100)) - 50, 45);

      for (const p of st.pipes) {
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(p.x, 0, PIPE_W, p.gapY - 20);
        ctx.fillStyle = '#388E3C';
        drawRoundRect(p.x - 5, p.gapY - 22, PIPE_W + 10, 22, 6);
        ctx.fill();
        ctx.fillStyle = '#4CAF50';
        const botTop = p.gapY + PIPE_GAP;
        ctx.fillRect(p.x, botTop + 22, PIPE_W, H - GROUND_H - botTop - 22);
        ctx.fillStyle = '#388E3C';
        drawRoundRect(p.x - 5, botTop, PIPE_W + 10, 22, 6);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(p.x + 6, 0, 8, p.gapY - 22);
        ctx.fillRect(p.x + 6, botTop + 22, 8, H - GROUND_H - botTop - 22);
      }

      const groundGrad = ctx.createLinearGradient(0, H - GROUND_H, 0, H);
      groundGrad.addColorStop(0, '#5D8C3A');
      groundGrad.addColorStop(0.15, '#8B6914');
      groundGrad.addColorStop(1, '#6B4F10');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, H - GROUND_H, W, GROUND_H);

      const birdAngle = Math.max(-0.5, Math.min(1.2, st.birdVY * 0.06));
      ctx.save();
      ctx.translate(BIRD_X, st.birdY);
      ctx.rotate(birdAngle);
      ctx.beginPath();
      ctx.ellipse(0, 0, BIRD_R + 2, BIRD_R, 0, 0, Math.PI * 2);
      ctx.fillStyle = st.phase === 'dead' ? '#FF6B6B' : '#FFD700';
      ctx.fill();
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-4, 4, 12, 7, 0.3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFA500';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(6, -5, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(8, -5, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(16, -2);
      ctx.lineTo(26, 1);
      ctx.lineTo(16, 5);
      ctx.fillStyle = '#FF6600';
      ctx.fill();
      ctx.restore();

      ctx.textAlign = 'center';
      ctx.font = 'bold 38px Arial';
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 4;
      ctx.strokeText(String(st.score), W / 2, 52);
      ctx.fillStyle = 'white';
      ctx.fillText(String(st.score), W / 2, 52);
    }

    function loop() {
      const st = s.current;
      if (st.phase === 'playing') {
        st.frame++;
        st.birdVY += GRAVITY;
        st.birdY += st.birdVY;

        if (st.frame % PIPE_INTERVAL === 0) {
          const gapY = 80 + Math.random() * (H - GROUND_H - 80 - PIPE_GAP - 80);
          st.pipes.push({ x: W + 10, gapY, scored: false });
        }

        for (const p of st.pipes) {
          p.x -= PIPE_SPEED;
          if (!p.scored && p.x + PIPE_W < BIRD_X - BIRD_R) {
            p.scored = true;
            st.score++;
            setUi(u => ({ ...u, score: st.score }));
          }
        }
        st.pipes = st.pipes.filter(p => p.x > -PIPE_W - 20);

        if (st.birdY + BIRD_R >= H - GROUND_H || st.birdY - BIRD_R <= 0) {
          st.phase = 'dead';
          if (st.score > bestRef.current) bestRef.current = st.score;
          setUi({ phase: 'dead', score: st.score, best: bestRef.current });
        }

        for (const p of st.pipes) {
          const bL = BIRD_X - BIRD_R + 4;
          const bR = BIRD_X + BIRD_R - 4;
          const bT = st.birdY - BIRD_R + 4;
          const bB = st.birdY + BIRD_R - 4;
          if (bR > p.x && bL < p.x + PIPE_W) {
            if (bT < p.gapY || bB > p.gapY + PIPE_GAP) {
              st.phase = 'dead';
              if (st.score > bestRef.current) bestRef.current = st.score;
              setUi({ phase: 'dead', score: st.score, best: bestRef.current });
            }
          }
        }
      }

      drawFrame();
      st.raf = requestAnimationFrame(loop);
    }

    s.current.raf = requestAnimationFrame(loop);
    const sRef = s.current;
    return () => cancelAnimationFrame(sRef.raf);
  }, []);

  const handleInput = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    flap();
  }, [flap]);

  return { canvasRef, ui, flap, handleInput };
}
