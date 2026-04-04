'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const W = 360;
const H = 520;
const BASKET_W = 70;
const BASKET_H = 40;
const BASKET_Y = H - 60;
const FRUIT_R = 22;
const GAME_DURATION = 45;

type Phase = 'menu' | 'playing' | 'result';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
  isBad: boolean;
}

const GOOD_FRUITS = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🥝', '🍌', '🍉', '🍐', '🫐'];
const BAD_ITEMS = ['💣', '☠️', '🪨'];

let idCounter = 0;

export default function CatchFruitGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    basketX: W / 2 - BASKET_W / 2,
    items: [] as FallingItem[],
    score: 0,
    lives: 3,
    timeLeft: GAME_DURATION,
    frame: 0,
    raf: 0,
    nextItem: 40,
    best: 0,
    bgStars: Array.from({ length: 8 }, () => ({
      x: Math.random() * W, y: Math.random() * H * 0.7,
      r: 2 + Math.random() * 3,
    })),
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; lives: number; timeLeft: number; best: number }>(
    { phase: 'menu', score: 0, lives: 3, timeLeft: GAME_DURATION, best: 0 }
  );

  const dragging = useRef(false);
  const pointerDown = useRef(false);

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.basketX = W / 2 - BASKET_W / 2;
    s.items = [];
    s.score = 0;
    s.lives = 3;
    s.timeLeft = GAME_DURATION;
    s.frame = 0;
    s.nextItem = 40;
    setUi({ phase: 'playing', score: 0, lives: 3, timeLeft: GAME_DURATION, best: s.best });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // Timer
    let lastTime = performance.now();

    function loop(now: number) {
      const s = st.current;
      const dt = now - lastTime;
      lastTime = now;

      if (s.phase === 'playing') {
        s.frame++;

        // Timer
        s.timeLeft -= dt / 1000;
        if (s.timeLeft <= 0) {
          s.timeLeft = 0;
          s.phase = 'result';
          if (s.score > s.best) s.best = s.score;
          setUi({ phase: 'result', score: s.score, lives: s.lives, timeLeft: 0, best: s.best });
        }

        // Spawn items
        s.nextItem--;
        if (s.nextItem <= 0) {
          const isBad = Math.random() < 0.18;
          const emojis = isBad ? BAD_ITEMS : GOOD_FRUITS;
          s.items.push({
            id: idCounter++,
            x: FRUIT_R + Math.random() * (W - FRUIT_R * 2),
            y: -FRUIT_R,
            speed: 2.5 + Math.random() * 2 + s.frame / 600,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            isBad,
          });
          s.nextItem = 35 + Math.random() * 30;
        }

        // Move items
        for (const item of s.items) item.y += item.speed;

        // Catch  
        const bx = s.basketX;
        s.items = s.items.filter(item => {
          if (item.y + FRUIT_R >= BASKET_Y && item.y - FRUIT_R <= BASKET_Y + BASKET_H &&
            item.x + FRUIT_R > bx && item.x - FRUIT_R < bx + BASKET_W) {
            if (item.isBad) {
              s.lives--;
              if (s.lives <= 0) {
                s.lives = 0;
                s.phase = 'result';
                if (s.score > s.best) s.best = s.score;
                setUi({ phase: 'result', score: s.score, lives: 0, timeLeft: Math.ceil(s.timeLeft), best: s.best });
              }
              setUi(u => ({ ...u, lives: s.lives }));
            } else {
              s.score += 10;
              setUi(u => ({ ...u, score: s.score }));
            }
            return false;
          }
          if (item.y - FRUIT_R > H) return false;
          return true;
        });

        // Update score display
        if (s.frame % 20 === 0) {
          setUi(u => u.phase === 'playing' ? { ...u, timeLeft: Math.ceil(s.timeLeft) } : u);
        }
      }

      // Draw background
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#1a1a2e');
      grad.addColorStop(1, '#16213e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (const star of s.bgStars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,200,${0.4 + Math.sin(s.frame * 0.05 + star.x) * 0.3})`;
        ctx.fill();
      }

      const curr = st.current;
      // Items
      ctx.font = `${FRUIT_R * 1.8}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const item of curr.items) {
        ctx.fillText(item.emoji, item.x, item.y);
      }

      // Basket
      const bx = curr.basketX;
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.moveTo(bx, BASKET_Y);
      ctx.lineTo(bx + 10, BASKET_Y + BASKET_H);
      ctx.lineTo(bx + BASKET_W - 10, BASKET_Y + BASKET_H);
      ctx.lineTo(bx + BASKET_W, BASKET_Y);
      ctx.closePath();
      ctx.fill();
      // Basket stripes
      ctx.strokeStyle = '#6B3410';
      ctx.lineWidth = 2;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(bx + (BASKET_W / 4) * i, BASKET_Y);
        ctx.lineTo(bx + 10 + ((BASKET_W - 20) / 4) * i, BASKET_Y + BASKET_H);
        ctx.stroke();
      }
      // Basket handle
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(bx + BASKET_W / 2, BASKET_Y - 2, BASKET_W / 3, Math.PI, Math.PI * 2);
      ctx.stroke();

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  // Mouse / touch controls
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!pointerDown.current) return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mx = (e.clientX - rect.left) * scaleX;
    st.current.basketX = Math.max(0, Math.min(W - BASKET_W, mx - BASKET_W / 2));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    pointerDown.current = true;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mx = (e.clientX - rect.left) * scaleX;
    st.current.basketX = Math.max(0, Math.min(W - BASKET_W, mx - BASKET_W / 2));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mx = (e.touches[0].clientX - rect.left) * scaleX;
    st.current.basketX = Math.max(0, Math.min(W - BASKET_W, mx - BASKET_W / 2));
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mx = (e.touches[0].clientX - rect.left) * scaleX;
    st.current.basketX = Math.max(0, Math.min(W - BASKET_W, mx - BASKET_W / 2));
    if (st.current.phase !== 'playing') startGame();
  }, [startGame]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-950 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {/* HUD */}
      {ui.phase === 'playing' && (
        <div className="flex gap-5 mb-3 text-white text-center">
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => { pointerDown.current = false; dragging.current = false; }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing border-4 border-purple-700"
          style={{ touchAction: 'none', maxHeight: '80vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/50">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🧺</div>
              <h1 className="text-2xl font-black text-purple-700 mb-1">תפוס פירות!</h1>
              <p className="text-gray-500 text-sm mb-5">הزز את הסל ותפוס פירות<br />הימנע מהפצצות 💣</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'result' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/50">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">{ui.lives === 0 ? '💔' : '🎉'}</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">{ui.lives === 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-purple-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-purple-600">{ui.score}</p>
                  <p className="text-xs text-purple-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
