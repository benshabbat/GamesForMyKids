'use client';
import { useEffect, useRef, useCallback, useState } from 'react';

const W = 300;
const H = 500;
const GRAVITY   = 0.32;
const JUMP_VY   = -10.5;
const PLAT_W    = 70;
const PLAT_H    = 12;
const PLAYER_R  = 15;
const PLAT_GAP  = 95;  // max vertical gap between platforms
const INIT_PLATS = 14; // platforms to generate at start

type Phase = 'menu' | 'playing' | 'dead';
interface Platform { x: number; y: number; w: number; }

let platId = 0;
function makePlatform(y: number): Platform & { id: number } {
  return { id: platId++, x: Math.random() * (W - PLAT_W), y, w: PLAT_W };
}

function generateInitial(): Array<Platform & { id: number }> {
  const plats: Array<Platform & { id: number }> = [];
  // Wide base platform
  plats.push({ id: platId++, x: W / 2 - 55, y: H - 60, w: 110 });
  for (let i = 1; i < INIT_PLATS; i++) {
    plats.push(makePlatform(H - 60 - i * (PLAT_GAP * 0.75)));
  }
  return plats;
}

export default function JumperGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    px: W / 2, py: H - 100,
    pvx: 0, pvy: 0,
    camY: 0,           // world Y of canvas top (increases as player goes up)
    maxCamY: 0,
    platforms: generateInitial() as Array<Platform & { id: number }>,
    score: 0, best: 0,
    frame: 0, raf: 0,
    leftDown: false, rightDown: false,
    nextPlatY: H - 60 - INIT_PLATS * (PLAT_GAP * 0.75),
  });
  const [ui, setUi] = useState({ phase: 'menu' as Phase, score: 0, best: 0 });

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.px = W / 2; s.py = H - 100;
    s.pvx = 0; s.pvy = JUMP_VY;
    s.camY = 0; s.maxCamY = 0;
    s.score = 0; s.frame = 0;
    s.platforms = generateInitial();
    s.nextPlatY = H - 60 - INIT_PLATS * (PLAT_GAP * 0.75);
    setUi({ phase: 'playing', score: 0, best: s.best });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function loop() {
      const s = st.current;
      s.frame++;

      if (s.phase === 'playing') {
        // Horizontal input
        const HSPEED = 4.5;
        if (s.leftDown)  s.pvx = Math.max(s.pvx - 0.8, -HSPEED);
        if (s.rightDown) s.pvx = Math.min(s.pvx + 0.8,  HSPEED);
        if (!s.leftDown && !s.rightDown) s.pvx *= 0.85;

        // Physics
        s.pvy += GRAVITY;
        s.py  += s.pvy;
        s.px  += s.pvx;

        // Wrap horizontally
        if (s.px < -PLAYER_R)   s.px = W + PLAYER_R;
        if (s.px > W + PLAYER_R) s.px = -PLAYER_R;

        // Platform collision (only when falling)
        if (s.pvy > 0) {
          for (const p of s.platforms) {
            const screenY = p.y - s.camY;
            if (
              s.py + PLAYER_R >= screenY &&
              s.py + PLAYER_R <= screenY + PLAT_H + Math.abs(s.pvy) + 2 &&
              s.px + PLAYER_R * 0.7 > p.x &&
              s.px - PLAYER_R * 0.7 < p.x + p.w
            ) {
              s.pvy = JUMP_VY;
              s.py  = screenY - PLAYER_R;
            }
          }
        }

        // Camera follows player upward
        const playerScreenY = s.py;
        if (playerScreenY < H * 0.45) {
          const shift = H * 0.45 - playerScreenY;
          s.camY += shift;
          s.py   += shift;
          // shift all platforms down in screen space (they stay fixed in world)
          // (we just track camY)
        }

        // Score = camera units scrolled
        s.score = Math.floor(s.camY / 10);
        if (s.camY > s.maxCamY) {
          s.maxCamY = s.camY;
          if (s.frame % 10 === 0) setUi(u => ({ ...u, score: s.score }));
        }

        // Generate new platforms above
        while (s.nextPlatY > -(s.camY) - H) {
          s.platforms.push(makePlatform(s.nextPlatY - s.camY + (H * 2)));
          // Actually add in world coords relative to cam:
          // We store world Y as screen Y offset from camY=0 baseline
          s.nextPlatY -= PLAT_GAP * (0.6 + Math.random() * 0.5);
        }

        // Remove platforms below screen
        s.platforms = s.platforms.filter(p => p.y - s.camY < H + 50);

        // Death: fell below screen
        if (s.py > H + 60) {
          s.phase = 'dead';
          if (s.score > s.best) s.best = s.score;
          setUi({ phase: 'dead', score: s.score, best: s.best });
        }
      }

      // ── Draw ──────────────────────────────────────────
      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#0c1445');
      sky.addColorStop(1, '#1a237e');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Stars (pseudo-random from frame)
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 97 + st.current.camY * 0.05) % W + W) % W;
        const sy = ((i * 137) % H);
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Platforms
      const s2 = st.current;
      for (const p of s2.platforms) {
        const drawY = p.y - s2.camY;
        if (drawY > H + 10 || drawY < -PLAT_H - 5) continue;
        // Platform body
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(p.x, drawY, p.w, PLAT_H);
        // Shine
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(p.x, drawY, p.w, 4);
        // Shadow
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(p.x, drawY + PLAT_H - 3, p.w, 3);
      }

      // Player
      if (s2.phase === 'playing') {
        ctx.font = `${PLAYER_R * 2.2}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🦘', s2.px, s2.py);
      }

      // Score
      ctx.font = 'bold 22px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.textAlign = 'left';
      ctx.fillText(`${s2.score}m`, 10, 30);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  // Keyboard
  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft'  || e.key === 'a') st.current.leftDown  = true;
      if (e.key === 'ArrowRight' || e.key === 'd') st.current.rightDown = true;
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft'  || e.key === 'a') st.current.leftDown  = false;
      if (e.key === 'ArrowRight' || e.key === 'd') st.current.rightDown = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup',   ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  // Touch move on canvas
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const tx = (e.touches[0].clientX - rect.left) * (W / rect.width);
    const s = st.current;
    if (s.phase !== 'playing') return;
    if (tx < W / 2) { s.leftDown = true; s.rightDown = false; }
    else             { s.rightDown = true; s.leftDown = false; }
  }, []);
  const handleTouchEnd = useCallback(() => {
    st.current.leftDown = false;
    st.current.rightDown = false;
  }, []);

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-2 text-center">
          <div><p className="text-2xl font-black text-green-300">{ui.score}m</p><p className="text-xs text-green-600">גובה</p></div>
          <div><p className="text-2xl font-black text-gray-400">{ui.best}m</p><p className="text-xs text-gray-600">שיא</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => { if (st.current.phase === 'menu') startGame(); }}
          className="rounded-3xl shadow-2xl border-2 border-indigo-800"
          style={{ touchAction: 'none', maxHeight: '78vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">🦘</div>
              <h1 className="text-2xl font-black text-gray-700 mb-1">קפצן</h1>
              <p className="text-gray-500 text-sm mb-5">קפץ על הפלטפורמות וטפס גבוה!<br/>הזז שמאלה/ימינה· אל תיפול</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}m</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xl hover:bg-indigo-500 active:scale-95 transition-all">
                🦘 קפץ!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">😵</div>
              <h2 className="text-2xl font-black text-gray-700 mb-3">נפלת!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-indigo-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-indigo-600">{ui.score}m</p>
                  <p className="text-xs text-indigo-400">גובה</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}m</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xl hover:bg-indigo-500 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-4">
          <button
            onPointerDown={() => { st.current.leftDown = true; }}
            onPointerUp={() => { st.current.leftDown = false; }}
            onPointerLeave={() => { st.current.leftDown = false; }}
            className="bg-indigo-700/80 text-white rounded-xl px-10 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          >◀</button>
          <button
            onPointerDown={() => { st.current.rightDown = true; }}
            onPointerUp={() => { st.current.rightDown = false; }}
            onPointerLeave={() => { st.current.rightDown = false; }}
            className="bg-indigo-700/80 text-white rounded-xl px-10 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          >▶</button>
        </div>
      )}
    </div>
  );
}
