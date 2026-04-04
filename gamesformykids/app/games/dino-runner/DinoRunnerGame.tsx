'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const W = 400;
const H = 220;
const GROUND_Y = 160;
const DINO_X = 60;
const DINO_W = 40;
const DINO_H = 50;
const GRAVITY = 0.7;
const JUMP_V = -14;
const BASE_SPEED = 4;

type Phase = 'menu' | 'playing' | 'dead';

interface Obstacle { x: number; w: number; h: number; emoji: string; }
interface Cloud { x: number; y: number; }

const OBSTACLE_EMOJIS = ['🌵', '🪨', '🌴', '🌿', '🍄'];

export default function DinoRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    dinoY: GROUND_Y - DINO_H,
    dinoVY: 0,
    onGround: true,
    obstacles: [] as Obstacle[],
    clouds: [{ x: 100, y: 40 }, { x: 280, y: 25 }, { x: 360, y: 55 }] as Cloud[],
    score: 0,
    best: 0,
    frame: 0,
    speed: BASE_SPEED,
    raf: 0,
    nextObstacle: 80,
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; best: number }>({ phase: 'menu', score: 0, best: 0 });

  const jump = useCallback(() => {
    const s = st.current;
    if (s.phase === 'playing' && s.onGround) {
      s.dinoVY = JUMP_V;
      s.onGround = false;
    } else if (s.phase === 'menu') {
      s.phase = 'playing';
      s.dinoY = GROUND_Y - DINO_H;
      s.dinoVY = JUMP_V;
      s.onGround = false;
      s.obstacles = [];
      s.score = 0;
      s.frame = 0;
      s.speed = BASE_SPEED;
      s.nextObstacle = 80;
      setUi({ phase: 'playing', score: 0, best: s.best });
    } else if (s.phase === 'dead') {
      s.phase = 'menu';
      setUi(u => ({ ...u, phase: 'menu' }));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function loop() {
      const s = st.current;

      if (s.phase === 'playing') {
        s.frame++;
        s.score = Math.floor(s.frame / 6);
        s.speed = BASE_SPEED + Math.floor(s.score / 200) * 0.5;

        // Dino physics
        s.dinoVY += GRAVITY;
        s.dinoY += s.dinoVY;
        if (s.dinoY >= GROUND_Y - DINO_H) {
          s.dinoY = GROUND_Y - DINO_H;
          s.dinoVY = 0;
          s.onGround = true;
        }

        // Obstacles
        s.nextObstacle--;
        if (s.nextObstacle <= 0) {
          const w = 28 + Math.random() * 20;
          const h = 35 + Math.random() * 25;
          s.obstacles.push({
            x: W + 20,
            w,
            h,
            emoji: OBSTACLE_EMOJIS[Math.floor(Math.random() * OBSTACLE_EMOJIS.length)],
          });
          s.nextObstacle = 60 + Math.random() * 80;
        }
        for (const o of s.obstacles) o.x -= s.speed;
        s.obstacles = s.obstacles.filter(o => o.x > -60);

        // Clouds
        for (const c of s.clouds) {
          c.x -= 0.5;
          if (c.x < -60) { c.x = W + 40; c.y = 20 + Math.random() * 50; }
        }

        // Collision
        const dx = DINO_X, dy = s.dinoY;
        for (const o of s.obstacles) {
          const pad = 8;
          if (dx + DINO_W - pad > o.x + pad &&
            dx + pad < o.x + o.w - pad &&
            dy + DINO_H - pad > GROUND_Y - o.h + pad) {
            s.phase = 'dead';
            if (s.score > s.best) s.best = s.score;
            setUi({ phase: 'dead', score: s.score, best: s.best });
          }
        }

        if (s.frame % 6 === 0) setUi(u => u.phase === 'playing' ? { ...u, score: s.score } : u);
      }

      // Draw
      // Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
      skyGrad.addColorStop(0, '#87CEEB');
      skyGrad.addColorStop(1, '#D4EDFF');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // Clouds
      for (const c of st.current.clouds) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath(); ctx.ellipse(c.x, c.y, 30, 14, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(c.x + 20, c.y - 6, 20, 11, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(c.x - 18, c.y - 4, 16, 10, 0, 0, Math.PI * 2); ctx.fill();
      }

      // Ground
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
      ctx.fillStyle = '#6B8E4E';
      ctx.fillRect(0, GROUND_Y, W, 6);

      // Dino (emoji-based)
      ctx.font = `${DINO_H - 4}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const dinoEmoji = st.current.phase === 'dead' ? '😵' : (st.current.frame % 12 < 6 ? '🦖' : '🦕');
      ctx.fillText(dinoEmoji, DINO_X + DINO_W / 2, st.current.dinoY + DINO_H + 2);

      // Obstacles
      for (const o of st.current.obstacles) {
        ctx.font = `${o.h}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(o.emoji, o.x + o.w / 2, GROUND_Y + 4);
      }

      // Score
      ctx.fillStyle = '#555';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText(`${st.current.score}`, W - 12, 10);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [jump]);

  const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    jump();
  }, [jump]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-4 text-center">
          <div><p className="text-2xl font-black text-amber-700">{ui.score}</p><p className="text-xs text-amber-500">מפגש</p></div>
          <div><p className="text-2xl font-black text-gray-600">{ui.best}</p><p className="text-xs text-gray-400">שיא</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleTap}
          onTouchStart={handleTap}
          className="rounded-3xl shadow-2xl cursor-pointer border-4 border-amber-300"
          style={{ touchAction: 'none', maxWidth: '100%' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/35">
            <div className="bg-white rounded-3xl p-6 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">🦖</div>
              <h1 className="text-2xl font-black text-amber-700 mb-1">דינוזאור קופץ</h1>
              <p className="text-gray-500 text-sm mb-4">הקש כדי לקפוץ מעל המכשולים!</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={handleTap} className="w-full py-3 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/40">
            <div className="bg-white rounded-3xl p-6 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">😵</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">אוי!</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-amber-50 rounded-2xl p-3">
                  <p className="text-2xl font-black text-amber-600">{ui.score}</p>
                  <p className="text-xs text-amber-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-2xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={handleTap} className="w-full py-3 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-amber-600 text-sm font-medium">הקש / לחץ מקש רווח לקפוץ</p>
    </div>
  );
}
