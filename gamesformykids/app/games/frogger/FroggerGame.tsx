'use client';
import { useEffect, useRef, useCallback, useState } from 'react';

const CELL = 40;
const COLS = 9;
const ROWS = 9; // 0=goal, 1-3=upper road, 4=median, 5-7=lower road, 8=start
const W = COLS * CELL; // 360
const H = ROWS * CELL; // 360

type Phase = 'menu' | 'playing' | 'dead';


// row, speed (neg=left), emoji, color
const LANE_CFG = [
  { row: 1, speed: -1.3, emoji: '🚑', color: '#ef4444' },
  { row: 2, speed:  1.6, emoji: '🚗', color: '#3b82f6' },
  { row: 3, speed: -2.1, emoji: '🚕', color: '#f97316' },
  { row: 5, speed:  1.9, emoji: '🚌', color: '#8b5cf6' },
  { row: 6, speed: -1.4, emoji: '🚙', color: '#06b6d4' },
  { row: 7, speed:  2.3, emoji: '🏎️', color: '#ec4899' },
];

const CAR_W = CELL * 1.7;

export default function FroggerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    fCol: 4, fRow: 8,   // frog position
    lives: 3, score: 0, best: 0, level: 1,
    frame: 0, raf: 0,
    dead: false, deadTimer: 0,
    lanes: LANE_CFG.map(cfg => ({
      ...cfg,
      cars: Array.from({ length: 3 }, (_, i) => ({
        x: i * (W / 3) + (cfg.speed > 0 ? -CAR_W : 0),
        speed: cfg.speed, emoji: cfg.emoji, color: cfg.color,
      })),
    })),
  });
  const [ui, setUi] = useState({ phase: 'menu' as Phase, lives: 3, score: 0, best: 0 });

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.fCol = 4; s.fRow = 8;
    s.lives = 3; s.score = 0; s.level = 1;
    s.frame = 0; s.dead = false; s.deadTimer = 0;
    s.lanes = LANE_CFG.map(cfg => ({
      ...cfg,
      cars: Array.from({ length: 3 }, (_, i) => ({
        x: i * (W / 3) + (cfg.speed > 0 ? -CAR_W : 0),
        speed: cfg.speed, emoji: cfg.emoji, color: cfg.color,
      })),
    }));
    setUi({ phase: 'playing', lives: 3, score: 0, best: s.best });
  }, []);

  const moveFrog = useCallback((dc: number, dr: number) => {
    const s = st.current;
    if (s.phase !== 'playing' || s.dead) return;
    const nc = Math.max(0, Math.min(COLS - 1, s.fCol + dc));
    const nr = Math.max(0, Math.min(8, s.fRow + dr));
    if (dr < 0) s.score += 2; // moving up
    s.fCol = nc; s.fRow = nr;
    if (nr === 0) {
      s.score += 30; s.level++;
      s.fCol = 4; s.fRow = 8;
      setUi(u => ({ ...u, score: s.score }));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function loop() {
      const s = st.current;
      s.frame++;

      if (s.phase === 'playing') {
        const mul = 1 + (s.level - 1) * 0.18;

        if (s.dead) {
          s.deadTimer--;
          if (s.deadTimer <= 0) s.dead = false;
        } else {
          // Move cars
          for (const lane of s.lanes) {
            for (const car of lane.cars) {
              car.x += lane.speed * mul;
              if (lane.speed > 0 && car.x > W + 5) car.x -= W + CAR_W * 3.5;
              if (lane.speed < 0 && car.x + CAR_W < -5) car.x += W + CAR_W * 3.5;
            }
          }

          // Collision check
          const fx = s.fCol * CELL + CELL / 2;
          const fy = s.fRow * CELL + CELL / 2;
          for (const lane of s.lanes) {
            if (Math.abs(fy - (lane.row * CELL + CELL / 2)) > CELL * 0.45) continue;
            for (const car of lane.cars) {
              const cx = car.x + CAR_W / 2;
              if (Math.abs(fx - cx) < CAR_W / 2 - 4) {
                s.lives--;
                s.dead = true;
                s.deadTimer = 55;
                s.fCol = 4; s.fRow = 8;
                if (s.lives <= 0) {
                  s.phase = 'dead';
                  if (s.score > s.best) s.best = s.score;
                  setUi({ phase: 'dead', lives: 0, score: s.score, best: s.best });
                }
              }
            }
          }
        }
      }

      // ── Draw ──────────────────────────────────────────
      for (let row = 0; row < ROWS; row++) {
        // Row color
        if (row === 0)      ctx.fillStyle = '#14532d'; // goal
        else if (row === 4) ctx.fillStyle = '#4b5563'; // median
        else if (row === 8) ctx.fillStyle = '#166534'; // start
        else                ctx.fillStyle = '#374151'; // road
        ctx.fillRect(0, row * CELL, W, CELL);

        // Road dashes
        if ((row >= 1 && row <= 3) || (row >= 5 && row <= 7)) {
          ctx.fillStyle = 'rgba(255,220,0,0.2)';
          for (let c = 0; c < COLS; c++) {
            ctx.fillRect(c * CELL + CELL / 2 - 2, row * CELL + CELL / 2 - 7, 4, 14);
          }
        }
      }

      // Goal flags
      ctx.font = `${CELL * 0.65}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let c = 1; c < COLS; c += 2) {
        ctx.fillText('🏁', c * CELL + CELL / 2, CELL / 2);
      }

      // Cars
      const s2 = st.current;
      for (const lane of s2.lanes) {
        for (const car of lane.cars) {
          ctx.fillStyle = car.color;
          ctx.beginPath();
          ctx.roundRect(car.x, lane.row * CELL + 5, CAR_W, CELL - 10, 5);
          ctx.fill();
          ctx.font = `${CELL * 0.65}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(car.emoji, car.x + CAR_W / 2, lane.row * CELL + CELL / 2);
        }
      }

      // Frog (blink when dead)
      const blink = s2.dead && s2.frame % 6 < 3;
      if (!blink) {
        ctx.font = `${CELL * 0.75}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🐸', s2.fCol * CELL + CELL / 2, s2.fRow * CELL + CELL / 2);
      }

      // HUD
      ctx.font = 'bold 15px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText(`${s2.score}`, W - 6, 4);

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  // Keyboard
  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'ArrowUp'    || e.key === 'w') moveFrog(0, -1);
      if (e.key === 'ArrowDown'  || e.key === 's') moveFrog(0,  1);
      if (e.key === 'ArrowLeft'  || e.key === 'a') moveFrog(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') moveFrog( 1, 0);
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [moveFrog]);

  // Swipe
  const touchRef = useRef<{x:number;y:number}|null>(null);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {/* Score bar */}
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-2 text-center">
          <div><p className="text-xl font-black text-green-300">{ui.score}</p><p className="text-xs text-green-600">ניקוד</p></div>
          <div className="flex gap-1 items-center">
            {[0,1,2].map(i=><span key={i} className={`text-xl ${i<ui.lives?'':'opacity-20'}`}>❤️</span>)}
          </div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchStart={e => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
          onTouchEnd={e => {
            e.preventDefault();
            if (!touchRef.current) return;
            const dx = e.changedTouches[0].clientX - touchRef.current.x;
            const dy = e.changedTouches[0].clientY - touchRef.current.y;
            touchRef.current = null;
            if (Math.abs(dx) < 12 && Math.abs(dy) < 12) { moveFrog(0, -1); return; }
            if (Math.abs(dx) > Math.abs(dy)) moveFrog(dx > 0 ? 1 : -1, 0);
            else moveFrog(0, dy > 0 ? 1 : -1);
          }}
          className="rounded-2xl shadow-2xl border-2 border-gray-700"
          style={{ touchAction: 'none', maxHeight: '70vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/75">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🐸</div>
              <h1 className="text-2xl font-black text-gray-700 mb-1">צפרדע חוצה</h1>
              <p className="text-gray-500 text-sm mb-5">עזור לצפרדע לחצות את הכביש!<br/>הימנע מהרכבים — הגע לדגלים 🏁</p>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-xl hover:bg-green-600 active:scale-95 transition-all">
                🐸 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/75">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">💀</div>
              <h2 className="text-2xl font-black text-gray-700 mb-3">נגמרו החיים!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-green-600">{ui.score}</p>
                  <p className="text-xs text-green-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-xl hover:bg-green-600 active:scale-95 transition-all">
                🔄 נסה שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 grid grid-cols-3 gap-2" style={{ width: 164 }}>
          <div />
          <button onPointerDown={() => moveFrog(0,-1)} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▲</button>
          <div />
          <button onPointerDown={() => moveFrog(-1,0)} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">◀</button>
          <button onPointerDown={() => moveFrog(0, 1)} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▼</button>
          <button onPointerDown={() => moveFrog( 1,0)} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▶</button>
        </div>
      )}
    </div>
  );
}
