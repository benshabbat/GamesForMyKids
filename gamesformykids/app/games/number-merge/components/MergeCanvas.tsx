'use client';
import { useRef, useEffect, useCallback } from 'react';
import { useNumberMergeStore, Ball, RADIUS_FOR_VALUE } from '../numberMergeStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const CANVAS_W = 320;
const CANVAS_H = 480;
const FLOOR_Y = CANVAS_H - 20;
const WALL_LEFT = 10;
const WALL_RIGHT = CANVAS_W - 10;
const GRAVITY = 0.4;
const DAMPING = 0.55;
const FRICTION = 0.85;

const NUMBER_COLORS: Record<number, string> = {
  1:  '#FF6B6B',
  2:  '#FF8E53',
  3:  '#FFCA28',
  4:  '#66BB6A',
  5:  '#26C6DA',
  6:  '#42A5F5',
  7:  '#7E57C2',
  8:  '#EC407A',
  9:  '#8D6E63',
  10: '#455A64',
};

const HEBREW_NUMBERS: Record<number, string> = {
  1:'אחד',2:'שניים',3:'שלוש',4:'ארבע',5:'חמש',
  6:'שש',7:'שבע',8:'שמונה',9:'תשע',10:'עשר',
};

function circlePair(a: Ball, b: Ball) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = a.radius + b.radius;
  return { dx, dy, dist, minDist, overlap: minDist - dist };
}

function resolveCollision(balls: Ball[]): { balls: Ball[]; merges: { x: number; y: number; value: number }[] } {
  const merges: { x: number; y: number; value: number }[] = [];
  const toRemove = new Set<number>();

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i];
      const b = balls[j];
      if (!a || !b || toRemove.has(a.id) || toRemove.has(b.id)) continue;
      if (a.value !== b.value) continue;

      const { dist, minDist, dx, dy } = circlePair(a, b);
      if (dist >= minDist) continue;

      // Same value touching → merge
      toRemove.add(a.id);
      toRemove.add(b.id);
      const newVal = Math.min(a.value + b.value, 10);
      const nx = (a.x + b.x) / 2;
      const ny = (a.y + b.y) / 2;
      const merged: Ball = {
        id: Date.now() + Math.random(),
        x: nx,
        y: ny,
        vx: (a.vx + b.vx) * 0.5,
        vy: (a.vy + b.vy) * 0.5,
        value: newVal,
        radius: RADIUS_FOR_VALUE(newVal),
        merging: false,
        merged: false,
      };
      balls.push(merged);
      merges.push({ x: nx, y: ny, value: newVal });
      // skip inner j loop since a is gone
      break;
    }
  }

  return {
    balls: balls.filter(b => !toRemove.has(b.id)),
    merges,
  };
}

function stepPhysics(balls: Ball[]): { balls: Ball[]; merges: { x: number; y: number; value: number }[] } {
  // Apply gravity + velocity
  for (const b of balls) {
    b.vy += GRAVITY;
    b.x += b.vx;
    b.y += b.vy;

    // Floor
    if (b.y + b.radius >= FLOOR_Y) {
      b.y = FLOOR_Y - b.radius;
      b.vy *= -DAMPING;
      b.vx *= FRICTION;
    }
    // Walls
    if (b.x - b.radius <= WALL_LEFT) {
      b.x = WALL_LEFT + b.radius;
      b.vx *= -DAMPING;
    }
    if (b.x + b.radius >= WALL_RIGHT) {
      b.x = WALL_RIGHT - b.radius;
      b.vx *= -DAMPING;
    }
  }

  // Ball-ball separation (push apart first, then merge)
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i];
      const b = balls[j];
      if (!a || !b) continue;
      const { dist, minDist, dx, dy, overlap } = circlePair(a, b);
      if (overlap <= 0 || dist === 0) continue;
      if (a.value === b.value) continue; // will be merged separately

      const nx = dx / dist;
      const ny = dy / dist;
      const push = overlap / 2;
      a.x -= nx * push;
      a.y -= ny * push;
      b.x += nx * push;
      b.y += ny * push;

      // Elastic-ish bounce
      const dvx = b.vx - a.vx;
      const dvy = b.vy - a.vy;
      const dot = dvx * nx + dvy * ny;
      if (dot < 0) {
        const impulse = dot * 0.5;
        a.vx += impulse * nx;
        a.vy += impulse * ny;
        b.vx -= impulse * nx;
        b.vy -= impulse * ny;
      }
    }
  }

  return resolveCollision(balls);
}

function drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
  const color = NUMBER_COLORS[ball.value] ?? '#999';
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.max(10, ball.radius * 0.85)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(ball.value), ball.x, ball.y);
}

function drawWalls(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#d1a96a';
  ctx.fillRect(0, FLOOR_Y, CANVAS_W, CANVAS_H - FLOOR_Y);
  ctx.fillRect(0, 0, WALL_LEFT, CANVAS_H);
  ctx.fillRect(WALL_RIGHT, 0, CANVAS_W - WALL_RIGHT, CANVAS_H);
}

export default function MergeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animRef = useRef<number>(0);
  const dropCooldownRef = useRef(false);

  const { balls, dropX, nextValue, phase, addScore, setBalls, triggerMergeFlash, endGame } = useNumberMergeStore();

  // Sync store balls → ref on external changes (drop)
  useEffect(() => {
    ballsRef.current = balls.map(b => ({ ...b }));
  }, [balls]);

  const announceEquation = useCallback((a: number, b: number, result: number) => {
    const heA = HEBREW_NUMBERS[a] ?? String(a);
    const heB = HEBREW_NUMBERS[b] ?? String(b);
    const heR = HEBREW_NUMBERS[result] ?? String(result);
    speakHebrew(`${heA} ועוד ${heB} שווה ${heR}!`);
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;

    function loop() {
      if (!ctx) return;
      // Physics step
      const { balls: newBalls, merges } = stepPhysics(ballsRef.current);
      ballsRef.current = newBalls;
      frameCount++;

      // Handle merges
      for (const m of merges) {
        const half = Math.floor(m.value / 2);
        const score = m.value * 10;
        addScore(score);
        announceEquation(half, half, m.value);
        triggerMergeFlash(m.x, m.y, m.value);
      }

      // Check overflow (ball reaches top)
      const overflow = newBalls.some(b => b.y - b.radius <= 10 && Math.abs(b.vy) < 0.5);
      if (overflow) {
        endGame();
        return;
      }

      // Sync store periodically (every 10 frames) to avoid re-render storm
      if (frameCount % 10 === 0) {
        setBalls(newBalls.map(b => ({ ...b })));
      }

      // Draw
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      // Background
      ctx.fillStyle = '#FFF8E1';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      drawWalls(ctx);

      // Drop indicator line
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dropX, 0);
      ctx.lineTo(dropX, FLOOR_Y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Preview ball at top
      const previewR = RADIUS_FOR_VALUE(nextValue);
      const previewColor = NUMBER_COLORS[nextValue] ?? '#999';
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(dropX, previewR + 2, previewR, 0, Math.PI * 2);
      ctx.fillStyle = previewColor;
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.max(10, previewR * 0.85)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(nextValue), dropX, previewR + 2);
      ctx.globalAlpha = 1;

      for (const b of newBalls) drawBall(ctx, b);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, dropX, nextValue, addScore, setBalls, triggerMergeFlash, endGame, announceEquation]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = CANVAS_W / rect.width;
    const rawX = (e.clientX - rect.left) * scaleX;
    const clampedX = Math.max(WALL_LEFT + 20, Math.min(WALL_RIGHT - 20, rawX));
    useNumberMergeStore.getState().setDropX(clampedX);
  }, []);

  const handleDrop = useCallback(() => {
    if (dropCooldownRef.current) return;
    dropCooldownRef.current = true;
    useNumberMergeStore.getState().dropBall();
    setTimeout(() => { dropCooldownRef.current = false; }, 600);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="w-full max-w-xs rounded-2xl shadow-2xl cursor-crosshair touch-none"
      style={{ imageRendering: 'pixelated' }}
      onPointerMove={handlePointerMove}
      onClick={handleDrop}
      onPointerDown={handleDrop}
    />
  );
}
