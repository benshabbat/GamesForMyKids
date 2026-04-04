'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const GAME_DURATION = 40;
const BALLOON_COLORS = [
  ['#EF4444', '#B91C1C'],
  ['#F97316', '#C2410C'],
  ['#EAB308', '#A16207'],
  ['#22C55E', '#15803D'],
  ['#3B82F6', '#1D4ED8'],
  ['#EC4899', '#BE185D'],
  ['#8B5CF6', '#6D28D9'],
  ['#14B8A6', '#0F766E'],
];
const BOMB_CHANCE = 0.12;

type Phase = 'menu' | 'playing' | 'result';

interface Balloon {
  id: number;
  x: number;
  y: number;
  r: number;
  vy: number;
  color: [string, string];
  isBomb: boolean;
  popped: boolean;
  popAnim: number;
}

let uid = 0;

function makeBalloon(w: number, h: number): Balloon {
  const isBomb = Math.random() < BOMB_CHANCE;
  return {
    id: uid++,
    x: 30 + Math.random() * (w - 60),
    y: h + 40,
    r: 22 + Math.random() * 18,
    vy: -(0.8 + Math.random() * 1.2),
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    isBomb,
    popped: false,
    popAnim: 0,
  };
}

export default function BalloonPopGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const phaseRef = useRef<Phase>('menu');
  const scoreRef = useRef(0);
  const livesRef = useRef(5);
  const balloonsRef = useRef<Balloon[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animRef = useRef<ReturnType<typeof requestAnimationFrame>>(0);
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const W = useRef(350);
  const H = useRef(560);

  useEffect(() => {
    if (containerRef.current) {
      W.current = containerRef.current.offsetWidth || 350;
      H.current = containerRef.current.offsetHeight || 560;
    }
  }, []);

  const endGame = useCallback((reason: 'time' | 'lives') => {
    phaseRef.current = 'result';
    setPhase('result');
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    cancelAnimationFrame(animRef.current);
    setBest(b => Math.max(b, scoreRef.current));
  }, []);

  const spawnBalloon = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    const b = makeBalloon(W.current, H.current);
    balloonsRef.current = [...balloonsRef.current, b];
    setBalloons([...balloonsRef.current]);
    const delay = Math.max(500, 1200 - frameRef.current * 2);
    spawnRef.current = setTimeout(spawnBalloon, delay);
  }, []);

  const animate = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    frameRef.current++;
    let needsUpdate = false;
    const escaped: number[] = [];
    balloonsRef.current = balloonsRef.current.map(b => {
      if (b.popped) {
        if (b.popAnim < 1) { needsUpdate = true; return { ...b, popAnim: b.popAnim + 0.1 }; }
        return b;
      }
      const ny = b.y + b.vy;
      if (ny + b.r < 0 && !b.isBomb) { escaped.push(b.id); needsUpdate = true; }
      needsUpdate = true;
      return { ...b, y: ny };
    }).filter(b => {
      if (b.popped && b.popAnim >= 1) return false;
      if (escaped.includes(b.id)) return false;
      return true;
    });

    if (escaped.length > 0) {
      livesRef.current = Math.max(0, livesRef.current - escaped.length);
      setLives(livesRef.current);
      if (livesRef.current <= 0) { endGame('lives'); return; }
    }

    if (needsUpdate) setBalloons([...balloonsRef.current]);
    animRef.current = requestAnimationFrame(animate);
  }, [endGame]);

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    cancelAnimationFrame(animRef.current);
    balloonsRef.current = [];
    scoreRef.current = 0;
    livesRef.current = 5;
    frameRef.current = 0;
    phaseRef.current = 'playing';
    setPhase('playing');
    setScore(0);
    setLives(5);
    setTimeLeft(GAME_DURATION);
    setBalloons([]);

    let t = GAME_DURATION;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) { endGame('time'); }
    }, 1000);

    spawnRef.current = setTimeout(spawnBalloon, 600);
    animRef.current = requestAnimationFrame(animate);
  }, [animate, endGame, spawnBalloon]);

  const pop = useCallback((id: number) => {
    if (phaseRef.current !== 'playing') return;
    const b = balloonsRef.current.find(b => b.id === id);
    if (!b || b.popped) return;
    if (b.isBomb) {
      livesRef.current = Math.max(0, livesRef.current - 2);
      setLives(livesRef.current);
      balloonsRef.current = balloonsRef.current.map(x => x.id === id ? { ...x, popped: true } : x);
      setBalloons([...balloonsRef.current]);
      if (livesRef.current <= 0) endGame('lives');
    } else {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      balloonsRef.current = balloonsRef.current.map(x => x.id === id ? { ...x, popped: true } : x);
      setBalloons([...balloonsRef.current]);
    }
  }, [endGame]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    cancelAnimationFrame(animRef.current);
  }, []);

  const pct = (timeLeft / GAME_DURATION) * 100;

  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <div className="text-7xl mb-4 flex justify-center gap-1">🎈🎈🎈</div>
        <h1 className="text-4xl font-black text-white drop-shadow-lg mb-2">פוצץ בלונים!</h1>
        <p className="text-white/80 mb-6">הקש על בלונים לפני שהם עפים<br />הימנע מפצצות 💣</p>
        {best > 0 && <p className="text-yellow-200 font-bold mb-4">🏆 שיא: {best}</p>}
        <button onClick={startGame} className="px-12 py-5 rounded-2xl bg-gradient-to-l from-pink-500 to-rose-500 text-white font-black text-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🎈 התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'result') return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-3">{lives <= 0 ? '💔' : '🎉'}</div>
        <h2 className="text-3xl font-black text-gray-800 mb-5">{lives <= 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-pink-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-pink-500">{score}</p>
            <p className="text-xs text-pink-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-pink-500 to-rose-500 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
          🔄 שוב!
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex flex-col items-center select-none" dir="rtl">
      {/* HUD */}
      <div className="flex items-center gap-4 p-4 w-full max-w-sm">
        <div className="text-center">
          <p className="text-2xl font-black text-white">{score}</p>
          <p className="text-xs text-white/70">ניקוד</p>
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-white/30 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ${pct > 50 ? 'bg-green-400' : pct > 25 ? 'bg-yellow-300' : 'bg-red-400'}`} style={{ width: `${pct}%` }} />
          </div>
          <p className="text-center text-xs text-white/80">{timeLeft}s</p>
        </div>
        <div className="text-center">
          <p className="text-lg">{Array(Math.max(0, lives)).fill('❤️').join('')}</p>
          <p className="text-xs text-white/70">חיים</p>
        </div>
      </div>

      {/* Game area */}
      <div ref={containerRef} className="flex-1 w-full max-w-sm relative overflow-hidden" style={{ minHeight: 480 }}>
        {balloons.map(b => {
          if (b.popped) {
            return (
              <div key={b.id} className="absolute pointer-events-none flex items-center justify-center text-2xl"
                style={{ left: b.x - b.r, top: b.y - b.r, width: b.r * 2, height: b.r * 2, opacity: 1 - b.popAnim, transform: `scale(${1 + b.popAnim})` }}>
                {b.isBomb ? '💥' : '✨'}
              </div>
            );
          }
          return (
            <button key={b.id}
              onClick={() => pop(b.id)}
              className="absolute rounded-full flex items-center justify-center font-black text-white cursor-pointer active:scale-90 transition-transform shadow-lg"
              style={{
                left: b.x - b.r, top: b.y - b.r,
                width: b.r * 2, height: b.r * 2,
                background: b.isBomb ? '#1f2937' : `radial-gradient(circle at 35% 35%, ${b.color[0]}, ${b.color[1]})`,
                fontSize: b.r * 0.8,
              }}>
              {b.isBomb ? '💣' : ''}
              {/* String */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-600/50" style={{ height: b.r * 0.7, top: '100%' }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
