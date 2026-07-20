import { CIRCLE_R, CIRCLE_COLORS } from './drumsConstants';
import type { BeatCircle } from './drumsConstants';

/**
 * Pure rendering of one drums frame — background, beat line, and falling circles.
 * No game-state writes; the caller resolves spawn/physics/miss detection before invoking this.
 */
export function drawDrumsScene(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  hitY: number,
  centerX: number,
  circles: BeatCircle[],
) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0f172a');
  bg.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(99,102,241,0.1)';
  ctx.lineWidth = 1;
  for (let y = 0; y < H; y += 60) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 20;
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W * 0.1, hitY);
  ctx.lineTo(W * 0.9, hitY);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.font = '32px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🥁', centerX, hitY + 28);

  for (const c of circles) {
    const colorIdx = (c.letter.codePointAt(0) ?? 0) % CIRCLE_COLORS.length;
    const color = CIRCLE_COLORS[colorIdx] ?? '#f43f5e';
    const isClose = !c.tapped && !c.missed && Math.abs(c.y - hitY) < 60;

    ctx.save();
    ctx.translate(centerX, c.y);

    if (c.ripple > 0) {
      const prog = 1 - c.ripple / 500;
      const rippleR = CIRCLE_R + prog * 40;
      ctx.globalAlpha = 0.6 * (1 - prog);
      ctx.beginPath();
      ctx.arc(0, 0, rippleR, 0, Math.PI * 2);
      ctx.strokeStyle = c.rippleOk ? '#4ade80' : '#f87171';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    if (isClose) { ctx.shadowColor = color; ctx.shadowBlur = 20; }

    ctx.beginPath();
    ctx.arc(0, 0, CIRCLE_R, 0, Math.PI * 2);
    ctx.fillStyle = c.tapped ? '#4ade80' : c.missed ? '#6b7280' : color;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = `bold ${CIRCLE_R}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(c.letter, 0, 2);

    ctx.restore();
  }
}
