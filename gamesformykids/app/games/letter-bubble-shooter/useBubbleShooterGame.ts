'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { COLS, GRID_ROWS, R, DIA, SPEED, MIN_MATCH, LETTERS, COLORS } from './bubbleShooterConstants';
import type { Phase, FlyBubble, PopAnim } from './bubbleShooterConstants';
import { bx, by, mkGrid, flood, snapToGrid, isGridClear, gridTooLow } from './bubbleShooterGrid';
import { drawBubble } from './bubbleShooterRenderer';

export function useBubbleShooterGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  const gridRef = useRef<(string|null)[][]>(mkGrid());
  const flyRef = useRef<FlyBubble | null>(null);
  const currentRef = useRef<string>(LETTERS[Math.floor(Math.random() * LETTERS.length)]!);
  const nextRef = useRef<string>(LETTERS[Math.floor(Math.random() * LETTERS.length)]!);
  const aimRef = useRef<number>(-Math.PI / 2);
  const popsRef = useRef<PopAnim[]>([]);
  const scoreRef = useRef(0);
  const phaseRef = useRef<Phase>('menu');
  const W_ref = useRef(400);
  const H_ref = useRef(600);
  const SHOOTER_Y = useRef(0);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const startGame = useCallback(() => {
    gridRef.current = mkGrid();
    flyRef.current = null;
    currentRef.current = LETTERS[Math.floor(Math.random() * LETTERS.length)]!;
    nextRef.current = LETTERS[Math.floor(Math.random() * LETTERS.length)]!;
    aimRef.current = -Math.PI / 2;
    popsRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    setWon(false);
    setPhase('playing');
    phaseRef.current = 'playing';
  }, []);

  const placeBubble = useCallback((fly: FlyBubble, W: number) => {
    const grid = gridRef.current;
    const snapped = snapToGrid(fly.x, fly.y, W, grid);
    if (!snapped) return;
    const { row, col } = snapped;
    if (row >= GRID_ROWS || col >= COLS) return;
    if (!grid[row]) return;
    grid[row][col] = fly.letter;
    const matched = flood(grid, row, col, fly.letter);
    if (matched.length >= MIN_MATCH) {
      for (const [r, c] of matched) {
        popsRef.current.push({ x: bx(c, r, W), y: by(r), t: 0, letter: fly.letter });
        if (grid[r]) grid[r][c] = null;
      }
      const pts = matched.length * 10;
      scoreRef.current += pts;
      setScore(scoreRef.current);
      speakHebrew(fly.letter + '!');
    }
  }, []);

  const shoot = useCallback(() => {
    if (flyRef.current || phaseRef.current !== 'playing') return;
    const angle = aimRef.current;
    const W = W_ref.current;
    const SY = SHOOTER_Y.current || H_ref.current * 0.85;
    flyRef.current = {
      letter: currentRef.current, x: W / 2, y: SY,
      vx: Math.cos(angle) * SPEED, vy: Math.sin(angle) * SPEED,
    };
    currentRef.current = nextRef.current;
    nextRef.current = LETTERS[Math.floor(Math.random() * LETTERS.length)]!;
  }, []);

  const handlePointer = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (phaseRef.current !== 'playing') return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const W = W_ref.current;
    const SY = SHOOTER_Y.current || H_ref.current * 0.85;
    const dx = px - W / 2;
    const dy = py - SY;
    let angle = Math.atan2(dy, dx);
    if (angle > -0.15) angle = -0.15;
    if (angle < -Math.PI + 0.15) angle = -Math.PI + 0.15;
    aimRef.current = angle;
  }, []);

  const handleTap = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    if (flyRef.current) return;
    shoot();
  }, [shoot]);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    const canvas = ctx.canvas;
    const W = canvas.width;
    const H = canvas.height;
    W_ref.current = W;
    H_ref.current = H;
    SHOOTER_Y.current = H * 0.85;
    const SY = SHOOTER_Y.current;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    if (phaseRef.current !== 'playing') return;

    const grid = gridRef.current;
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const letter = grid[row]?.[col];
        if (!letter) continue;
        drawBubble(ctx, bx(col, row, W), by(row), letter);
      }
    }

    popsRef.current = popsRef.current.filter(p => p.t < 400);
    for (const p of popsRef.current) {
      const frac = p.t / 400;
      ctx.globalAlpha = 1 - frac;
      ctx.font = `bold ${Math.round(R * 1.2 * (1 + frac * 0.5))}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = COLORS[p.letter] ?? '#fff';
      ctx.fillText(p.letter, p.x, p.y - 20 * frac);
      ctx.globalAlpha = 1;
      p.t += dt;
    }

    if (!flyRef.current) {
      const angle = aimRef.current;
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2, SY);
      ctx.lineTo(W / 2 + Math.cos(angle) * 120, SY + Math.sin(angle) * 120);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    drawBubble(ctx, W / 2, SY, currentRef.current);
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('הבא:', 10, SY - 10);
    drawBubble(ctx, 50, SY - 40, nextRef.current, R * 0.65);

    const fly = flyRef.current;
    if (fly) {
      fly.x += fly.vx * dt;
      fly.y += fly.vy * dt;
      if (fly.x - R < 0) { fly.x = R; fly.vx = Math.abs(fly.vx); }
      if (fly.x + R > W) { fly.x = W - R; fly.vx = -Math.abs(fly.vx); }
      if (fly.y - R <= 0) { fly.y = R; placeBubble(fly, W); flyRef.current = null; return; }
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (!grid[row]?.[col]) continue;
          const dx = fly.x - bx(col, row, W);
          const dy = fly.y - by(row);
          if (Math.hypot(dx, dy) < DIA - 4) { placeBubble(fly, W); flyRef.current = null; return; }
        }
      }
      drawBubble(ctx, fly.x, fly.y, fly.letter);
    }

    if (isGridClear(grid)) { setWon(true); setPhase('result'); }
    else if (gridTooLow(grid, GRID_ROWS - 1)) { setWon(false); setPhase('result'); }
  }, [placeBubble]));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    });
    ro.observe(canvas.parentElement ?? canvas);
    return () => ro.disconnect();
  }, [canvasRef]);

  return {
    phase, score, won, LETTERS, COLORS,
    canvasRef, startGame, handlePointer, handleTap,
  };
}
