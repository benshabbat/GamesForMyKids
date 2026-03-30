'use client';

import React from 'react';
import { useHumanBodyGame } from './useHumanBodyGame';
import type { BodyCategory } from './data/body';

const CATEGORY_COLORS: Record<string, string> = {
  'ראש':               'from-blue-400 to-blue-600',
  'גוף':               'from-green-400 to-green-600',
  'גפיים':             'from-orange-400 to-orange-600',
  'איברים פנימיים':    'from-red-400 to-red-600',
};

export default function HumanBodyGame() {
  const {
    phase, category, categories, currentQuestion,
    currentIndex, total, choices, selected, isCorrect,
    score, startGame, selectAnswer, nextQuestion, goToMenu,
  } = useHumanBodyGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="text-8xl mb-4">🦴</div>
        <h1 className="text-4xl font-bold text-red-700 mb-2">גוף האדם</h1>
        <p className="text-gray-600 mb-8 text-center">גלה את הפלאות של גוף האדם!</p>

        <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
          {(['הכל', 'ראש', 'גוף', 'גפיים', 'איברים פנימיים'] as BodyCategory[]).map(cat => (
            <button key={cat}
              onClick={() => startGame(cat)}
              className={`py-3 px-4 rounded-xl font-bold text-white shadow-md active:scale-95 transition-all
                bg-gradient-to-r ${CATEGORY_COLORS[cat] ?? 'from-gray-400 to-gray-600'} ${cat === 'הכל' ? 'col-span-2' : ''}`}
            >
              {cat === 'ראש' ? '🧠 ראש' : cat === 'גוף' ? '💪 גוף' : cat === 'גפיים' ? '🙌 גפיים' : cat === 'איברים פנימיים' ? '❤️ איברים פנימיים' : '🦴 הכל'}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'finished') {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="text-8xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-red-700 mb-4">כל הכבוד!</h2>
        <p className="text-xl text-gray-700 mb-2">ענית נכון על <span className="font-bold text-red-600">{score}</span> מתוך {total}</p>
        <p className="text-lg text-gray-500 mb-8">{pct}% הצלחה</p>
        <div className="flex gap-4">
          <button onClick={() => startGame(category)} className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold shadow active:scale-95">שחק שוב</button>
          <button onClick={goToMenu} className="px-6 py-3 bg-gray-400 text-white rounded-xl font-bold shadow active:scale-95">תפריט</button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToMenu} className="text-gray-500 text-sm">← חזור</button>
        <span className="font-bold text-red-600">❤️ {score} | שאלה {currentIndex + 1}/{total}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
          <div className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-red-400 mb-3">{currentQuestion.category}</div>
          <p className="text-lg font-bold text-gray-800">מה התפקיד של: <span className="text-red-600">{currentQuestion.part}</span>?</p>

          {(phase === 'answered') && (
            <div className={`mt-4 p-3 rounded-xl text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isCorrect ? '✅ נכון!' : `❌ התשובה: ${currentQuestion.function}`}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 w-full max-w-md">
          {choices.map((choice) => {
            let cls = 'py-3 px-4 rounded-xl font-bold text-right shadow active:scale-95 transition-all ';
            if (phase === 'answered') {
              if (choice === currentQuestion.function) cls += 'bg-green-500 text-white';
              else if (choice === selected) cls += 'bg-red-400 text-white';
              else cls += 'bg-gray-100 text-gray-500';
            } else {
              cls += 'bg-white text-gray-800 border-2 border-red-200 hover:border-red-400';
            }
            return (
              <button key={choice} onClick={() => selectAnswer(choice)} disabled={phase === 'answered'} className={cls}>
                {choice}
              </button>
            );
          })}
        </div>

        {phase === 'answered' && (
          <button onClick={nextQuestion} className="mt-6 px-8 py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {currentIndex + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
