import { GRAVITY, POWER, MAX_DRAG, BOX_W, BOX_H, BALL_R } from './slingshotConstants';
import type { Phase, Box, Ball, DragState } from './slingshotConstants';

type DrawParams = {
  W: number;
  H: number;
  phase: Phase;
  sx: number;
  sy: number;
  drag: DragState;
  ball: Ball;
  boxes: Box[];
  currentLetter: string | undefined;
};

/**
 * Pure canvas rendering for one frame of the slingshot game.
 * Reads the given snapshot of physics/game state and draws — no state writes.
 */
export function drawSlingshotFrame(ctx: CanvasRenderingContext2D, p: DrawParams) {
  const { W, H, phase, sx, sy, drag, ball, boxes, currentLetter } = p;

  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#bfdbfe');
  sky.addColorStop(1, '#93c5fd');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#16a34a';
  ctx.fillRect(0, H * 0.88, W, H * 0.12);
  ctx.fillStyle = '#15803d';
  ctx.fillRect(0, H * 0.88, W, 6);

  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  for (let i = 0; i < 3; i++) {
    const cx = (W * 0.15 + i * W * 0.3) % W;
    ctx.beginPath();
    ctx.ellipse(cx, H * 0.12, 40, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 28, H * 0.12 + 5, 30, 15, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(sx, sy + 30);
  ctx.lineTo(sx, sy + 70);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(sx, sy + 30);
  ctx.lineTo(sx - 18, sy - 25);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(sx, sy + 30);
  ctx.lineTo(sx + 18, sy - 25);
  ctx.stroke();

  const bx = phase === 'aiming'
    ? sx + Math.max(-MAX_DRAG, Math.min(MAX_DRAG, drag.dx))
    : ball.x;
  const by = phase === 'aiming'
    ? sy + Math.max(-MAX_DRAG, Math.min(MAX_DRAG, drag.dy))
    : ball.y;

  if (phase === 'aiming' || phase === 'feedback') {
    ctx.strokeStyle = '#c4b5fd';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sx - 18, sy - 25);
    ctx.lineTo(bx, by);
    ctx.moveTo(sx + 18, sy - 25);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }

  if (phase === 'aiming' && drag.active && (drag.dx !== 0 || drag.dy !== 0)) {
    const clampedDx = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, drag.dx));
    const clampedDy = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, drag.dy));
    const tvx = -clampedDx * POWER;
    const tvy = -clampedDy * POWER;
    ctx.fillStyle = 'rgba(124,58,237,0.5)';
    for (let t = 50; t < 1500; t += 80) {
      const tx = sx + tvx * t;
      const ty = sy + tvy * t + 0.5 * GRAVITY * t * t;
      if (tx > W || ty > H) break;
      ctx.beginPath();
      ctx.arc(tx, ty, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (const box of boxes) {
    if (box.popped) {
      ctx.fillStyle = box.isCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)';
      ctx.fillRect(box.x, box.y, BOX_W, BOX_H);
    } else {
      ctx.fillStyle = '#fef3c7';
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(box.x, box.y, BOX_W, BOX_H, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1e1b4b';
      ctx.font = `bold 18px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(box.word, box.x + BOX_W / 2, box.y + BOX_H / 2);
    }
  }

  ctx.shadowColor = '#7c3aed';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(bx, by, BALL_R, 0, Math.PI * 2);
  ctx.fillStyle = '#7c3aed';
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#c4b5fd';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (currentLetter) {
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${BALL_R}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentLetter, bx, by + 2);
  }
}
