'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const W = 360;
const H = 560;
const PAD_W = 80;
const PAD_H = 12;
const PAD_Y = H - 50;
const BALL_R = 8;
const ROWS = 6;
const COLS = 8;
const BRICK_W = Math.floor((W - 20) / COLS);
const BRICK_H = 20;
const BRICK_PAD = 3;
const BRICK_TOP = 50;

const ROW_COLORS = [
  ['#EF4444', '#DC2626'],
  ['#F97316', '#EA580C'],
  ['#EAB308', '#CA8A04'],
  ['#22C55E', '#16A34A'],
  ['#3B82F6', '#2563EB'],
  ['#8B5CF6', '#7C3AED'],
];

type Phase = 'menu' | 'playing' | 'won' | 'dead';
interface Brick { alive: boolean; row: number; }

function makeBricks(): Brick[] {
  return Array.from({ length: ROWS * COLS }, (_, i) => ({ alive: true, row: Math.floor(i / COLS) }));
}

export function useBrickBreakerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    padX: W / 2 - PAD_W / 2,
    ballX: W / 2, ballY: PAD_Y - BALL_R - 2, ballVX: 3, ballVY: -4, launched: false,
    bricks: makeBricks(), score: 0, best: 0, lives: 3, level: 1, raf: 0, frame: 0,
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; best: number; lives: number; level: number }>(
    { phase: 'menu', score: 0, best: 0, lives: 3, level: 1 }
  );

  const startGame = useCallback((level = 1) => {
    const s = st.current;
    s.phase = 'playing';
    s.padX = W / 2 - PAD_W / 2; s.ballX = W / 2; s.ballY = PAD_Y - BALL_R - 2;
    const spd = 3.5 + (level - 1) * 0.5;
    s.ballVX = spd; s.ballVY = -(spd + 0.5); s.launched = false;
    s.bricks = makeBricks();
    s.score = level === 1 ? 0 : s.score;
    s.lives = level === 1 ? 3 : s.lives;
    s.level = level; s.particles = [];
    setUi({ phase: 'playing', score: s.score, best: s.best, lives: s.lives, level });
  }, []);

  const handleClick = useCallback(() => {
    const s = st.current;
    if (s.phase === 'playing' && !s.launched) { s.launched = true; }
    else if (s.phase === 'menu') { startGame(1); }
  }, [startGame]);

  const movePaddle = useCallback((clientX: number, rect: DOMRect) => {
    const scaleX = W / rect.width;
    const mx = (clientX - rect.left) * scaleX;
    st.current.padX = Math.max(0, Math.min(W - PAD_W, mx - PAD_W / 2));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    movePaddle(e.clientX, e.currentTarget.getBoundingClientRect());
  }, [movePaddle]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    movePaddle(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
  }, [movePaddle]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleClick();
    movePaddle(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
  }, [handleClick, movePaddle]);

  const nudgeLeft = useCallback(() => { st.current.padX = Math.max(0, st.current.padX - 40); }, []);
  const nudgeRight = useCallback(() => { st.current.padX = Math.min(W - PAD_W, st.current.padX + 40); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function brickRect(i: number) {
      const col = i % COLS, row = Math.floor(i / COLS);
      const x = 10 + col * BRICK_W, y = BRICK_TOP + row * (BRICK_H + BRICK_PAD);
      return { x, y, w: BRICK_W - BRICK_PAD, h: BRICK_H };
    }

    function loop() {
      const s = st.current;
      s.frame++;

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
            if (s.lives <= 0) { s.lives = 0; s.phase = 'dead'; if (s.score > s.best) s.best = s.score; setUi({ phase: 'dead', score: s.score, best: s.best, lives: 0, level: s.level }); }
            else { setUi(u => ({ ...u, lives: s.lives })); }
          }
          for (let i = 0; i < s.bricks.length; i++) {
            if (!s.bricks[i].alive) continue;
            const { x, y, w, h } = brickRect(i);
            if (s.ballX + BALL_R > x && s.ballX - BALL_R < x + w && s.ballY + BALL_R > y && s.ballY - BALL_R < y + h) {
              s.bricks[i].alive = false; s.score += 10;
              const overlapLeft = s.ballX + BALL_R - x, overlapRight = x + w - (s.ballX - BALL_R);
              const overlapTop = s.ballY + BALL_R - y, overlapBottom = y + h - (s.ballY - BALL_R);
              if (Math.min(overlapLeft, overlapRight) < Math.min(overlapTop, overlapBottom)) s.ballVX *= -1; else s.ballVY *= -1;
              const colors = ROW_COLORS[s.bricks[i].row];
              for (let p = 0; p < 6; p++) s.particles.push({ x: x + w / 2, y: y + h / 2, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, life: 1, color: colors[Math.floor(Math.random() * colors.length)] });
              setUi(u => ({ ...u, score: s.score }));
            }
          }
          if (s.bricks.every(b => !b.alive)) {
            const nextLevel = s.level + 1;
            if (nextLevel > 5) { s.phase = 'won'; if (s.score > s.best) s.best = s.score; setUi({ phase: 'won', score: s.score, best: s.best, lives: s.lives, level: s.level }); }
            else { startGame(nextLevel); }
          }
        }
        s.particles = s.particles.filter(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.04; return p.life > 0; });
      }

      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0f0c29'); bg.addColorStop(1, '#302b63');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < s.bricks.length; i++) {
        if (!s.bricks[i].alive) continue;
        const { x, y, w, h } = brickRect(i);
        const [c1, c2] = ROW_COLORS[s.bricks[i].row];
        const g = ctx.createLinearGradient(x, y, x, y + h);
        g.addColorStop(0, c1); g.addColorStop(1, c2);
        ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x, y, w, h, 4); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.roundRect(x + 2, y + 2, w - 4, 5, 3); ctx.fill();
      }

      for (const p of s.particles) { ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;

      const ballGlow = ctx.createRadialGradient(s.ballX, s.ballY, 0, s.ballX, s.ballY, BALL_R * 2.5);
      ballGlow.addColorStop(0, 'rgba(255,255,255,0.4)'); ballGlow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = ballGlow; ctx.beginPath(); ctx.arc(s.ballX, s.ballY, BALL_R * 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2); ctx.fill();

      const padGrad = ctx.createLinearGradient(s.padX, PAD_Y, s.padX + PAD_W, PAD_Y);
      padGrad.addColorStop(0, '#60A5FA'); padGrad.addColorStop(0.5, '#93C5FD'); padGrad.addColorStop(1, '#60A5FA');
      ctx.fillStyle = padGrad; ctx.beginPath(); ctx.roundRect(s.padX, PAD_Y, PAD_W, PAD_H, 6); ctx.fill();

      if (s.phase === 'playing' && !s.launched) { ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '14px Arial'; ctx.textAlign = 'center'; ctx.fillText('הקש להשיק! 🏏', W / 2, PAD_Y - 20); }

      s.raf = requestAnimationFrame(loop);
    }

    const rafId = requestAnimationFrame(loop);
    st.current.raf = rafId;
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, [startGame]);

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
  }, [handleClick]);

  return { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleClick, nudgeLeft, nudgeRight };
}
