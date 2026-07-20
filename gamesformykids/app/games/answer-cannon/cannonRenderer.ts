import { BUBBLE_RADIUS, BARREL_LENGTH, BARREL_WIDTH, type Bubble, type Bullet } from './cannonConstants';

export interface DrawSceneParams {
  W: number;
  H: number;
  cannonX: number;
  cannonY: number;
  angle: number;
  bubbles: Bubble[];
  bullet: Bullet | null;
}

/** Pure canvas painting for the cannon game scene — no state mutation, reads only. */
export function drawCannonScene(
  ctx: CanvasRenderingContext2D,
  { W, H, cannonX, cannonY, angle, bubbles, bullet }: DrawSceneParams,
) {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#1e3a5f');
  sky.addColorStop(0.7, '#2563eb');
  sky.addColorStop(1, '#1d4ed8');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#065f46';
  ctx.fillRect(0, H - 50, W, 50);
  ctx.fillStyle = '#059669';
  ctx.fillRect(0, H - 54, W, 10);

  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  for (let i = 0; i < 30; i++) {
    const sx = ((i * 137 + 50) % W);
    const sy = ((i * 89 + 20) % (H * 0.6));
    ctx.beginPath();
    ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.direction = 'rtl';
  for (const b of bubbles) {
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(b.x, b.y, BUBBLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${b.label.length > 3 ? '16' : '20'}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(b.label, b.x, b.y);
  }
  ctx.restore();

  ctx.fillStyle = '#374151';
  ctx.beginPath();
  ctx.arc(cannonX, cannonY, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#6b7280';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.save();
  ctx.translate(cannonX, cannonY);
  ctx.rotate(angle);
  ctx.fillStyle = '#1f2937';
  ctx.beginPath();
  ctx.roundRect(-BARREL_WIDTH / 2, -BARREL_LENGTH, BARREL_WIDTH, BARREL_LENGTH, 4);
  ctx.fill();
  ctx.strokeStyle = '#4b5563';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  if (bullet) {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
