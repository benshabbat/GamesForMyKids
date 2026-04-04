'use client';

import React from 'react';
import { useSoccerGame } from './useSoccerGame';
import type { SoccerCategory } from './data/soccer';

const CATEGORY_COLORS: Record<string, string> = {
  'הכל':      'from-green-500 to-emerald-600',
  'כללי':     'from-blue-500 to-blue-700',
  'שחקנים':   'from-yellow-500 to-orange-500',
  'קבוצות':   'from-red-500 to-red-700',
  'חוקים':    'from-purple-500 to-purple-700',
  'טכניקה':   'from-teal-500 to-teal-700',
};

const CATEGORY_ICONS: Record<string, string> = {
  'הכל':      '⚽',
  'כללי':     '🏟️',
  'שחקנים':   '⭐',
  'קבוצות':   '🎽',
  'חוקים':    '🟨',
  'טכניקה':   '👟',
};

// SVG goal animation
function GoalAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center animate-bounce">
        <div className="text-9xl drop-shadow-2xl">⚽</div>
        <div className="text-5xl font-black text-white mt-2 drop-shadow-2xl"
          style={{ textShadow: '0 0 20px #22c55e, 0 0 40px #22c55e' }}>
          GOOOAL!
        </div>
      </div>
    </div>
  );
}

// Pitch background pattern
function PitchBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(180deg, #166534 0%, #15803d 30%, #16a34a 60%, #15803d 100%)',
      }}
    >
      {/* field lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-white" />
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white -translate-x-1/2" />
      </div>
      {children}
    </div>
  );
}

export default function SoccerGame() {
  const {
    phase, category, categories, currentQuestion,
    currentIndex, total, selected, isCorrect, score, showGoal,
    startGame, selectAnswer, nextQuestion, goToMenu,
  } = useSoccerGame();

  if (phase === 'menu') {
    return (
      <PitchBackground>
        <div className="flex flex-col items-center justify-center min-h-screen p-6" dir="rtl">
          {/* Stadium header */}
          <div className="text-8xl mb-2 drop-shadow-xl">⚽</div>
          <h1 className="text-5xl font-black text-white mb-1 drop-shadow-lg">כדורגל</h1>
          <p className="text-green-200 mb-8 text-center text-lg">שאלות על ספורט המלכים!</p>

          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
            {(categories as readonly SoccerCategory[]).map(cat => (
              <button key={cat}
                onClick={() => startGame(cat)}
                className={`py-3 px-4 rounded-xl font-bold text-white shadow-lg active:scale-95 transition-all
                  bg-gradient-to-br ${CATEGORY_COLORS[cat]} ${cat === 'הכל' ? 'col-span-2 py-4 text-xl' : ''}`}
              >
                <span className="mr-1">{CATEGORY_ICONS[cat]}</span> {cat}
              </button>
            ))}
          </div>

          {/* mini pitch diagram */}
          <div className="flex gap-6 text-3xl">
            {['🥅', '⚽', '🏃', '🧤', '🏆'].map((e, i) => (
              <div key={i} className="text-white opacity-80 animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}>{e}</div>
            ))}
          </div>
        </div>
      </PitchBackground>
    );
  }

  if (phase === 'finished') {
    const pct = Math.round((score / total) * 100);
    const trophy = pct === 100 ? '🏆' : pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '⚽';
    const msg = pct === 100 ? 'שחקן על!' : pct >= 80 ? 'מצוין!' : pct >= 60 ? 'כל הכבוד!' : 'אפשר טוב יותר!';
    return (
      <PitchBackground>
        <div className="flex flex-col items-center justify-center min-h-screen p-6" dir="rtl">
          <div className="text-9xl mb-4">{trophy}</div>
          <h2 className="text-4xl font-black text-white mb-3">{msg}</h2>
          <div className="bg-white bg-opacity-20 rounded-2xl px-8 py-5 mb-8 text-center">
            <p className="text-2xl text-white font-bold">
              {score} / {total}
            </p>
            <p className="text-green-200 text-lg">{pct}% הצלחה</p>
          </div>
          {/* Score bar */}
          <div className="w-full max-w-xs bg-white bg-opacity-20 rounded-full h-4 mb-8">
            <div
              className="h-4 rounded-full bg-yellow-400 transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex gap-4">
            <button onClick={() => startGame(category)}
              className="px-6 py-3 bg-yellow-400 text-green-900 rounded-xl font-black shadow-lg active:scale-95">
              שחק שוב ⚽
            </button>
            <button onClick={goToMenu}
              className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-xl font-bold shadow active:scale-95">
              תפריט
            </button>
          </div>
        </div>
      </PitchBackground>
    );
  }

  if (!currentQuestion) return null;

  return (
    <PitchBackground>
      {showGoal && <GoalAnimation />}

      <div className="flex flex-col min-h-screen p-4" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={goToMenu} className="text-green-200 text-sm font-bold">← חזור</button>
          <div className="flex items-center gap-3">
            <span className="bg-white bg-opacity-20 text-white font-bold px-3 py-1 rounded-full text-sm">
              {CATEGORY_ICONS[currentQuestion.category]} {currentQuestion.category}
            </span>
            <span className="bg-yellow-400 text-green-900 font-black px-3 py-1 rounded-full text-sm">
              ⚽ {score}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-4">
          <div
            className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
        <p className="text-green-200 text-xs text-center mb-4">שאלה {currentIndex + 1} מתוך {total}</p>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Question card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mb-5 text-center">
            <div className="text-6xl mb-3">{currentQuestion.emoji}</div>
            <p className="text-lg font-bold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </p>

            {phase === 'answered' && (
              <div className={`mt-4 p-3 rounded-xl text-sm leading-relaxed
                ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                <p className="font-bold">{isCorrect ? '✅ שאל אחד!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}</p>
                <p className="text-xs mt-1">💡 {currentQuestion.funFact}</p>
              </div>
            )}
          </div>

          {/* Answer buttons */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            {currentQuestion.answers.map((ans, idx) => {
              let cls = 'py-3 px-4 rounded-xl font-bold text-center shadow-md active:scale-95 transition-all text-sm ';
              if (phase === 'answered') {
                if (idx === currentQuestion.correctIndex) cls += 'bg-green-500 text-white ring-4 ring-green-300';
                else if (idx === selected) cls += 'bg-red-400 text-white';
                else cls += 'bg-white bg-opacity-50 text-gray-500';
              } else {
                cls += 'bg-white text-gray-800 hover:bg-yellow-50 border-2 border-transparent hover:border-yellow-400';
              }
              return (
                <button key={idx} onClick={() => selectAnswer(idx)}
                  disabled={phase === 'answered'} className={cls}>
                  {ans}
                </button>
              );
            })}
          </div>

          {phase === 'answered' && (
            <button onClick={nextQuestion}
              className="mt-6 px-10 py-3 bg-yellow-400 text-green-900 rounded-xl font-black shadow-xl active:scale-95 text-lg">
              {currentIndex + 1 < total ? 'הבא ⚽' : 'סיום! 🏆'}
            </button>
          )}
        </div>
      </div>
    </PitchBackground>
  );
}
