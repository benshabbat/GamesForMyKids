import { W, H, PIPE_W, PIPE_GAP, GROUND_H, BIRD_X, BIRD_R, type FlappyBirdState } from './flappyBirdConstants';

function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawClouds(ctx: CanvasRenderingContext2D, bgOffset: number) {
  function cloud(x: number, y: number) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.ellipse(x, y, 38, 22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x + 28, y - 8, 26, 18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x - 25, y - 5, 20, 14, 0, 0, Math.PI * 2); ctx.fill();
  }
  cloud(((60 + bgOffset) % (W + 100)) - 50, 60);
  cloud(((200 + bgOffset) % (W + 100)) - 50, 95);
  cloud(((320 + bgOffset) % (W + 100)) - 50, 45);
}

/**
 * Pure rendering of one flappy-bird frame — sky, clouds, pipes, ground, bird, and score.
 * No game-state writes; the caller resolves physics/collisions/scoring before invoking this.
 */
export function drawFlappyBirdScene(ctx: CanvasRenderingContext2D, st: FlappyBirdState) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H - GROUND_H);
  skyGrad.addColorStop(0, '#87CEEB');
  skyGrad.addColorStop(1, '#C9E8F5');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  drawClouds(ctx, st.bgOffset);

  for (const p of st.pipes) {
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(p.x, 0, PIPE_W, p.gapY - 20);
    ctx.fillStyle = '#388E3C';
    drawRoundRect(ctx, p.x - 5, p.gapY - 22, PIPE_W + 10, 22, 6);
    ctx.fill();
    ctx.fillStyle = '#4CAF50';
    const botTop = p.gapY + PIPE_GAP;
    ctx.fillRect(p.x, botTop + 22, PIPE_W, H - GROUND_H - botTop - 22);
    ctx.fillStyle = '#388E3C';
    drawRoundRect(ctx, p.x - 5, botTop, PIPE_W + 10, 22, 6);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(p.x + 6, 0, 8, p.gapY - 22);
    ctx.fillRect(p.x + 6, botTop + 22, 8, H - GROUND_H - botTop - 22);
  }

  const groundGrad = ctx.createLinearGradient(0, H - GROUND_H, 0, H);
  groundGrad.addColorStop(0, '#5D8C3A');
  groundGrad.addColorStop(0.15, '#8B6914');
  groundGrad.addColorStop(1, '#6B4F10');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, H - GROUND_H, W, GROUND_H);

  const birdAngle = Math.max(-0.5, Math.min(1.2, st.birdVY * 0.06));
  ctx.save();
  ctx.translate(BIRD_X, st.birdY);
  ctx.rotate(birdAngle);
  ctx.beginPath();
  ctx.ellipse(0, 0, BIRD_R + 2, BIRD_R, 0, 0, Math.PI * 2);
  ctx.fillStyle = st.phase === 'dead' ? '#FF6B6B' : '#FFD700';
  ctx.fill();
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(-4, 4, 12, 7, 0.3, 0, Math.PI * 2);
  ctx.fillStyle = '#FFA500';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(6, -5, 6, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(8, -5, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#333';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(16, -2);
  ctx.lineTo(26, 1);
  ctx.lineTo(16, 5);
  ctx.fillStyle = '#FF6600';
  ctx.fill();
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.font = 'bold 38px Arial';
  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
  ctx.lineWidth = 4;
  ctx.strokeText(String(st.score), W / 2, 52);
  ctx.fillStyle = 'white';
  ctx.fillText(String(st.score), W / 2, 52);
}
