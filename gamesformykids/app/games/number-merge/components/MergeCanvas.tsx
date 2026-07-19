'use client';
import { useRef, useEffect, useCallback } from 'react';
import { useNumberMergeStore, type Ball } from '../numberMergeStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { CANVAS_W, CANVAS_H, WALL_LEFT, WALL_RIGHT, HEBREW_NUMBERS } from '../numberMergeCanvasConfig';
import { stepPhysics } from '../numberMergePhysics';
import { renderFrame } from '../numberMergeRenderer';

export default function MergeCanvas() {
  const ballsRef = useRef<Ball[]>([]);
  const frameCountRef = useRef(0);
  const dropCooldownRef = useRef(false);

  const { balls, dropX, nextValue, addScore, setBalls, triggerMergeFlash, endGame } = useNumberMergeStore();

  // Sync store balls → ref on external changes (drop)
  useEffect(() => {
    ballsRef.current = balls.map(b => ({ ...b }));
  }, [balls]);

  const announceEquation = useCallback((a: number, b: number, result: number) => {
    const heA = HEBREW_NUMBERS[a] ?? String(a);
    const heB = HEBREW_NUMBERS[b] ?? String(b);
    const heR = HEBREW_NUMBERS[result] ?? String(result);
    speakHebrew(`${heA} וְעוֹד ${heB} שָׁוֶה ${heR}!`);
  }, []);

  const tick = useCallback((ctx: CanvasRenderingContext2D) => {
    // Physics step
    const { balls: newBalls, merges } = stepPhysics(ballsRef.current);
    ballsRef.current = newBalls;
    frameCountRef.current++;

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
    if (frameCountRef.current % 10 === 0) {
      setBalls(newBalls.map(b => ({ ...b })));
    }

    renderFrame(ctx, { balls: newBalls, dropX, nextValue });
  }, [dropX, nextValue, addScore, setBalls, triggerMergeFlash, endGame, announceEquation]);

  const canvasRef = useCanvasLoop(tick);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = CANVAS_W / rect.width;
    const rawX = (e.clientX - rect.left) * scaleX;
    const clampedX = Math.max(WALL_LEFT + 20, Math.min(WALL_RIGHT - 20, rawX));
    useNumberMergeStore.getState().setDropX(clampedX);
  }, [canvasRef]);

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
