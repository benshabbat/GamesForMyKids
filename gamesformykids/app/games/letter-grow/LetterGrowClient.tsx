'use client';
import { useLetterGrowGame, ROUNDS_PER_GAME, CATCHES_TO_EVOLVE, MAX_LIVES } from './useLetterGrowGame';

export default function LetterGrowClient() {
  const {
    phase, lives, catchCount, score, roundIdx, evolveInfo, hurtFlash,
    target, heartStr, canvasRef, startGame, handlePointerMove,
  } = useLetterGrowGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-purple-900 p-6 text-white" dir="rtl">
        <div className="text-7xl mb-4">🌱</div>
        <h1 className="text-4xl font-bold mb-2">לצמוח למילה</h1>
        <p className="text-xl mb-2 text-purple-200">תפוס אותיות ותגדל למילה!</p>
        <p className="text-sm text-purple-300 mb-8">זז עם העכבר / אצבע כדי להזיז את הדלי</p>
        <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-sm w-full">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">👁️</div><div>ראה איזו אות מחפשים</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🪣</div><div>תפוס 5 אותיות</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🌟</div><div>האות תצמח למילה!</div></div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🚀 בואו נשחק!
        </button>
      </div>
    );
  }

  if (phase === 'evolving' && evolveInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-purple-900 p-6 text-white" dir="rtl">
        <div className="animate-bounce text-8xl mb-6">{evolveInfo.emoji}</div>
        <div className="text-6xl font-bold mb-2 text-yellow-300">{evolveInfo.letter}</div>
        <div className="text-4xl mb-2">→</div>
        <div className="text-5xl font-bold text-green-300 mb-4">{evolveInfo.word}!</div>
        <p className="text-lg text-purple-200">האות {evolveInfo.letter} גדלה למילה!</p>
        <div className="mt-6 flex gap-3">
          {Array.from({ length: ROUNDS_PER_GAME }).map((_, i) => (
            <div key={i} className={`w-8 h-8 rounded-full border-2 ${i < score ? 'bg-yellow-400 border-yellow-300' : 'bg-white/10 border-white/30'}`} />
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / ROUNDS_PER_GAME) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-purple-900 p-6 text-white" dir="rtl">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2">כל הכבוד!</h1>
        <p className="text-xl mb-6 text-purple-200">גידלת {score} מתוך {ROUNDS_PER_GAME} מילים!</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-purple-200">מילים שגדלו</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-green-400">{pct}%</div>
            <div className="text-sm text-purple-200">דיוק</div>
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

  // Playing
  return (
    <div className={`min-h-screen bg-indigo-950 flex flex-col transition-colors ${hurtFlash ? 'bg-red-900' : ''}`} dir="rtl">
      <div className="flex items-center justify-between px-4 py-2 bg-indigo-950/80 text-white z-10">
        <div className="text-lg">{heartStr}</div>
        <div className="flex flex-col items-center">
          {target && (
            <div className="text-2xl font-bold text-yellow-300">{target.letter}</div>
          )}
          <div className="text-xs text-purple-300">תפוס {catchCount}/{CATCHES_TO_EVOLVE}</div>
        </div>
        <div className="text-sm text-purple-300">
          שלב {roundIdx + 1}/{ROUNDS_PER_GAME}
        </div>
      </div>
      <div className="h-2 bg-indigo-900">
        <div
          className="h-full bg-yellow-400 transition-all"
          style={{ width: `${(catchCount / CATCHES_TO_EVOLVE) * 100}%` }}
        />
      </div>
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none cursor-none"
        style={{ touchAction: 'none' }}
        onPointerMove={handlePointerMove}
      />
    </div>
  );
}
