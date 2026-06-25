'use client';
import { useLetterSlicerGame, HEARTS_MAX, type Difficulty } from './useLetterSlicerGame';

export default function LetterSlicerClient() {
  const {
    phase, score, hearts, target, diff,
    setDiff, canvasRef, startGame, handlePointer,
  } = useLetterSlicerGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">✂️</div>
          <h1 className="text-4xl font-bold text-white mb-2">חותך מילים</h1>
          <p className="text-indigo-300 text-lg">הקשב למילה — חתוך את הבועה הנכונה!</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 mb-8 text-white text-sm space-y-2 max-w-xs w-full">
          <p>👂 TTS אומר מילה</p>
          <p>🎯 לחץ על הבועה הנכונה</p>
          <p>❌ 3 טעויות = סוף המשחק</p>
          <p>💫 +10 נקודות לכל פגיעה</p>
        </div>
        <p className="text-indigo-300 mb-3 font-semibold">בחר רמת קושי:</p>
        <div className="flex gap-3 mb-6">
          {(['slow', 'medium', 'fast'] as Difficulty[]).map(d => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${diff === d ? 'bg-indigo-500 text-white scale-110' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              {d === 'slow' ? '🐢 איטי' : d === 'medium' ? '🚶 בינוני' : '🐇 מהיר'}
            </button>
          ))}
        </div>
        <button
          onClick={() => startGame(diff)}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          התחל! ✂️
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const stars = score >= 100 ? 3 : score >= 50 ? 2 : 1;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center max-w-sm w-full">
          <div className="text-6xl mb-4">{stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉'}</div>
          <h2 className="text-3xl font-bold text-white mb-2">כל הכבוד!</h2>
          <div className="text-5xl font-bold text-yellow-400 mb-2">{score}</div>
          <p className="text-indigo-300 mb-1">נקודות</p>
          <div className="flex justify-center gap-1 text-3xl mb-6">
            {Array.from({ length: 3 }, (_, i) => <span key={i}>{i < stars ? '⭐' : '☆'}</span>)}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startGame(diff)}
              className="bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-600 transition"
            >
              שחק שוב ✂️
            </button>
            <button
              onClick={() => startGame('medium')}
              className="bg-white/20 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition"
            >
              תפריט
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div
      className="relative w-full min-h-screen bg-slate-900 overflow-hidden"
      onPointerDown={handlePointer}
      style={{ touchAction: 'none' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex gap-1 text-2xl">
          {Array.from({ length: HEARTS_MAX }, (_, i) => (
            <span key={i}>{i < hearts ? '❤️' : '🖤'}</span>
          ))}
        </div>
        {target ? (
          <div className="bg-yellow-400/90 text-slate-900 font-bold px-4 py-1 rounded-full text-lg shadow">
            ✂️ {target}
          </div>
        ) : (
          <div className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
            מחכה...
          </div>
        )}
        <div className="bg-white/20 text-white font-bold px-3 py-1 rounded-full text-lg">
          {score}
        </div>
      </div>
    </div>
  );
}
