import { W, H, SHIP_W, SHIP_H, BULLET_R, type Bullet, type Asteroid } from './spaceDefenderConstants';
import type { PhaseResult as Phase } from '@/lib/types';

// ── Cached bullet gradient ───────────────────────────────────────────────────
// One gradient object reused across all bullets each frame via ctx.translate.
let _bulletGradCtx: CanvasRenderingContext2D | null = null;
let _bulletGrad: CanvasGradient | null = null;

function ensureBulletGrad(ctx: CanvasRenderingContext2D) {
  if (ctx === _bulletGradCtx) return;
  _bulletGradCtx = ctx;
  const g = ctx.createLinearGradient(0, -14, 0, 4);
  g.addColorStop(0, '#FFD700'); g.addColorStop(1, 'rgba(255,215,0,0)');
  _bulletGrad = g;
}

export interface DrawSceneParams {
  phase: Phase;
  frame: number;
  stars: { x: number; y: number; r: number; twinkle: number }[];
  bullets: Bullet[];
  asteroids: Asteroid[];
  shipX: number;
}

/** Pure canvas painting for the space-defender scene — no state mutation, reads only. */
export function drawSpaceDefenderScene(
  ctx: CanvasRenderingContext2D,
  { phase, frame, stars, bullets, asteroids, shipX }: DrawSceneParams,
) {
  ctx.fillStyle = '#050514';
  ctx.fillRect(0, 0, W, H);

  for (const star of stars) {
    const alpha = 0.4 + Math.sin(frame * 0.03 + star.twinkle) * 0.3;
    ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,220,${alpha})`; ctx.fill();
  }

  ensureBulletGrad(ctx);
  ctx.fillStyle = _bulletGrad!;
  for (const b of bullets) {
    ctx.save(); ctx.translate(b.x, b.y);
    ctx.beginPath(); ctx.ellipse(0, -7, BULLET_R, 14, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  ctx.font = 'serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (const a of asteroids) {
    ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(a.angle);
    ctx.font = `${a.r * 1.8}px serif`; ctx.fillText(a.emoji, 0, 0); ctx.restore();
  }

  const sx = shipX, sy = H - 80;
  ctx.save(); ctx.translate(sx, sy);
  if (phase === 'playing') {
    const thrustGrad = ctx.createRadialGradient(0, SHIP_H / 2 + 6, 0, 0, SHIP_H / 2 + 6, 18);
    thrustGrad.addColorStop(0, 'rgba(255,140,0,0.9)'); thrustGrad.addColorStop(0.5, 'rgba(255,60,0,0.5)'); thrustGrad.addColorStop(1, 'rgba(255,0,0,0)');
    ctx.fillStyle = thrustGrad;
    const flicker = frame % 4 < 2 ? 14 : 10;
    ctx.beginPath(); ctx.ellipse(0, SHIP_H / 2 + flicker / 2, 8, flicker, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = '#4FC3F7';
  ctx.beginPath(); ctx.moveTo(0, -SHIP_H / 2); ctx.lineTo(SHIP_W / 2, SHIP_H / 2); ctx.lineTo(-SHIP_W / 2, SHIP_H / 2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#B3E5FC';
  ctx.beginPath(); ctx.ellipse(0, -4, 9, 13, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0288D1';
  ctx.beginPath(); ctx.moveTo(SHIP_W / 2, SHIP_H / 2); ctx.lineTo(SHIP_W / 2 + 14, SHIP_H / 2 + 6); ctx.lineTo(SHIP_W / 3, 4); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-SHIP_W / 2, SHIP_H / 2); ctx.lineTo(-SHIP_W / 2 - 14, SHIP_H / 2 + 6); ctx.lineTo(-SHIP_W / 3, 4); ctx.fill();
  ctx.restore();

  ctx.fillStyle = 'rgba(30,100,50,0.3)'; ctx.fillRect(0, H - 18, W, 18);
  ctx.fillStyle = 'rgba(50,150,80,0.5)'; ctx.fillRect(0, H - 10, W, 10);
}
