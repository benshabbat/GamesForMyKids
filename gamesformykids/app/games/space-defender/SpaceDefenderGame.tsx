'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const W = 360;
const H = 560;
const SHIP_W = 40;
const SHIP_H = 40;
const BULLET_SPEED = 8;
const BULLET_R = 5;
const ASTEROID_EMOJIS = ['☄️', '🪨', '💫'];
const GAME_DURATION = 60;

type Phase = 'menu' | 'playing' | 'result';

interface Bullet { id: number; x: number; y: number; }
interface Asteroid { id: number; x: number; y: number; speed: number; r: number; emoji: string; angle: number; spin: number; }

let uid = 0;

export default function SpaceDefenderGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    shipX: W / 2,
    bullets: [] as Bullet[],
    asteroids: [] as Asteroid[],
    score: 0,
    lives: 3,
    timeLeft: GAME_DURATION,
    frame: 0,
    raf: 0,
    nextAsteroid: 60,
    best: 0,
    stars: Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.5 + Math.random() * 2,
      twinkle: Math.random() * Math.PI * 2,
    })),
    lastShot: 0,
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; lives: number; timeLeft: number; best: number }>(
    { phase: 'menu', score: 0, lives: 3, timeLeft: GAME_DURATION, best: 0 }
  );

  const shoot = useCallback(() => {
    const s = st.current;
    if (s.phase !== 'playing') return;
    const now = s.frame;
    if (now - s.lastShot < 12) return; // cooldown
    s.lastShot = now;
    s.bullets.push({ id: uid++, x: s.shipX, y: H - 80 });
  }, []);

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.shipX = W / 2;
    s.bullets = [];
    s.asteroids = [];
    s.score = 0;
    s.lives = 3;
    s.timeLeft = GAME_DURATION;
    s.frame = 0;
    s.nextAsteroid = 60;
    s.lastShot = 0;
    setUi({ phase: 'playing', score: 0, lives: 3, timeLeft: GAME_DURATION, best: s.best });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let lastTime = performance.now();

    function loop(now: number) {
      const s = st.current;
      const dt = now - lastTime;
      lastTime = now;

      if (s.phase === 'playing') {
        s.frame++;
        s.timeLeft -= dt / 1000;

        if (s.timeLeft <= 0) {
          s.timeLeft = 0;
          s.phase = 'result';
          if (s.score > s.best) s.best = s.score;
          setUi({ phase: 'result', score: s.score, lives: s.lives, timeLeft: 0, best: s.best });
        }

        // Spawn asteroids
        s.nextAsteroid--;
        if (s.nextAsteroid <= 0) {
          const r = 16 + Math.random() * 20;
          s.asteroids.push({
            id: uid++,
            x: r + Math.random() * (W - r * 2),
            y: -r,
            speed: 1.5 + Math.random() * 2 + s.score / 500,
            r,
            emoji: ASTEROID_EMOJIS[Math.floor(Math.random() * ASTEROID_EMOJIS.length)],
            angle: 0,
            spin: (Math.random() - 0.5) * 0.06,
          });
          s.nextAsteroid = Math.max(20, 55 - Math.floor(s.score / 100) * 3);
        }

        // Move bullets
        s.bullets = s.bullets.filter(b => { b.y -= BULLET_SPEED; return b.y > -10; });

        // Move asteroids
        for (const a of s.asteroids) {
          a.y += a.speed;
          a.angle += a.spin;
        }

        // Bullet-asteroid collisions
        const toRemoveBullets = new Set<number>();
        const toRemoveAsteroids = new Set<number>();
        for (const b of s.bullets) {
          for (const a of s.asteroids) {
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            if (Math.sqrt(dx * dx + dy * dy) < a.r + BULLET_R) {
              toRemoveBullets.add(b.id);
              toRemoveAsteroids.add(a.id);
              s.score += 10;
              setUi(u => ({ ...u, score: s.score }));
            }
          }
        }
        s.bullets = s.bullets.filter(b => !toRemoveBullets.has(b.id));
        s.asteroids = s.asteroids.filter(a => !toRemoveAsteroids.has(a.id));

        // Asteroid hits ship or bottom
        const shipY = H - 80;
        s.asteroids = s.asteroids.filter(a => {
          if (a.y + a.r > H) {
            s.lives--;
            if (s.lives <= 0) {
              s.lives = 0;
              s.phase = 'result';
              if (s.score > s.best) s.best = s.score;
              setUi({ phase: 'result', score: s.score, lives: 0, timeLeft: Math.ceil(s.timeLeft), best: s.best });
            } else {
              setUi(u => ({ ...u, lives: s.lives }));
            }
            return false;
          }
          // Ship collision
          if (Math.abs(a.x - s.shipX) < SHIP_W / 2 + a.r && Math.abs(a.y - shipY) < SHIP_H / 2 + a.r) {
            s.lives--;
            if (s.lives <= 0) {
              s.lives = 0;
              s.phase = 'result';
              if (s.score > s.best) s.best = s.score;
              setUi({ phase: 'result', score: s.score, lives: 0, timeLeft: Math.ceil(s.timeLeft), best: s.best });
            } else {
              setUi(u => ({ ...u, lives: s.lives }));
            }
            return false;
          }
          return true;
        });

        if (s.frame % 20 === 0) {
          setUi(u => u.phase === 'playing' ? { ...u, timeLeft: Math.ceil(s.timeLeft) } : u);
        }
      }

      // Draw
      ctx.fillStyle = '#050514';
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (const star of s.stars) {
        const alpha = 0.4 + Math.sin(s.frame * 0.03 + star.twinkle) * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,220,${alpha})`;
        ctx.fill();
      }

      const curr = st.current;

      // Bullets
      for (const b of curr.bullets) {
        const grad = ctx.createLinearGradient(b.x, b.y - 14, b.x, b.y + 4);
        grad.addColorStop(0, '#FFD700');
        grad.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(b.x, b.y - 7, BULLET_R, 14, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Asteroids
      ctx.font = 'serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const a of curr.asteroids) {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.angle);
        ctx.font = `${a.r * 1.8}px serif`;
        ctx.fillText(a.emoji, 0, 0);
        ctx.restore();
      }

      // Ship
      const sx = curr.shipX;
      const sy = H - 80;
      ctx.save();
      ctx.translate(sx, sy);
      // Thruster glow
      if (curr.phase === 'playing') {
        const thrustGrad = ctx.createRadialGradient(0, SHIP_H / 2 + 6, 0, 0, SHIP_H / 2 + 6, 18);
        thrustGrad.addColorStop(0, 'rgba(255,140,0,0.9)');
        thrustGrad.addColorStop(0.5, 'rgba(255,60,0,0.5)');
        thrustGrad.addColorStop(1, 'rgba(255,0,0,0)');
        ctx.fillStyle = thrustGrad;
        const flicker = curr.frame % 4 < 2 ? 14 : 10;
        ctx.beginPath();
        ctx.ellipse(0, SHIP_H / 2 + flicker / 2, 8, flicker, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // Ship body
      ctx.fillStyle = '#4FC3F7';
      ctx.beginPath();
      ctx.moveTo(0, -SHIP_H / 2);
      ctx.lineTo(SHIP_W / 2, SHIP_H / 2);
      ctx.lineTo(-SHIP_W / 2, SHIP_H / 2);
      ctx.closePath();
      ctx.fill();
      // Cockpit
      ctx.fillStyle = '#B3E5FC';
      ctx.beginPath();
      ctx.ellipse(0, -4, 9, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      // Wings
      ctx.fillStyle = '#0288D1';
      ctx.beginPath();
      ctx.moveTo(SHIP_W / 2, SHIP_H / 2);
      ctx.lineTo(SHIP_W / 2 + 14, SHIP_H / 2 + 6);
      ctx.lineTo(SHIP_W / 3, 4);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-SHIP_W / 2, SHIP_H / 2);
      ctx.lineTo(-SHIP_W / 2 - 14, SHIP_H / 2 + 6);
      ctx.lineTo(-SHIP_W / 3, 4);
      ctx.fill();
      ctx.restore();

      // Earth at bottom strip
      ctx.fillStyle = 'rgba(30,100,50,0.3)';
      ctx.fillRect(0, H - 18, W, 18);
      ctx.fillStyle = 'rgba(50,150,80,0.5)';
      ctx.fillRect(0, H - 10, W, 10);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  // Mouse/touch move for ship
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    st.current.shipX = Math.max(SHIP_W / 2, Math.min(W - SHIP_W / 2, (e.clientX - rect.left) * scaleX));
  }, []);

  const handleCanvasClick = useCallback(() => {
    const s = st.current;
    if (s.phase === 'playing') { shoot(); return; }
    if (s.phase === 'menu') startGame();
  }, [shoot, startGame]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    st.current.shipX = Math.max(SHIP_W / 2, Math.min(W - SHIP_W / 2, (e.touches[0].clientX - rect.left) * scaleX));
    shoot();
  }, [shoot]);

  // Keyboard
  useEffect(() => {
    let leftDown = false, rightDown = false;
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') leftDown = true;
      if (e.key === 'ArrowRight') rightDown = true;
      if (e.code === 'Space') { e.preventDefault(); shoot(); }
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') leftDown = false;
      if (e.key === 'ArrowRight') rightDown = false;
    };
    const moveInterval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (leftDown) s.shipX = Math.max(SHIP_W / 2, s.shipX - 5);
      if (rightDown) s.shipX = Math.min(W - SHIP_W / 2, s.shipX + 5);
    }, 16);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      clearInterval(moveInterval);
    };
  }, [shoot]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-5 mb-2 text-white text-center">
          <div><p className="text-2xl font-black text-yellow-300">{ui.score}</p><p className="text-xs text-yellow-500">ניקוד</p></div>
          <div><p className="text-2xl font-black text-red-300">{'❤️'.repeat(Math.max(0, ui.lives))}</p><p className="text-xs text-red-400">חיים</p></div>
          <div><p className="text-2xl font-black text-blue-200">{ui.timeLeft}s</p><p className="text-xs text-blue-400">זמן</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          onTouchMove={handleTouchMove}
          onTouchStart={(e) => { e.preventDefault(); if (st.current.phase !== 'playing') startGame(); }}
          className="rounded-3xl shadow-2xl border-4 border-indigo-700 cursor-crosshair"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/60">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🚀</div>
              <h1 className="text-2xl font-black text-indigo-700 mb-1">מגן החלל</h1>
              <p className="text-gray-500 text-sm mb-5">הזז את הספינה וירה באסטרואידים!<br />הגן על כדור הארץ 🌍</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-indigo-500 to-blue-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'result' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/60">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">{ui.lives === 0 ? '💥' : '🎉'}</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">{ui.lives === 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-indigo-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-indigo-600">{ui.score}</p>
                  <p className="text-xs text-indigo-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-indigo-500 to-blue-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-3">
          <button
            onPointerDown={() => { const s = st.current; s.shipX = Math.max(SHIP_W / 2, s.shipX - 40); }}
            className="bg-indigo-700/80 text-white rounded-xl px-6 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          >◀</button>
          <button
            onPointerDown={shoot}
            className="bg-yellow-500/90 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-yellow-400 touch-none"
          >💥 ירה!</button>
          <button
            onPointerDown={() => { const s = st.current; s.shipX = Math.min(W - SHIP_W / 2, s.shipX + 40); }}
            className="bg-indigo-700/80 text-white rounded-xl px-6 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          >▶</button>
        </div>
      )}
    </div>
  );
}
