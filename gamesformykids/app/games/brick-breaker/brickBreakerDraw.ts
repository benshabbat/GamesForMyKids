import {
  W, H, ROWS, COLS, BRICK_W, BRICK_H, BRICK_PAD, BRICK_TOP, BALL_R, PAD_W, PAD_H, PAD_Y, ROW_COLORS,
  type Brick, type BrickParticle, type Phase,
} from './brickBreakerConstants';

export function makeBricks(): Brick[] {
  return Array.from({ length: ROWS * COLS }, (_, i) => ({ alive: true, row: Math.floor(i / COLS) }));
}

export function brickRect(i: number) {
  const col = i % COLS, row = Math.floor(i / COLS);
  const x = 10 + col * BRICK_W, y = BRICK_TOP + row * (BRICK_H + BRICK_PAD);
  return { x, y, w: BRICK_W - BRICK_PAD, h: BRICK_H };
}

// ── Gradient caches ──────────────────────────────────────────────────────────
// Canvas gradients are tied to a specific rendering context — re-create them if
// the context ever changes (canvas remount), but reuse across frames otherwise.
let _gradCtx: CanvasRenderingContext2D | null = null;
let _bgGradient: CanvasGradient | null = null;
const _rowGradients: (CanvasGradient | null)[] = new Array(ROWS).fill(null);

function ensureGradients(ctx: CanvasRenderingContext2D) {
  if (ctx === _gradCtx) return; // already cached for this context
  _gradCtx = ctx;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0f0c29'); bg.addColorStop(1, '#302b63');
  _bgGradient = bg;

  // Per-row brick gradients (vertical, normalised to x=0)
  for (let row = 0; row < ROWS; row++) {
    const y = BRICK_TOP + row * (BRICK_H + BRICK_PAD);
    const rowColors = ROW_COLORS[row]!;
    const g = ctx.createLinearGradient(0, y, 0, y + BRICK_H);
    g.addColorStop(0, rowColors[0]!); g.addColorStop(1, rowColors[1]!);
    _rowGradients[row] = g;
  }
}

export interface DrawSceneParams {
  bricks: Brick[];
  particles: BrickParticle[];
  ballX: number;
  ballY: number;
  padX: number;
  phase: Phase;
  launched: boolean;
}

/** Pure canvas painting for the brick-breaker scene — no state mutation, reads only. */
export function drawBrickBreakerScene(
  ctx: CanvasRenderingContext2D,
  { bricks, particles, ballX, ballY, padX, phase, launched }: DrawSceneParams,
) {
  ensureGradients(ctx);
  ctx.fillStyle = _bgGradient!; ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < bricks.length; i++) {
    if (!bricks[i]!.alive) continue;
    const { x, y, w, h } = brickRect(i);
    ctx.fillStyle = _rowGradients[bricks[i]!.row]!;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, 4); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.roundRect(x + 2, y + 2, w - 4, 5, 3); ctx.fill();
  }

  for (const p of particles) { ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); }
  ctx.globalAlpha = 1;

  const ballGlow = ctx.createRadialGradient(ballX, ballY, 0, ballX, ballY, BALL_R * 2.5);
  ballGlow.addColorStop(0, 'rgba(255,255,255,0.4)'); ballGlow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = ballGlow; ctx.beginPath(); ctx.arc(ballX, ballY, BALL_R * 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(ballX, ballY, BALL_R, 0, Math.PI * 2); ctx.fill();

  const padGrad = ctx.createLinearGradient(padX, PAD_Y, padX + PAD_W, PAD_Y);
  padGrad.addColorStop(0, '#60A5FA'); padGrad.addColorStop(0.5, '#93C5FD'); padGrad.addColorStop(1, '#60A5FA');
  ctx.fillStyle = padGrad; ctx.beginPath(); ctx.roundRect(padX, PAD_Y, PAD_W, PAD_H, 6); ctx.fill();

  if (phase === 'playing' && !launched) { ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '14px Arial'; ctx.textAlign = 'center'; ctx.fillText('הקש להשיק! 🏏', W / 2, PAD_Y - 20); }
}
