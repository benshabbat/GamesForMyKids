'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { speakHebrew } from '@/lib/utils/speech/speaker';

// ─── constants ────────────────────────────────────────────────────────────────

const COLS = 8;
const GRID_ROWS = 7;
const R = 26;           // bubble radius px
const DIA = R * 2 + 2; // center-to-center spacing
const SPEED = 0.65;     // px/ms
const MIN_MATCH = 3;

// 6 letters used (small set → more matches)
const LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];
const COLORS: Record<string, string> = {
  'א': '#3b82f6', 'ב': '#ef4444', 'ג': '#22c55e',
  'ד': '#f97316', 'ה': '#a855f7', 'ו': '#14b8a6',
};
const DARK: Record<string, string> = {
  'א': '#1d4ed8', 'ב': '#b91c1c', 'ג': '#15803d',
  'ד': '#c2410c', 'ה': '#7e22ce', 'ו': '#0f766e',
};

// ─── geometry helpers ─────────────────────────────────────────────────────────

function bx(col: number, row: number, W: number): number {
  const offset = row % 2 === 1 ? R + 1 : 0;
  return R + col * DIA + offset + (W - (COLS * DIA + DIA / 2)) / 2;
}
function by(row: number): number {
  return R + row * (DIA - 2);
}
function colsInRow(row: number): number {
  return row % 2 === 0 ? COLS : COLS - 1;
}

// ─── grid helpers ─────────────────────────────────────────────────────────────

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
  const seen = new Set<string>();
  const out: [number,number][] = [];
  function dfs(r: number, c: number) {
    const k = `${r},${c}`;
    if (seen.has(k)) return;
    if (r < 0 || r >= GRID_ROWS || c < 0 || c >= COLS) return;
    if (grid[r]?.[c] !== letter) return;
    seen.add(k); out.push([r, c]);
    for (const [nr, nc] of neighbors(r, c)) dfs(nr, nc);
  }
  dfs(row, col);
  return out;
}

function snapToGrid(fx: number, fy: number, W: number, grid: (string|null)[][]): {row:number, col:number} | null {
  let bestR = 0, bestC = 0, bestD = Infinity;
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row]?.[col] !== null) continue;
      if (col >= colsInRow(row) && grid[row]?.[col] === null) {
        // check it's a valid slot
      }
      const dx = fx - bx(col, row, W);
      const dy = fy - by(row);
      const d = Math.hypot(dx, dy);
      if (d < bestD) { bestD = d; bestR = row; bestC = col; }
    }
  }
  return bestD < DIA * 1.2 ? { row: bestR, col: bestC } : null;
}

function isGridClear(grid: (string|null)[][]): boolean {
  return grid.every(row => row.every(c => c === null));
}

function gridTooLow(grid: (string|null)[][], threshold: number): boolean {
  for (let row = threshold; row < GRID_ROWS; row++) {
    if (grid[row]?.some(c => c !== null)) return true;
  }
  return false;
}

// ─── types ────────────────────────────────────────────────────────────────────

type Phase = 'menu' | 'playing' | 'result';

interface FlyBubble { letter: string; x: number; y: number; vx: number; vy: number; }
interface PopAnim   { x: number; y: number; t: number; letter: string; }

// ─── component ────────────────────────────────────────────────────────────────

export default function BubbleShooterClient() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  const gridRef    = useRef<(string|null)[][]>(mkGrid());
  const flyRef     = useRef<FlyBubble | null>(null);
  const currentRef = useRef<string>(LETTERS[Math.floor(Math.random() * LETTERS.length)]!);
  const nextRef    = useRef<string>(LETTERS[Math.floor(Math.random() * LETTERS.length)]!);
  const aimRef     = useRef<number>(-Math.PI / 2);
  const popsRef    = useRef<PopAnim[]>([]);
  const scoreRef   = useRef(0);
  const phaseRef   = useRef<Phase>('menu');
  const W_ref      = useRef(400);
  const H_ref      = useRef(600);

  const SHOOTER_Y  = useRef(0);

  // Sync phase ref so canvas loop can read it
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

  // ── shoot ───────────────────────────────────────────────────────────────────

  const shoot = useCallback(() => {
    if (flyRef.current || phaseRef.current !== 'playing') return;
    const angle = aimRef.current;
    const W = W_ref.current;
    const SY = SHOOTER_Y.current || H_ref.current * 0.85;
    flyRef.current = {
      letter: currentRef.current,
      x: W / 2,
      y: SY,
      vx: Math.cos(angle) * SPEED,
      vy: Math.sin(angle) * SPEED,
    };
    currentRef.current = nextRef.current;
    nextRef.current = LETTERS[Math.floor(Math.random() * LETTERS.length)]!;
  }, []);

  // ── pointer events ──────────────────────────────────────────────────────────

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
    // clamp so we always shoot upward
    if (angle > -0.15) angle = -0.15;
    if (angle < -Math.PI + 0.15) angle = -Math.PI + 0.15;
    aimRef.current = angle;
  }, []);

  const handleTap = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    if (flyRef.current) return;
    shoot();
  }, [shoot]);

  // ── canvas loop ─────────────────────────────────────────────────────────────

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    const canvas = ctx.canvas;
    const W = canvas.width;
    const H = canvas.height;
    W_ref.current = W;
    H_ref.current = H;
    SHOOTER_Y.current = H * 0.85;
    const SY = SHOOTER_Y.current;

    // background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    if (phaseRef.current !== 'playing') return;

    // ── draw grid ──────────────────────────────────────────────────────────
    const grid = gridRef.current;
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const letter = grid[row]?.[col];
        if (!letter) continue;
        drawBubble(ctx, bx(col, row, W), by(row), letter);
      }
    }

    // ── draw pop animations ────────────────────────────────────────────────
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

    // ── draw aim line ──────────────────────────────────────────────────────
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

    // ── draw shooter ───────────────────────────────────────────────────────
    drawBubble(ctx, W / 2, SY, currentRef.current);
    // next bubble (small, top-left)
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('הבא:', 10, SY - 10);
    drawBubble(ctx, 50, SY - 40, nextRef.current, R * 0.65);

    // ── update flying bubble ───────────────────────────────────────────────
    const fly = flyRef.current;
    if (fly) {
      fly.x += fly.vx * dt;
      fly.y += fly.vy * dt;

      // wall bounce
      if (fly.x - R < 0) { fly.x = R; fly.vx = Math.abs(fly.vx); }
      if (fly.x + R > W) { fly.x = W - R; fly.vx = -Math.abs(fly.vx); }

      // hit top
      if (fly.y - R <= 0) {
        fly.y = R;
        placeBubble(fly, W);
        flyRef.current = null;
        return;
      }

      // hit grid bubble
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (!grid[row]?.[col]) continue;
          const dx = fly.x - bx(col, row, W);
          const dy = fly.y - by(row);
          if (Math.hypot(dx, dy) < DIA - 4) {
            placeBubble(fly, W);
            flyRef.current = null;
            return;
          }
        }
      }

      // draw
      drawBubble(ctx, fly.x, fly.y, fly.letter);
    }

    // ── check win/lose ─────────────────────────────────────────────────────
    if (isGridClear(grid)) {
      setWon(true);
      setPhase('result');
    } else if (gridTooLow(grid, GRID_ROWS - 1)) {
      setWon(false);
      setPhase('result');
    }
  }, [])); // eslint-disable-line react-hooks/exhaustive-deps

  function placeBubble(fly: FlyBubble, W: number) {
    const grid = gridRef.current;
    const snapped = snapToGrid(fly.x, fly.y, W, grid);
    if (!snapped) return;
    const { row, col } = snapped;
    if (row >= GRID_ROWS || col >= COLS) return;
    if (!grid[row]) return;
    grid[row][col] = fly.letter;

    // match check
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
  }

  function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, letter: string, r = R) {
    const color = COLORS[letter] ?? '#6366f1';
    const dark  = DARK[letter]  ?? '#4338ca';

    // shadow
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur  = 6;

    // circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    grad.addColorStop(0, lighten(color));
    grad.addColorStop(1, dark);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.shadowBlur = 0;

    // letter
    ctx.font = `bold ${Math.round(r)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillText(letter, x, y + 1);
  }

  function lighten(hex: string): string {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + 60);
    const g = Math.min(255, ((n >> 8) & 0xff) + 60);
    const b = Math.min(255, (n & 0xff) + 60);
    return `rgb(${r},${g},${b})`;
  }

  // ── resize observer ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width  = parent.clientWidth;
      canvas.height = parent.clientHeight;
    });
    ro.observe(canvas.parentElement ?? canvas);
    return () => ro.disconnect();
  }, [canvasRef]);

  // ── menu ─────────────────────────────────────────────────────────────────────

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-7xl mb-4 animate-bounce">🫧</div>
        <h1 className="text-4xl font-bold text-white mb-3">ירי אותיות</h1>
        <p className="text-xl text-indigo-300 mb-2">ירה בועות אל עמודות של 3 אותיות זהות!</p>
        <div className="flex gap-6 mb-8 flex-wrap justify-center">
          {LETTERS.map(l => (
            <div key={l} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                style={{ background: COLORS[l] }}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={startGame}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-2xl font-bold px-12 py-5 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
          🎮 התחל!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-7xl mb-4">{won ? '🥇' : '💥'}</div>
        <h2 className="text-4xl font-bold text-white mb-2">{won ? 'ניצחת!' : 'ניסיון טוב!'}</h2>
        <p className="text-2xl text-indigo-300 mb-8">ניקוד: {score}</p>
        <button onClick={startGame}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-xl">
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  // playing
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center" dir="rtl">
      {/* HUD */}
      <div className="w-full max-w-md flex justify-between items-center px-4 py-3">
        <span className="text-white font-bold text-lg">⭐ {score}</span>
        <span className="text-indigo-300 text-sm">הזז אצבע לכיוון וגע כדי לירות</span>
      </div>
      {/* Canvas */}
      <div className="relative w-full max-w-md flex-1"
        style={{ minHeight: 520 }}
        onPointerMove={handlePointer}
        onClick={handleTap}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none cursor-crosshair"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
}
