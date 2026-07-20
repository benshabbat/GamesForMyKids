import { BUCKET_W, BUCKET_H, LETTER_RADIUS, LETTER_COLORS } from './letterGrowConstants';
import type { FallingLetter, LetterWord } from './letterGrowConstants';

/**
 * Pure rendering of one letter-grow frame — background, falling letters, and the bucket.
 * No game-state writes; the caller resolves physics/collisions before invoking this.
 */
export function drawLetterGrowScene(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  fallingLetters: FallingLetter[],
  bucketX: number,
  bucketY: number,
  target: LetterWord | undefined,
) {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#1e1b4b');
  sky.addColorStop(0.6, '#312e81');
  sky.addColorStop(1, '#1e3a5f');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  for (let i = 0; i < 30; i++) {
    const sx = ((i * 137 + 23) % W);
    const sy = ((i * 89 + 11) % (H * 0.7));
    ctx.fillRect(sx, sy, 2, 2);
  }

  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(0, H - 8, W, 8);

  for (const fl of fallingLetters) {
    const colorIdx = fl.letter.codePointAt(0)! % LETTER_COLORS.length;
    const color = LETTER_COLORS[colorIdx] ?? '#f43f5e';
    const isT = fl.isTarget;

    ctx.save();
    ctx.translate(fl.x, fl.y);
    if (isT) { ctx.shadowColor = color; ctx.shadowBlur = 18; }
    ctx.beginPath();
    ctx.arc(0, 0, LETTER_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = isT ? color : 'rgba(100,100,120,0.7)';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = isT ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${LETTER_RADIUS}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fl.letter, 0, 2);
    ctx.restore();
  }

  ctx.save();
  ctx.translate(bucketX, bucketY);
  const bw2 = BUCKET_W / 2;
  ctx.beginPath();
  ctx.roundRect(-bw2, 0, BUCKET_W, BUCKET_H, 8);
  ctx.fillStyle = '#fbbf24';
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, -6, bw2 - 8, Math.PI, 0);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.stroke();
  if (target) {
    ctx.fillStyle = '#1e1b4b';
    ctx.font = `bold ${BUCKET_H - 6}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(target.letter, 0, BUCKET_H / 2);
  }
  ctx.restore();
}
