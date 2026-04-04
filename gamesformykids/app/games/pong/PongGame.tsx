'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const W = 360;
const H = 560;
const PAD_W = 70;
const PAD_H = 12;
const BALL_R = 8;
const WIN_SCORE = 7;
const AI_SPEED = 3.5;

type Phase = 'menu' | 'playing' | 'result';

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    playerX: W / 2 - PAD_W / 2,
    aiX: W / 2 - PAD_W / 2,
    ballX: W / 2,
    ballY: H / 2,
    ballVX: 3,
    ballVY: 4,
    playerScore: 0,
    aiScore: 0,
    raf: 0,
    frame: 0,
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number }[],
  });
  const [ui, setUi] = useState<{ phase: Phase; playerScore: number; aiScore: number }>({ phase: 'menu', playerScore: 0, aiScore: 0 });

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.playerX = W / 2 - PAD_W / 2;
    s.aiX = W / 2 - PAD_W / 2;
    s.ballX = W / 2;
    s.ballY = H / 2;
    const angle = (Math.random() - 0.5) * 1.2;
    const spd = 4;
    s.ballVX = Math.sin(angle) * spd;
    s.ballVY = (Math.random() < 0.5 ? 1 : -1) * Math.cos(angle) * spd;
    s.playerScore = 0;
    s.aiScore = 0;
    s.frame = 0;
    s.particles = [];
    setUi({ phase: 'playing', playerScore: 0, aiScore: 0 });
  }, []);

  function serveBall(direction: 1 | -1) {
    const s = st.current;
    const spd = 4 + Math.min(s.playerScore + s.aiScore, 8) * 0.2;
    const angle = (Math.random() - 0.5) * 1.0;
    s.ballX = W / 2;
    s.ballY = H / 2;
    s.ballVX = Math.sin(angle) * spd;
    s.ballVY = direction * Math.cos(angle) * spd;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function addParticles(x: number, y: number, color: string) {
      const s = st.current;
      for (let i = 0; i < 8; i++) {
        s.particles.push({ x, y, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6, life: 1 });
      }
    }

    function loop() {
      const s = st.current;
      s.frame++;

      if (s.phase === 'playing') {
        // Move ball
        s.ballX += s.ballVX;
        s.ballY += s.ballVY;

        // Wall bounce sides
        if (s.ballX - BALL_R <= 0) { s.ballX = BALL_R; s.ballVX = Math.abs(s.ballVX); addParticles(s.ballX, s.ballY, '#60A5FA'); }
        if (s.ballX + BALL_R >= W) { s.ballX = W - BALL_R; s.ballVX = -Math.abs(s.ballVX); addParticles(s.ballX, s.ballY, '#60A5FA'); }

        // AI paddle (top)
        const aiPad_Y = 30;
        const aiCenter = s.aiX + PAD_W / 2;
        if (aiCenter < s.ballX - 2) s.aiX = Math.min(W - PAD_W, s.aiX + AI_SPEED);
        else if (aiCenter > s.ballX + 2) s.aiX = Math.max(0, s.aiX - AI_SPEED);

        // Player paddle hit (bottom)
        const playerPad_Y = H - 45;
        if (s.ballY + BALL_R >= playerPad_Y && s.ballY - BALL_R <= playerPad_Y + PAD_H &&
          s.ballX >= s.playerX && s.ballX <= s.playerX + PAD_W) {
          const rel = (s.ballX - s.playerX) / PAD_W - 0.5;
          const spd = Math.sqrt(s.ballVX ** 2 + s.ballVY ** 2) + 0.1;
          s.ballVX = rel * spd * 2.5;
          s.ballVY = -Math.abs(s.ballVY);
          addParticles(s.ballX, playerPad_Y, '#34D399');
        }

        // AI paddle hit (top)
        if (s.ballY - BALL_R <= aiPad_Y + PAD_H && s.ballY + BALL_R >= aiPad_Y &&
          s.ballX >= s.aiX && s.ballX <= s.aiX + PAD_W) {
          const rel = (s.ballX - s.aiX) / PAD_W - 0.5;
          const spd = Math.sqrt(s.ballVX ** 2 + s.ballVY ** 2) + 0.1;
          s.ballVX = rel * spd * 2.5;
          s.ballVY = Math.abs(s.ballVY);
          addParticles(s.ballX, aiPad_Y + PAD_H, '#F87171');
        }

        // Score
        if (s.ballY + BALL_R > H) {
          s.aiScore++;
          setUi(u => ({ ...u, aiScore: s.aiScore }));
          if (s.aiScore >= WIN_SCORE) { s.phase = 'result'; setUi(u => ({ ...u, phase: 'result' })); }
          else serveBall(-1);
        }
        if (s.ballY - BALL_R < 0) {
          s.playerScore++;
          setUi(u => ({ ...u, playerScore: s.playerScore }));
          if (s.playerScore >= WIN_SCORE) { s.phase = 'result'; setUi(u => ({ ...u, phase: 'result' })); }
          else serveBall(1);
        }

        // Particles
        s.particles = s.particles.filter(p => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= 0.05;
          return p.life > 0;
        });
      }

      // Draw
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, W, H);

      // Center line
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
      ctx.setLineDash([]);

      // Scores
      ctx.textAlign = 'center';
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillText(String(s.aiScore), W / 2, H / 2 - 15);
      ctx.fillText(String(s.playerScore), W / 2, H / 2 + 55);

      // Particles
      for (const p of s.particles) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = '#FCD34D';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // AI paddle (top - red)
      const aiPad_Y = 30;
      const aiGrad = ctx.createLinearGradient(s.aiX, 0, s.aiX + PAD_W, 0);
      aiGrad.addColorStop(0, '#F87171');
      aiGrad.addColorStop(1, '#EF4444');
      ctx.fillStyle = aiGrad;
      ctx.beginPath(); ctx.roundRect(s.aiX, aiPad_Y, PAD_W, PAD_H, 6); ctx.fill();

      // Player paddle (bottom - green)
      const playerPad_Y = H - 45;
      const plGrad = ctx.createLinearGradient(s.playerX, 0, s.playerX + PAD_W, 0);
      plGrad.addColorStop(0, '#34D399');
      plGrad.addColorStop(1, '#10B981');
      ctx.fillStyle = plGrad;
      ctx.beginPath(); ctx.roundRect(s.playerX, playerPad_Y, PAD_W, PAD_H, 6); ctx.fill();

      // Ball glow
      const glow = ctx.createRadialGradient(s.ballX, s.ballY, 0, s.ballX, s.ballY, BALL_R * 3);
      glow.addColorStop(0, 'rgba(255,255,255,0.5)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(s.ballX, s.ballY, BALL_R * 3, 0, Math.PI * 2); ctx.fill();

      // Ball
      ctx.fillStyle = 'white';
      ctx.beginPath(); ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2); ctx.fill();

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  // Mouse/touch paddle
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (st.current.phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    st.current.playerX = Math.max(0, Math.min(W - PAD_W, mx - PAD_W / 2));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.touches[0].clientX - rect.left) * (W / rect.width);
    st.current.playerX = Math.max(0, Math.min(W - PAD_W, mx - PAD_W / 2));
  }, []);

  useEffect(() => {
    let left = false, right = false;
    const interval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (left) s.playerX = Math.max(0, s.playerX - 8);
      if (right) s.playerX = Math.min(W - PAD_W, s.playerX + 8);
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

  const playerWon = ui.playerScore >= WIN_SCORE;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-8 mb-2 text-center">
          <div><p className="text-3xl font-black text-red-400">{ui.aiScore}</p><p className="text-xs text-red-600">מחשב 🤖</p></div>
          <div className="text-white/30 text-2xl font-bold self-center">:</div>
          <div><p className="text-3xl font-black text-green-400">{ui.playerScore}</p><p className="text-xs text-green-600">אתה 🎮</p></div>
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
              <div className="text-5xl mb-2">🏓</div>
              <h1 className="text-3xl font-black text-slate-700 mb-1">פונג</h1>
              <p className="text-gray-500 text-sm mb-5">הזז את המחבט הירוק<br />הגע ל-{WIN_SCORE} נקודות לפני המחשב!</p>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-slate-600 to-slate-800 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'result' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">{playerWon ? '🏆' : '😢'}</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">{playerWon ? 'ניצחת!' : 'המחשב ניצח!'}</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-green-500">{ui.playerScore}</p>
                  <p className="text-xs text-green-400">אתה</p>
                </div>
                <div className="bg-red-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-red-400">{ui.aiScore}</p>
                  <p className="text-xs text-red-400">מחשב</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-slate-600 to-slate-800 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-4">
          <button onPointerDown={() => { const s = st.current; s.playerX = Math.max(0, s.playerX - 45); }} className="bg-slate-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-slate-500 touch-none">◀</button>
          <button onPointerDown={() => { const s = st.current; s.playerX = Math.min(W - PAD_W, s.playerX + 45); }} className="bg-slate-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-slate-500 touch-none">▶</button>
        </div>
      )}
    </div>
  );
}
