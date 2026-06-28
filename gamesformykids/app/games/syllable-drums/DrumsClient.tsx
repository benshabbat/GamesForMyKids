'use client';
import { useDrumsGame, WORDS_PER_GAME } from './useDrumsGame';

export default function DrumsClient() {
  const {
    phase, currentWord, wordIdx, score, tapFeedback, beatScores, letters,
    feedbackTimerRef, canvasRef, startGame, handleTap,
  } = useDrumsGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-slate-900 to-indigo-900 p-6 text-white" dir="rtl">
        <div className="text-7xl mb-4">🥁</div>
        <h1 className="text-4xl font-bold mb-2">תופים עבריים</h1>
        <p className="text-xl mb-2 text-indigo-200">הקש בזמן הנכון לכל אות!</p>
        <p className="text-sm text-indigo-300 mb-8">הקשב למילה ◉ הקש כשהעיגולים מגיעים לקו</p>
        <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-sm w-full">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">👂</div><div>שמע את המילה</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">⬇️</div><div>עיגולים יורדים</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">👆</div><div>הקש על הקו!</div></div>
          </div>
        </div>
        <div className="flex gap-6 mb-6 text-center text-sm">
          <div><div className="text-green-400 font-bold text-lg">30</div><div className="text-indigo-300">מושלם</div></div>
          <div><div className="text-yellow-400 font-bold text-lg">15</div><div className="text-indigo-300">טוב</div></div>
          <div><div className="text-gray-400 font-bold text-lg">0</div><div className="text-indigo-300">פספסת</div></div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🎮 התחל לתפוף!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / Math.max(1, WORDS_PER_GAME * 3.5 * 30)) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 50 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-slate-900 to-indigo-900 p-6 text-white" dir="rtl">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2">כל הכבוד, מתופף!</h1>
        <p className="text-xl mb-6 text-indigo-200">ניקוד סופי: {score} נקודות</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-indigo-200">נקודות</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-green-400">{WORDS_PER_GAME}</div>
            <div className="text-sm text-indigo-200">מילים</div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col" dir="rtl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 text-white z-10">
        <div className="text-sm text-indigo-300">מילה {wordIdx + 1}/{WORDS_PER_GAME}</div>
        <div className="text-2xl font-bold text-yellow-300">{currentWord}</div>
        <div className="text-lg font-bold text-yellow-400">{score}</div>
      </div>
      <div className="flex justify-center gap-2 px-4 py-2 bg-slate-800/50 z-10">
        {letters.map((l, i) => {
          const s = beatScores[i];
          return (
            <div
              key={i}
              className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-lg border-2 transition-all
                ${s === 'perfect' ? 'bg-green-500 border-green-400 text-white' :
                  s === 'good' ? 'bg-yellow-500 border-yellow-400 text-white' :
                  s === 'miss' ? 'bg-gray-600 border-gray-500 text-gray-300' :
                  'bg-slate-700 border-slate-500 text-slate-300'}`}
            >
              {l}
            </div>
          );
        })}
      </div>
      {tapFeedback && feedbackTimerRef.current > 0 && (
        <div className={`absolute top-32 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full font-bold text-lg shadow-lg whitespace-nowrap
          ${tapFeedback.ok ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {tapFeedback.text}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none cursor-pointer"
        onPointerDown={handleTap}
      />
      <div className="text-center py-2 text-sm text-indigo-400 bg-slate-900">
        הקש על המסך כשהעיגול מגיע לקו הזהב 🥁
      </div>
    </div>
  );
}
