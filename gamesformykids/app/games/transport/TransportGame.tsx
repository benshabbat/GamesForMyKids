'use client';

import React from 'react';
import { useTransportGame } from './useTransportGame';
import type { TransportType } from './data/transport';

const TYPE_STYLES: Record<string, { icon: string; color: string }> = {
  'הכל':    { icon: '🌐', color: 'from-slate-400 to-slate-600' },
  'יבשה':   { icon: '🚗', color: 'from-green-400 to-green-600' },
  'ים':     { icon: '🚢', color: 'from-blue-400 to-blue-600' },
  'אוויר':  { icon: '✈️', color: 'from-sky-400 to-sky-600' },
  'מסילה':  { icon: '🚂', color: 'from-amber-400 to-amber-600' },
};

export default function TransportGame() {
  const {
    phase, transportType, types, currentQuestion,
    currentIndex, total, selected, isCorrect,
    score, startGame, selectAnswer, nextQuestion, goToMenu,
  } = useTransportGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="text-8xl mb-4">🚗</div>
        <h1 className="text-4xl font-bold text-blue-700 mb-2">כלי תחבורה</h1>
        <p className="text-gray-600 mb-8 text-center">גלה כלי רכב מהיבשה, הים והאוויר!</p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {(types as readonly TransportType[]).map(type => {
            const s = TYPE_STYLES[type];
            return (
              <button key={type}
                onClick={() => startGame(type)}
                className={`py-3 px-4 rounded-xl font-bold text-white shadow-md active:scale-95 transition-all
                  bg-gradient-to-r ${s.color} ${type === 'הכל' ? 'col-span-2' : ''}`}
              >
                {s.icon} {type}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (phase === 'finished') {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="text-8xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-blue-700 mb-4">כל הכבוד!</h2>
        <p className="text-xl text-gray-700 mb-2">ענית נכון על <span className="font-bold text-blue-600">{score}</span> מתוך {total}</p>
        <p className="text-lg text-gray-500 mb-8">{pct}% הצלחה</p>
        <div className="flex gap-4">
          <button onClick={() => startGame(transportType)} className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold shadow active:scale-95">שחק שוב</button>
          <button onClick={goToMenu} className="px-6 py-3 bg-gray-400 text-white rounded-xl font-bold shadow active:scale-95">תפריט</button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToMenu} className="text-gray-500 text-sm">← חזור</button>
        <span className="font-bold text-blue-600">✈️ {score} | שאלה {currentIndex + 1}/{total}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
          <div className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-blue-400 mb-3">{currentQuestion.type}</div>
          <p className="text-lg font-bold text-gray-800">{currentQuestion.question}</p>

          {phase === 'answered' && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-100 text-green-700 font-bold' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '✅ מעולה!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}
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
              cls += 'bg-white text-gray-800 border-2 border-blue-200 hover:border-blue-400';
            }
            return (
              <button key={idx} onClick={() => selectAnswer(idx)} disabled={phase === 'answered'} className={cls}>
                {ans}
              </button>
            );
          })}
        </div>

        {phase === 'answered' && (
          <button onClick={nextQuestion} className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {currentIndex + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
