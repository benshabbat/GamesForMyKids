'use client';
import { useNumberSlide } from './useNumberSlide';
import NumberSlideBoard from './components/NumberSlideBoard';
import { TARGET } from './numberSlideStore';

export default function NumberSlideClient() {
  const { grid, score, phase, startGame, reset, onTouchStart, onTouchEnd } = useNumberSlide();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)' }}
    >
      <h1 className="text-3xl font-bold text-amber-900 mb-1" dir="rtl">🔢 גלישת מספרים</h1>
      <p className="text-amber-700 text-sm mb-4" dir="rtl">הגע ל-{TARGET}!</p>

      {/* Score */}
      <div className="bg-white bg-opacity-80 rounded-2xl px-6 py-2 mb-4 shadow">
        <p className="text-center text-xs text-gray-500 font-medium" dir="rtl">ניקוד</p>
        <p className="text-center text-3xl font-bold text-amber-700">{score}</p>
      </div>

      {/* Board */}
      <NumberSlideBoard grid={grid} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} />

      {/* Controls hint */}
      {phase === 'playing' && (
        <p className="text-amber-700 text-xs mt-4 text-center" dir="rtl">
          ↑↓←→ מקשי חצים • החלק על המסך
        </p>
      )}

      {/* Idle */}
      {phase === 'idle' && (
        <div className="mt-6 text-center">
          <p className="text-amber-800 text-base mb-4 max-w-xs" dir="rtl">
            הזז את האריחים עם מקשי החצים או החלקה.<br/>
            אריחים זהים מתמזגים וסוכמים! הגע ל-{TARGET}!
          </p>
          <button
            onClick={startGame}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg transition-colors"
          >
            🚀 התחל משחק
          </button>
        </div>
      )}

      {/* Won */}
      {phase === 'won' && (
        <div className="mt-6 text-center bg-white bg-opacity-90 rounded-2xl p-6 shadow-xl max-w-xs">
          <div className="text-5xl mb-3">🎉</div>
          <p className="text-2xl font-bold text-green-700 mb-1" dir="rtl">כל הכבוד! הגעת ל-{TARGET}!</p>
          <p className="text-gray-600 text-sm mb-4" dir="rtl">ניקוד: {score}</p>
          <button
            onClick={reset}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-xl transition-colors"
          >
            משחק חדש
          </button>
        </div>
      )}

      {/* Game Over */}
      {phase === 'gameOver' && (
        <div className="mt-6 text-center bg-white bg-opacity-90 rounded-2xl p-6 shadow-xl max-w-xs">
          <div className="text-5xl mb-3">😢</div>
          <p className="text-2xl font-bold text-red-700 mb-1" dir="rtl">אין יותר מהלכים!</p>
          <p className="text-gray-600 text-sm mb-4" dir="rtl">ניקוד: {score}</p>
          <button
            onClick={reset}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-xl transition-colors"
          >
            נסה שוב
          </button>
        </div>
      )}
    </div>
  );
}
