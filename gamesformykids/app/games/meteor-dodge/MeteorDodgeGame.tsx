'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const W = 360;
const H = 560;
const PLAYER_R = 18;
const PLAYER_Y = H - 70;
const METEOR_EMOJIS = ['☄️', '🪨', '💫', '⚡'];
const STAR_EMOJIS = ['⭐', '🌟', '💎'];

type Phase = 'menu' | 'playing' | 'dead';

interface Meteor { id: number; x: number; y: number; r: number; speed: number; emoji: string; spin: number; angle: number; }
interface StarPick { id: number; x: number; y: number; vy: number; emoji: string; }

let uid = 0;

export default function MeteorDodgeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    playerX: W / 2,
    meteors: [] as Meteor[],
    stars: [] as StarPick[],
    score: 0,
    best: 0,
    frame: 0,
    raf: 0,
    nextMeteor: 50,
    nextStar: 120,
    bgStars: Array.from({ length: 50 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.5,
      twinkle: Math.random() * Math.PI * 2,
    })),
    invincible: 0,
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; best: number }>({ phase: 'menu', score: 0, best: 0 });

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.playerX = W / 2;
    s.meteors = [];
    s.stars = [];
    s.score = 0;
    s.frame = 0;
    s.nextMeteor = 50;
    s.nextStar = 120;
    s.invincible = 0;
    setUi({ phase: 'playing', score: 0, best: s.best });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function loop() {
      const s = st.current;

      if (s.phase === 'playing') {
        s.frame++;
        s.score = Math.floor(s.frame / 4);
        if (s.invincible > 0) s.invincible--;

        const difficulty = 1 + Math.floor(s.score / 100) * 0.3;

        // Spawn meteor
        s.nextMeteor--;
        if (s.nextMeteor <= 0) {
          const r = 14 + Math.random() * 20;
          s.meteors.push({
            id: uid++,
            x: r + Math.random() * (W - r * 2),
            y: -r,
            r,
            speed: (1.8 + Math.random() * 2) * difficulty,
            emoji: METEOR_EMOJIS[Math.floor(Math.random() * METEOR_EMOJIS.length)],
            spin: (Math.random() - 0.5) * 0.1,
            angle: 0,
          });
          s.nextMeteor = Math.max(15, Math.floor((50 - s.score / 20)));
        }

        // Spawn star pickup
        s.nextStar--;
        if (s.nextStar <= 0) {
          s.stars.push({
            id: uid++,
            x: 20 + Math.random() * (W - 40),
            y: -20,
            vy: 1.5 + Math.random(),
            emoji: STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)],
          });
          s.nextStar = 100 + Math.random() * 100;
        }

        // Move meteors
        for (const m of s.meteors) { m.y += m.speed; m.angle += m.spin; }
        s.meteors = s.meteors.filter(m => m.y - m.r < H + 10);

        // Move stars
        for (const st2 of s.stars) st2.y += st2.vy;
        s.stars = s.stars.filter(st2 => st2.y < H + 20);

        // Collect stars
        s.stars = s.stars.filter(st2 => {
          const dx = st2.x - s.playerX;
          const dy = st2.y - PLAYER_Y;
          if (Math.sqrt(dx * dx + dy * dy) < PLAYER_R + 16) {
            s.score += 50;
            setUi(u => ({ ...u, score: s.score }));
            return false;
          }
          return true;
        });

        // Collision with meteors
        if (s.invincible === 0) {
          for (const m of s.meteors) {
            const dx = m.x - s.playerX;
            const dy = m.y - PLAYER_Y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < PLAYER_R + m.r - 8) {
              s.phase = 'dead';
              if (s.score > s.best) s.best = s.score;
              setUi({ phase: 'dead', score: s.score, best: s.best });
              break;
            }
          }
        }

        if (s.frame % 8 === 0) setUi(u => u.phase === 'playing' ? { ...u, score: s.score } : u);
      }

      // Draw background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, W, H);

      // Background stars
      const curr = st.current;
      for (const star of curr.bgStars) {
        const alpha = 0.3 + Math.sin(curr.frame * 0.02 + star.twinkle) * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,230,${alpha})`;
        ctx.fill();
      }

      // Nebula effect
      const neb = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, 180);
      neb.addColorStop(0, 'rgba(99,0,150,0.08)');
      neb.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, W, H);

      // Star pickups
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const st2 of curr.stars) {
        const glow = ctx.createRadialGradient(st2.x, st2.y, 0, st2.x, st2.y, 22);
        glow.addColorStop(0, 'rgba(255,220,0,0.4)');
        glow.addColorStop(1, 'rgba(255,220,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(st2.x, st2.y, 22, 0, Math.PI * 2); ctx.fill();
        ctx.fillText(st2.emoji, st2.x, st2.y);
      }

      // Meteors
      for (const m of curr.meteors) {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.angle);
        ctx.font = `${m.r * 1.8}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(m.emoji, 0, 0);
        ctx.restore();
      }

      // Player
      const blink = curr.invincible > 0 && curr.frame % 6 < 3;
      if (!blink) {
        const glow = ctx.createRadialGradient(curr.playerX, PLAYER_Y, 0, curr.playerX, PLAYER_Y, PLAYER_R * 2);
        glow.addColorStop(0, 'rgba(200,150,255,0.5)');
        glow.addColorStop(1, 'rgba(150,50,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(curr.playerX, PLAYER_Y, PLAYER_R * 2, 0, Math.PI * 2); ctx.fill();

        ctx.font = `${PLAYER_R * 2}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🚀', curr.playerX, PLAYER_Y);
      }

      // Score
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'right';
      ctx.fillText(`${curr.score}`, W - 12, 28);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  // Controls
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (st.current.phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    st.current.playerX = Math.max(PLAYER_R, Math.min(W - PLAYER_R, (e.clientX - rect.left) * (W / rect.width)));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    st.current.playerX = Math.max(PLAYER_R, Math.min(W - PLAYER_R, (e.touches[0].clientX - rect.left) * (W / rect.width)));
  }, []);

  useEffect(() => {
    let left = false, right = false;
    const interval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (left) s.playerX = Math.max(PLAYER_R, s.playerX - 7);
      if (right) s.playerX = Math.min(W - PLAYER_R, s.playerX + 7);
    }, 16);
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') left = true;
      if (e.key === 'ArrowRight') right = true;
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') left = false;
      if (e.key === 'ArrowRight') right = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { clearInterval(interval); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-2 text-white text-center">
          <div><p className="text-2xl font-black text-yellow-300">{ui.score}</p><p className="text-xs text-yellow-500">ניקוד</p></div>
          <div><p className="text-2xl font-black text-gray-400">{ui.best}</p><p className="text-xs text-gray-500">שיא</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={() => { if (st.current.phase === 'menu') startGame(); }}
          onTouchStart={(e) => { e.preventDefault(); if (st.current.phase === 'menu') startGame(); handleTouchMove(e); }}
          className="rounded-3xl shadow-2xl border-4 border-slate-700 cursor-none"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">☄️</div>
              <h1 className="text-2xl font-black text-slate-700 mb-1">התחמק ממטאורים</h1>
              <p className="text-gray-500 text-sm mb-5">הזז את הספינה 🚀 והימנע ממטאורים<br />אסוף כוכבים ⭐ לנקודות בונוס!</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-violet-600 to-purple-700 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">💥</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">הוכית!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-violet-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-violet-600">{ui.score}</p>
                  <p className="text-xs text-violet-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-violet-600 to-purple-700 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-4">
          <button onPointerDown={() => { const s = st.current; s.playerX = Math.max(PLAYER_R, s.playerX - 45); }} className="bg-violet-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-violet-500 touch-none">◀</button>
          <button onPointerDown={() => { const s = st.current; s.playerX = Math.min(W - PLAYER_R, s.playerX + 45); }} className="bg-violet-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-violet-500 touch-none">▶</button>
        </div>
      )}
    </div>
  );
}
