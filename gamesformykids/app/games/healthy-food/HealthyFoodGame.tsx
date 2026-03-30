'use client';

import React from 'react';
import { useHealthyFoodGame } from './useHealthyFoodGame';
import { FOOD_ITEMS } from './data/food';

export default function HealthyFoodGame() {
  const {
    phase, currentQuestion, currentIndex, total,
    selected, isCorrect, score,
    startGame, selectAnswer, nextQuestion, goToMenu,
  } = useHealthyFoodGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="text-8xl mb-4">🥗</div>
        <h1 className="text-4xl font-bold text-green-700 mb-2">אוכל בריא</h1>
        <p className="text-gray-600 mb-6 text-center">גלה את סודות התזונה הנכונה!</p>

        <div className="grid grid-cols-4 gap-2 mb-8">
          {FOOD_ITEMS.slice(0, 8).map(f => (
            <div key={f.id} className="bg-white rounded-xl p-2 text-center shadow">
              <div className="text-3xl">{f.emoji}</div>
              <div className="text-xs text-gray-600 mt-1">{f.food}</div>
            </div>
          ))}
        </div>

        <button onClick={startGame}
          className="px-10 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
          🥦 התחל משחק!
        </button>
      </div>
    );
  }

  if (phase === 'finished') {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="text-8xl mb-4">{pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '🥉'}</div>
        <h2 className="text-3xl font-bold text-green-700 mb-4">סיימת!</h2>
        <p className="text-xl text-gray-700 mb-2">ענית נכון על <span className="font-bold text-green-600">{score}</span> מתוך {total}</p>
        <p className="text-lg text-gray-500 mb-8">{pct}% הצלחה</p>
        <div className="flex gap-4">
          <button onClick={startGame} className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold shadow active:scale-95">שחק שוב</button>
          <button onClick={goToMenu} className="px-6 py-3 bg-gray-400 text-white rounded-xl font-bold shadow active:scale-95">תפריט</button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToMenu} className="text-gray-500 text-sm">← חזור</button>
        <span className="font-bold text-green-600">🥗 {score} | שאלה {currentIndex + 1}/{total}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
          <p className="text-lg font-bold text-gray-800">{currentQuestion.question}</p>

          {phase === 'answered' && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-100 text-green-700 font-bold' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '✅ נכון!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}
              <br /><span className="text-xs font-normal">💡 {currentQuestion.funFact}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          {currentQuestion.answers.map((ans, idx) => {
            let cls = 'py-3 px-4 rounded-xl font-bold text-center shadow active:scale-95 transition-all ';
            if (phase === 'answered') {
              if (idx === currentQuestion.correctIndex) cls += 'bg-green-500 text-white';
              else if (idx === selected) cls += 'bg-red-400 text-white';
              else cls += 'bg-gray-100 text-gray-500';
            } else {
              cls += 'bg-white text-gray-800 border-2 border-green-200 hover:border-green-400';
            }
            return (
              <button key={idx} onClick={() => selectAnswer(idx)} disabled={phase === 'answered'} className={cls}>
                {ans}
              </button>
            );
          })}
        </div>

        {phase === 'answered' && (
          <button onClick={nextQuestion} className="mt-6 px-8 py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {currentIndex + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
