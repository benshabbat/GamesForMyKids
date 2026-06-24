'use client';
import dynamic from 'next/dynamic';
import { useNumberMergeStore, type Difficulty } from './numberMergeStore';

const MergeCanvas = dynamic(() => import('./components/MergeCanvas'), { ssr: false });

const DIFFICULTY_LABELS: Record<Difficulty, { label: string; desc: string; emoji: string; color: string }> = {
  easy:   { label: 'קל',    desc: 'הגע ל-200',  emoji: '⭐',  color: 'bg-green-400 hover:bg-green-500' },
  medium: { label: 'בינוני', desc: 'הגע ל-500',  emoji: '⭐⭐', color: 'bg-yellow-400 hover:bg-yellow-500' },
  hard:   { label: 'קשה',   desc: 'הגע ל-1000', emoji: '⭐⭐⭐', color: 'bg-red-400 hover:bg-red-500' },
};

export default function NumberMergeClient() {
  const { phase, score, targetScore, highScore, difficulty, gameOver, mergeFlash, startGame, restart, clearMergeFlash } = useNumberMergeStore();

  if (mergeFlash) {
    setTimeout(clearMergeFlash, 800);
  }

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex flex-col items-center justify-center p-4 gap-6" dir="rtl">
        <div className="text-center">
          <div className="text-6xl mb-2">🔢</div>
          <h1 className="text-4xl font-bold text-orange-800">מיזוג מספרים</h1>
          <p className="text-orange-600 mt-1">שחרר מספרים ומזג זוגות!</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg w-full max-w-xs text-center">
          <p className="text-gray-600 mb-1 text-sm">שיא אישי</p>
          <p className="text-3xl font-bold text-orange-500">{highScore}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg w-full max-w-xs">
          <p className="text-gray-700 font-bold mb-3 text-center">בחר רמת קושי</p>
          <div className="flex flex-col gap-3">
            {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map(d => {
              const { label, desc, emoji, color } = DIFFICULTY_LABELS[d];
              return (
                <button
                  key={d}
                  onClick={() => startGame(d)}
                  className={`${color} text-white rounded-xl py-3 px-4 font-bold text-lg transition-all flex items-center justify-between`}
                >
                  <span>{emoji} {label}</span>
                  <span className="text-sm opacity-80">{desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white bg-opacity-70 rounded-xl p-4 w-full max-w-xs text-sm text-gray-600 text-center">
          <p>🖱️ הזז את העכבר ולחץ כדי לשחרר מספר</p>
          <p>🔢 שני מספרים זהים שנוגעים — מתמזגים!</p>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex flex-col items-center justify-center p-4 gap-6" dir="rtl">
        <div className="text-6xl">{gameOver ? '💥' : '🎉'}</div>
        <h2 className="text-3xl font-bold text-orange-800">
          {gameOver ? 'המשחק נגמר!' : 'כל הכבוד!'}
        </h2>

        <div className="bg-white rounded-2xl p-6 shadow-xl text-center w-full max-w-xs">
          <p className="text-gray-500 text-sm">הניקוד שלך</p>
          <p className="text-5xl font-bold text-orange-500 my-2">{score}</p>
          <p className="text-gray-500 text-sm">שיא: {highScore}</p>
          {!gameOver && (
            <p className="text-green-600 font-bold mt-2">🎯 הגעת ל-{targetScore}!</p>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => startGame(difficulty)}
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-xl py-3 font-bold text-lg transition-all"
          >
            🔄 שחק שוב
          </button>
          <button
            onClick={restart}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl py-3 font-bold text-lg transition-all"
          >
            🏠 תפריט ראשי
          </button>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex flex-col items-center p-3 gap-3" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-xs flex items-center justify-between">
        <div className="bg-white rounded-xl px-4 py-2 shadow text-center min-w-[90px]">
          <p className="text-xs text-gray-500">ניקוד</p>
          <p className="text-xl font-bold text-orange-500">{score}</p>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-orange-800">🔢 מיזוג</p>
        </div>

        <div className="bg-white rounded-xl px-4 py-2 shadow text-center min-w-[90px]">
          <p className="text-xs text-gray-500">יעד</p>
          <p className="text-xl font-bold text-orange-700">{targetScore}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs bg-white bg-opacity-60 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, (score / targetScore) * 100)}%` }}
        />
      </div>

      {/* Merge flash overlay */}
      {mergeFlash && (
        <div
          key={mergeFlash.id}
          className="fixed pointer-events-none z-50 text-2xl font-bold text-orange-600 animate-bounce"
          style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }}
        >
          +{mergeFlash.value * 10} ✨
        </div>
      )}

      {/* Canvas */}
      <MergeCanvas />

      <p className="text-orange-700 text-sm opacity-70">לחץ על הלוח כדי לשחרר מספר</p>
    </div>
  );
}
