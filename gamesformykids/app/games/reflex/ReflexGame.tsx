'use client';

import { useReflexGame } from './useReflexGame';
import { GAME_DURATION } from './data/targets';

export default function ReflexGame() {
  const { phase, targets, score, missed, timeLeft, startGame, hitTarget, goMenu } = useReflexGame();

  const timePct = (timeLeft / GAME_DURATION) * 100;

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">⚡</div>
        <h1 className="text-3xl font-bold text-red-800 mb-3">מהירות תגובה</h1>
        <p className="text-red-600 mb-3">לחץ על הסמלים לפני שהם נעלמים!</p>
        <div className="bg-red-100 rounded-2xl p-4 mb-8 text-sm text-red-700 space-y-1 text-right">
          <p>⏱️ {GAME_DURATION} שניות משחק</p>
          <p>⚡ ככל שאוספים יותר — הסמלים מהירים יותר</p>
          <p>❌ סמל שנעלם = פספוס</p>
        </div>
        <button onClick={startGame}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-rose-500 to-red-600 shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🚀 התחל!
        </button>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 select-none" dir="rtl">
      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-3 flex items-center gap-3 z-10">
        <button onClick={goMenu} className="text-white/60 hover:text-white text-sm bg-white/10 rounded-full px-3 py-1 shrink-0">✕ יציאה</button>
        <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timePct > 50 ? 'bg-green-400' : timePct > 25 ? 'bg-yellow-400' : 'bg-red-400'}`}
            style={{ width: `${timePct}%` }} />
        </div>
        <span className="text-white font-bold shrink-0">⏱️ {timeLeft}</span>
        <span className="text-yellow-300 font-bold shrink-0">⭐ {score}</span>
      </div>

      {/* Game area */}
      <div className="relative w-full h-screen overflow-hidden">
        {targets.map(t => (
          <button
            key={t.id}
            onClick={() => hitTarget(t.id)}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
            className="absolute text-5xl transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 active:scale-90 transition-transform animate-pulse drop-shadow-lg"
          >
            {t.emoji}
          </button>
        ))}
        {targets.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-white/40 text-xl">
            מחכה לסמלים...
          </p>
        )}
      </div>
    </div>
  );

  // ── RESULT ──
  const accuracy = score + missed > 0 ? Math.round((score / (score + missed)) * 100) : 0;
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">⚡</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">הסתיים!</h1>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-yellow-50 rounded-2xl p-4">
            <p className="text-3xl font-black text-yellow-600">{score}</p>
            <p className="text-xs text-yellow-500">לחיצות</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-4">
            <p className="text-3xl font-black text-red-500">{missed}</p>
            <p className="text-xs text-red-400">פספוסים</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-3xl font-black text-blue-600">{accuracy}%</p>
            <p className="text-xs text-blue-400">דיוק</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={startGame} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-rose-500 to-red-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">🏠 תפריט</button>
        </div>
      </div>
    </div>
  );
}
