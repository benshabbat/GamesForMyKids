import { Ball, RADIUS_FOR_VALUE } from './numberMergeStore';
import { CANVAS_H, CANVAS_W, FLOOR_Y, NUMBER_COLORS, WALL_LEFT, WALL_RIGHT } from './numberMergeCanvasConfig';

function drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
  const color = NUMBER_COLORS[ball.value] ?? '#999';
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.max(10, ball.radius * 0.85)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(ball.value), ball.x, ball.y);
}

function drawWalls(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#d1a96a';
  ctx.fillRect(0, FLOOR_Y, CANVAS_W, CANVAS_H - FLOOR_Y);
  ctx.fillRect(0, 0, WALL_LEFT, CANVAS_H);
  ctx.fillRect(WALL_RIGHT, 0, CANVAS_W - WALL_RIGHT, CANVAS_H);
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  params: { balls: Ball[]; dropX: number; nextValue: number },
) {
  const { balls, dropX, nextValue } = params;

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  // Background
  ctx.fillStyle = '#FFF8E1';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  drawWalls(ctx);

  // Drop indicator line
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(dropX, 0);
  ctx.lineTo(dropX, FLOOR_Y);
  ctx.stroke();
  ctx.setLineDash([]);

  // Preview ball at top
  const previewR = RADIUS_FOR_VALUE(nextValue);
  const previewColor = NUMBER_COLORS[nextValue] ?? '#999';
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.arc(dropX, previewR + 2, previewR, 0, Math.PI * 2);
  ctx.fillStyle = previewColor;
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.max(10, previewR * 0.85)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(nextValue), dropX, previewR + 2);
  ctx.globalAlpha = 1;

  for (const b of balls) drawBall(ctx, b);
}
