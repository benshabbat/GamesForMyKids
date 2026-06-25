'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const COLS = 8;
const GRID_ROWS = 7;
const R = 26;
const DIA = R * 2 + 2;
const SPEED = 0.65;
const MIN_MATCH = 3;

const LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];
const COLORS: Record<string, string> = {
  'א': '#3b82f6', 'ב': '#ef4444', 'ג': '#22c55e',
  'ד': '#f97316', 'ה': '#a855f7', 'ו': '#14b8a6',
};
const DARK: Record<string, string> = {
  'א': '#1d4ed8', 'ב': '#b91c1c', 'ג': '#15803d',
  'ד': '#c2410c', 'ה': '#7e22ce', 'ו': '#0f766e',
};

function bx(col: number, row: number, W: number): number {
  const offset = row % 2 === 1 ? R + 1 : 0;
  return R + col * DIA + offset + (W - (COLS * DIA + DIA / 2)) / 2;
}
function by(row: number): number { return R + row * (DIA - 2); }
function colsInRow(row: number): number { return row % 2 === 0 ? COLS : COLS - 1; }

function mkGrid(): (string | null)[][] {
  return Array.from({ length: GRID_ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) =>
      col < colsInRow(row) && row < 5 ? LETTERS[Math.floor(Math.random() * LETTERS.length)]! : null
    )
  );
}

function neighbors(row: number, col: number): [number, number][] {
  return row % 2 === 0
    ? [[row-1,col-1],[row-1,col],[row,col-1],[row,col+1],[row+1,col-1],[row+1,col]]
    : [[row-1,col],[row-1,col+1],[row,col-1],[row,col+1],[row+1,col],[row+1,col+1]];
}

function flood(grid: (string|null)[][], row: number, col: number, letter: string): [number,number][] {
  const seen = new Set<string>(); const out: [number,number][] = [];
  function dfs(r: number, c: number) {
    const k = `${r},${c}`;
    if (seen.has(k)) return;
    if (r < 0 || r >= GRID_ROWS || c < 0 || c >= COLS) return;
    if (grid[r]?.[c] !== letter) return;
    seen.add(k); out.push([r, c]);
    for (const [nr, nc] of neighbors(r, c)) dfs(nr, nc);
  }
  dfs(row, col); return out;
}

function snapToGrid(fx: number, fy: number, W: number, grid: (string|null)[][]): {row:number, col:number} | null {
  let bestR = 0, bestC = 0, bestD = Infinity;
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row]?.[col] !== null) continue;
      const dx = fx - bx(col, row, W); const dy = fy - by(row);
      const d = Math.hypot(dx, dy);
      if (d < bestD) { bestD = d; bestR = row; bestC = col; }
    }
  }
  return bestD < DIA * 1.2 ? { row: bestR, col: bestC } : null;
}

function isGridClear(grid: (string|null)[][]): boolean { return grid.every(row => row.every(c => c === null)); }
function gridTooLow(grid: (string|null)[][], threshold: number): boolean {
  for (let row = threshold; row < GRID_ROWS; row++) { if (grid[row]?.some(c => c !== null)) return true; }
  return false;
}

type Phase = 'menu' | 'playing' | 'result';
interface FlyBubble { letter: string; x: number; y: number; vx: number; vy: number; }
interface PopAnim { x: number; y: number; t: number; letter: string; }

function lighten(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (n >> 16) + 60);
  const g = Math.min(255, ((n >> 8) & 0xff) + 60);
  const b = Math.min(255, (n & 0xff) + 60);
  return `rgb(${r},${g},${b})`;
}

function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, letter: string, r = R) {
  const color = COLORS[letter] ?? '#6366f1';
  const dark = DARK[letter] ?? '#4338ca';
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
  grad.addColorStop(0, lighten(color));
  grad.addColorStop(1, dark);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.font = `bold ${Math.round(r)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(letter, x, y + 1);
}

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
