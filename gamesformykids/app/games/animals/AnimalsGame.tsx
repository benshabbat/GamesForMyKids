'use client';

import { useAnimalsGame } from './useAnimalsGame';
import { CATEGORY_NAMES, AnimalCategory } from './data/animals';

const CAT_ORDER: Array<AnimalCategory | 'all'> = ['all', 'farm', 'wild', 'sea', 'birds', 'insects'];
const CAT_DISPLAY: Record<string, string> = { all: '🌍 הכל', ...CATEGORY_NAMES };

export default function AnimalsGame() {
  const {
    phase, index, score, selected, isCorrect, current, total,
    startGame, selectAnswer, next, goMenu, restart,
  } = useAnimalsGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🐘</div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">בעלי חיים</h1>
          <p className="text-green-600">בחר קטגוריה ותתחיל!</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {CAT_ORDER.map(cat => (
            <button key={cat} onClick={() => startGame(cat)}
              className="py-5 rounded-2xl font-bold text-lg text-white shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-br from-green-500 to-teal-600">
              {CAT_DISPLAY[cat]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing' && current) {
    const prompt = current.mode === 'emoji-to-name' ? current.animal.emoji : current.animal.hebrew;
    const promptLabel = current.mode === 'emoji-to-name' ? 'מה שם החיה?' : 'מה הסמל של החיה?';
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4" dir="rtl">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={goMenu} className="text-green-500 text-sm bg-green-100 rounded-full px-3 py-1">← חזור</button>
            <span className="text-green-700 font-bold">שאלה {index + 1} / {total}</span>
            <span className="text-green-700 font-bold">⭐ {score}</span>
          </div>
          {/* Progress */}
          <div className="h-2 bg-gray-200 rounded-full mb-5">
            <div className="h-full bg-green-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
          </div>
          {/* Question */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 text-center">
            <p className="text-8xl mb-3">{prompt}</p>
            <p className="text-xl font-bold text-gray-700">{promptLabel}</p>
          </div>
          {/* Choices */}
          <div className="grid grid-cols-2 gap-3">
            {current.choices.map(animal => {
              const displayVal = current.mode === 'emoji-to-name' ? animal.hebrew : animal.emoji;
              let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-400 hover:bg-green-50';
              if (selected) {
                if (animal.id === current.animal.id) style = 'bg-green-500 border-2 border-green-600 text-white';
                else if (animal.id === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
                else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
              }
              return (
                <button key={animal.id} onClick={() => selectAnswer(animal.id)} disabled={!!selected}
                  className={`py-4 rounded-2xl text-2xl font-bold transition-all active:scale-95 ${style}`}>
                  {displayVal}
                </button>
              );
            })}
          </div>
          {selected && (
            <div className="mt-4">
              <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {isCorrect ? `✅ נכון! ${current.animal.hebrew} ${current.animal.emoji}` : `💙 זה: ${current.animal.hebrew} ${current.animal.emoji}`}
                <p className="text-sm font-normal opacity-80 mt-1">{current.animal.fact}</p>
              </div>
              <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-green-500 to-teal-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
                {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT ──
  const pct = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">🐘</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">כל הכבוד!</h1>
        <div className="bg-green-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-green-700">{score} / {total}</p>
          <div className="mt-2 h-3 bg-green-100 rounded-full"><div className="h-full bg-green-400 rounded-full" style={{ width: `${pct}%` }} /></div>
          <p className="text-green-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-green-500 to-teal-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📋 קטגוריות</button>
        </div>
      </div>
    </div>
  );
}
