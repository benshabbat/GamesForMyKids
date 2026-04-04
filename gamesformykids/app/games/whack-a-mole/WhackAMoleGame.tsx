'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const GRID = 9; // 3x3
const GAME_DURATION = 30;
const MOLES = ['🐹', '🐭', '🦔', '🐿️'];
const BAD = '💣';

type HoleState = 'empty' | 'mole' | 'bad' | 'hit' | 'miss';
type Phase = 'menu' | 'playing' | 'result';

interface Hole {
  state: HoleState;
  value: string;
  timer: ReturnType<typeof setTimeout> | null;
}

function makeHoles(): Hole[] {
  return Array.from({ length: GRID }, () => ({ state: 'empty', value: '', timer: null }));
}

export default function WhackAMoleGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [holes, setHoles] = useState<HoleState[]>(Array(GRID).fill('empty'));
  const [holeValues, setHoleValues] = useState<string[]>(Array(GRID).fill(''));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [best, setBest] = useState(0);
  const [combo, setCombo] = useState(0);
  const holesRef = useRef<Hole[]>(makeHoles());
  const phaseRef = useRef<Phase>('menu');
  const scoreRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const moleTimers = useRef<(ReturnType<typeof setTimeout> | null)[]>(Array(GRID).fill(null));
  const moleSpawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function syncUI() {
    setHoles(holesRef.current.map(h => h.state));
    setHoleValues(holesRef.current.map(h => h.value));
  }

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (moleSpawnRef.current) clearTimeout(moleSpawnRef.current);
    moleTimers.current.forEach(t => t && clearTimeout(t));
    moleTimers.current = Array(GRID).fill(null);
  }, []);

  const spawnMole = useCallback(() => {
    if (phaseRef.current !== 'playing') return;

    // Find empty holes
    const empty = holesRef.current
      .map((h, i) => ({ h, i }))
      .filter(({ h }) => h.state === 'empty')
      .map(({ i }) => i);

    if (empty.length > 0) {
      const idx = empty[Math.floor(Math.random() * empty.length)];
      const isBad = Math.random() < 0.15;
      const val = isBad ? BAD : MOLES[Math.floor(Math.random() * MOLES.length)];
      holesRef.current[idx].state = isBad ? 'bad' : 'mole';
      holesRef.current[idx].value = val;
      syncUI();

      // Auto-hide after random time
      const hideDelay = 800 + Math.random() * 800;
      moleTimers.current[idx] = setTimeout(() => {
        if (holesRef.current[idx].state === 'mole' || holesRef.current[idx].state === 'bad') {
          holesRef.current[idx].state = 'empty';
          holesRef.current[idx].value = '';
          syncUI();
        }
      }, hideDelay);
    }

    // Schedule next spawn
    const nextDelay = 400 + Math.random() * 600;
    moleSpawnRef.current = setTimeout(spawnMole, nextDelay);
  }, []);

  const startGame = useCallback(() => {
    clearAllTimers();
    holesRef.current = makeHoles();
    phaseRef.current = 'playing';
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setCombo(0);
    setPhase('playing');
    syncUI();

    // Game timer
    let t = GAME_DURATION;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) {
        clearAllTimers();
        phaseRef.current = 'result';
        setPhase('result');
        setBest(b => Math.max(b, scoreRef.current));
      }
    }, 1000);

    // Start spawning
    moleSpawnRef.current = setTimeout(spawnMole, 400);
  }, [clearAllTimers, spawnMole]);

  const whack = useCallback((idx: number) => {
    if (phaseRef.current !== 'playing') return;
    const h = holesRef.current[idx];
    if (h.state === 'mole') {
      if (moleTimers.current[idx]) clearTimeout(moleTimers.current[idx]);
      h.state = 'hit';
      scoreRef.current += 10;
      setScore(scoreRef.current);
      setCombo(c => c + 1);
      syncUI();
      setTimeout(() => {
        holesRef.current[idx].state = 'empty';
        holesRef.current[idx].value = '';
        syncUI();
      }, 300);
    } else if (h.state === 'bad') {
      if (moleTimers.current[idx]) clearTimeout(moleTimers.current[idx]);
      h.state = 'miss';
      scoreRef.current = Math.max(0, scoreRef.current - 15);
      setScore(scoreRef.current);
      setCombo(0);
      syncUI();
      setTimeout(() => {
        holesRef.current[idx].state = 'empty';
        holesRef.current[idx].value = '';
        syncUI();
      }, 300);
    }
  }, []);

  useEffect(() => () => clearAllTimers(), [clearAllTimers]);

  const pct = (timeLeft / GAME_DURATION) * 100;
  const bgColor = timeLeft <= 10 ? 'from-red-100 to-rose-200' : 'from-yellow-50 to-amber-100';

  if (phase === 'menu') return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex items-center justify-center p-4`} dir="rtl">
      <div className="max-w-sm w-full text-center">
        <div className="text-7xl mb-4 animate-bounce">🐹</div>
        <h1 className="text-4xl font-black text-amber-800 mb-2">חבט על החפרפרת!</h1>
        <p className="text-amber-600 mb-6">הקש על החפרפרות לפני שהן נעלמות<br />הימנע מהפצצות 💣</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>}
        <button onClick={startGame} className="w-full py-5 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🔨 התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'result') return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-3">🔨</div>
        <h2 className="text-3xl font-black text-gray-800 mb-5">הזמן נגמר!</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-amber-600">{score}</p>
            <p className="text-xs text-amber-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={startGame} className="flex-1 py-4 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={() => { phaseRef.current = 'menu'; setPhase('menu'); }} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">🏠 תפריט</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex flex-col items-center justify-center p-4 select-none`} dir="rtl">
      {/* HUD */}
      <div className="flex items-center gap-4 mb-4 w-full max-w-sm">
        <div className="text-center">
          <p className="text-2xl font-black text-amber-700">{score}</p>
          <p className="text-xs text-amber-500">ניקוד</p>
        </div>
        <div className="flex-1">
          <div className="h-4 bg-white/50 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${pct > 50 ? 'bg-green-400' : pct > 25 ? 'bg-yellow-400' : 'bg-red-400'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-center text-xs text-amber-600 mt-0.5">{timeLeft}s</p>
        </div>
        {combo >= 3 && (
          <div className="bg-orange-400 text-white rounded-xl px-2 py-1 text-center">
            <p className="text-sm font-black">x{combo}</p>
            <p className="text-xs">קומבו!</p>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-sm w-full">
        {holes.map((state, i) => (
          <button
            key={i}
            onClick={() => whack(i)}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg active:scale-90 transition-transform"
            style={{ background: state === 'hit' ? '#FDE68A' : state === 'miss' ? '#FCA5A5' : '#92400e' }}
          >
            {/* Hole */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[55%] bg-black/60 rounded-full absolute bottom-0" />
            </div>
            {/* Character */}
            {(state === 'mole' || state === 'bad') && (
              <div className="absolute inset-0 flex items-end justify-center pb-1 animate-[slideUp_0.15s_ease-out]">
                <span className="text-5xl">{holeValues[i]}</span>
              </div>
            )}
            {state === 'hit' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl animate-bounce">⭐</span>
              </div>
            )}
            {state === 'miss' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">💥</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(60%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
