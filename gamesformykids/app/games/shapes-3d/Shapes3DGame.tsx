'use client';

import { useShapes3DGame } from './useShapes3DGame';

const SHAPE_COLORS: Record<string, string> = {
  'קובייה':        '#6366f1',
  'כדור':          '#06b6d4',
  'גליל':          '#f59e0b',
  'חרוט':          '#ef4444',
  'פירמידה':       '#8b5cf6',
  'מנסרה משולשת':  '#10b981',
  'תיבה':          '#3b82f6',
  'כדורי (ספירה)': '#06b6d4',
};

export default function Shapes3DGame() {
  const { phase, index, score, selected, isCorrect, current, currentShape, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useShapes3DGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">📐</div>
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">גופים גיאומטריים</h1>
          <p className="text-gray-500 mb-5">למד גופים תלת-ממדיים!</p>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[
              { shape: 'קובייה', emoji: '🎲' },
              { shape: 'כדור',   emoji: '⚽' },
              { shape: 'גליל',   emoji: '🥫' },
              { shape: 'חרוט',   emoji: '🍦' },
              { shape: 'פירמידה', emoji: '🔺' },
              { shape: 'תיבה',   emoji: '📦' },
              { shape: 'מנסרה',  emoji: '🔷' },
              { shape: 'ספירה',  emoji: '🌐' },
            ].map(({ shape, emoji }) => (
              <div key={shape} className="bg-indigo-50 rounded-xl p-2 text-center">
                <div className="text-2xl">{emoji}</div>
                <div className="text-xs font-semibold text-indigo-700">{shape}</div>
              </div>
            ))}
          </div>
          <button onClick={startGame} className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">
            התחל לשחק! 📐
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '📐' : pct >= 50 ? '🔷' : '💪';
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">מתמטיקאי מצוין!</h2>
          <p className="text-gray-600 mb-4">ידעת {correctCount} מתוך {total} תשובות</p>
          <div className="text-5xl font-bold text-indigo-600 mb-6">{score} נקודות</div>
          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all">שחק שוב</button>
            <button onClick={goMenu} className="flex-1 py-3 rounded-2xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all">תפריט</button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>

        {/* Shape display */}
        <div className="bg-indigo-50 rounded-2xl p-5 mb-5 text-center">
          {currentShape && (
            <>
              <div className="text-6xl mb-2"
                style={{ filter: `drop-shadow(0 0 8px ${SHAPE_COLORS[currentShape.shape] ?? '#6366f1'})` }}>
                {currentShape.emoji}
              </div>
              {current.type !== 'name' && (
                <div className="text-lg font-bold mb-1" style={{ color: SHAPE_COLORS[currentShape.shape] ?? '#6366f1' }}>
                  {currentShape.shape}
                </div>
              )}
            </>
          )}
          <p className="text-gray-800 text-lg font-bold mt-2 leading-relaxed">{current.question}</p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {choices.map(choice => {
            let cls = 'p-4 rounded-2xl border-2 font-bold text-base transition-all text-center ';
            if (selected === null) cls += 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 cursor-pointer';
            else if (choice === current.answer) cls += 'border-green-500 bg-green-100 text-green-800';
            else if (choice === selected) cls += 'border-red-400 bg-red-100 text-red-700';
            else cls += 'border-gray-200 bg-gray-50 text-gray-400';
            return (
              <button key={choice} onClick={() => selectAnswer(choice)} className={cls} disabled={selected !== null}>
                {choice}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`rounded-2xl p-3 mb-4 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-bold text-lg">{isCorrect ? '🎉 נכון!' : `❌ הנכון: ${current.answer}`}</p>
          </div>
        )}

        {selected !== null && (
          <button onClick={next} className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all">
            {index + 1 < total ? 'הבא ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
