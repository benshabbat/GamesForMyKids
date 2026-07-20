import { W, H, PLAT_W, PLAT_H, PLAT_GAP, PLAYER_R, INIT_PLATS, type Platform, type JumperState } from './jumperConstants';

let platId = 0;

export function makePlatform(y: number): Platform & { id: number } {
  return { id: platId++, x: Math.random() * (W - PLAT_W), y, w: PLAT_W };
}

export function generateInitial(): Array<Platform & { id: number }> {
  const plats: Array<Platform & { id: number }> = [];
  plats.push({ id: platId++, x: W / 2 - 55, y: H - 60, w: 110 });
  for (let i = 1; i < INIT_PLATS; i++) {
    plats.push(makePlatform(H - 60 - i * (PLAT_GAP * 0.75)));
  }
  return plats;
}

/**
 * Pure rendering of one jumper frame — sky, stars, platforms, player, and score.
 * No game-state writes; the caller resolves physics/collisions/scoring before invoking this.
 */
export function drawJumperScene(ctx: CanvasRenderingContext2D, st: JumperState) {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#0c1445');
  sky.addColorStop(1, '#1a237e');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  for (let i = 0; i < 30; i++) {
    const sx = ((i * 97 + st.camY * 0.05) % W + W) % W;
    const sy = ((i * 137) % H);
    ctx.beginPath();
    ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const p of st.platforms) {
    const drawY = p.y + st.camY;
    if (drawY > H + 10 || drawY < -PLAT_H - 5) continue;
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(p.x, drawY, p.w, PLAT_H);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(p.x, drawY, p.w, 4);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(p.x, drawY + PLAT_H - 3, p.w, 3);
  }

  if (st.phase === 'playing') {
    ctx.font = `${PLAYER_R * 2.2}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🦘', st.px, st.py);
  }

  ctx.font = 'bold 22px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.textAlign = 'left';
  ctx.fillText(`${st.score}m`, 10, 30);
}
