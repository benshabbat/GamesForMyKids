'use client';

import React from 'react';
import { useContinentsGame } from './useContinentsGame';

export default function ContinentsGame() {
  const {
    phase, continents, currentQuestion, currentIndex, total,
    selected, isCorrect, score,
    startGame, selectAnswer, nextQuestion, goToMenu,
  } = useContinentsGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="text-8xl mb-4">🌍</div>
        <h1 className="text-4xl font-bold text-teal-700 mb-2">יבשות העולם</h1>
        <p className="text-gray-600 mb-6 text-center">גלה את 7 יבשות כדור הארץ!</p>

        <div className="grid grid-cols-2 gap-2 mb-8 w-full max-w-xs">
          {continents.map(c => (
            <div key={c.name} className="bg-white rounded-xl p-2 text-center shadow text-sm">
              <div className="text-2xl">{c.emoji}</div>
              <div className="font-bold text-gray-700 text-xs mt-1">{c.name}</div>
              <div className="text-gray-400 text-xs">{c.countries > 0 ? `${c.countries} מדינות` : 'ללא מדינות'}</div>
            </div>
          ))}
        </div>

        <button onClick={startGame}
          className="px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
          🌐 התחל מסע!
        </button>
      </div>
    );
  }

  if (phase === 'finished') {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="text-8xl mb-4">{pct >= 80 ? '🌟' : '🗺️'}</div>
        <h2 className="text-3xl font-bold text-teal-700 mb-4">המסע הסתיים!</h2>
        <p className="text-xl text-gray-700 mb-2">ענית נכון על <span className="font-bold text-teal-600">{score}</span> מתוך {total}</p>
        <p className="text-lg text-gray-500 mb-8">{pct}% הצלחה</p>
        <div className="flex gap-4">
          <button onClick={startGame} className="px-6 py-3 bg-teal-500 text-white rounded-xl font-bold shadow active:scale-95">שחק שוב</button>
          <button onClick={goToMenu} className="px-6 py-3 bg-gray-400 text-white rounded-xl font-bold shadow active:scale-95">תפריט</button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToMenu} className="text-gray-500 text-sm">← חזור</button>
        <span className="font-bold text-teal-600">🌍 {score} | שאלה {currentIndex + 1}/{total}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
          <p className="text-lg font-bold text-gray-800">{currentQuestion.question}</p>

          {phase === 'answered' && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-100 text-green-700 font-bold' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '✅ נכון מאוד!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}
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
              cls += 'bg-white text-gray-800 border-2 border-teal-200 hover:border-teal-400';
            }
            return (
              <button key={idx} onClick={() => selectAnswer(idx)} disabled={phase === 'answered'} className={cls}>
                {ans}
              </button>
            );
          })}
        </div>

        {phase === 'answered' && (
          <button onClick={nextQuestion} className="mt-6 px-8 py-3 bg-teal-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {currentIndex + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
