'use client';

import { useHolidaysGame } from './useHolidaysGame';
import { HOLIDAYS } from './data/holidays';

export default function HolidaysGame() {
  const {
    phase, holidayIndex, questionIndex, score, maxScore,
    selected, isCorrect, current, currentQuestion,
    totalHolidays, totalQuestions, holidays,
    startHoliday, selectAnswer, next, nextHoliday, goMenu, restart,
  } = useHolidaysGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🕍</div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">חגי ישראל</h1>
          <p className="text-indigo-600">למד על החגים ומשמעותם</p>
          {score > 0 && <p className="mt-2 text-sm text-indigo-500">⭐ {score} / {maxScore} נקודות</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {holidays.map((h, i) => (
            <button
              key={h.id}
              onClick={() => startHoliday(i)}
              className={`p-4 rounded-2xl text-center shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95
                bg-gradient-to-br ${h.color} text-white`}
            >
              <div className="text-4xl mb-2">{h.emoji}</div>
              <div className="font-bold text-sm">{h.name}</div>
              <div className="text-xs opacity-80 mt-0.5">{h.when}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── QUIZ ──
  if (phase === 'quiz') return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bg} p-4`} dir="rtl">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className={`rounded-3xl p-5 mb-5 text-center text-white bg-gradient-to-br ${current.color} shadow-xl`}>
          <button onClick={goMenu} className="absolute top-4 right-4 text-white/70 hover:text-white text-sm bg-white/20 rounded-full px-3 py-1">← חזור</button>
          <div className="text-5xl mb-1">{current.emoji}</div>
          <h2 className="text-2xl font-bold">{current.name}</h2>
          <p className="text-white/80 text-sm mt-1">{current.description}</p>
        </div>
        {/* Progress */}
        <div className="flex justify-between text-sm text-gray-500 mb-2 px-1">
          <span>שאלה {questionIndex + 1} / {totalQuestions}</span>
          <span>⭐ {score} נקודות</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-4">
          <div className={`h-full rounded-full bg-gradient-to-l ${current.color} transition-all`}
            style={{ width: `${(questionIndex / totalQuestions) * 100}%` }} />
        </div>
        {/* Question */}
        <div className="bg-white rounded-2xl shadow p-5 mb-4 text-center">
          <p className="text-xl font-bold text-gray-800">{currentQuestion.question}</p>
        </div>
        {/* Answers */}
        <div className="space-y-3 mb-4">
          {currentQuestion.answers.map((ans, i) => {
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400';
            if (selected !== null) {
              if (i === currentQuestion.correctIndex) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (i === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={i} onClick={() => selectAnswer(i)} disabled={selected !== null}
                className={`w-full text-right py-4 px-5 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${style}`}>
                {selected !== null && i === currentQuestion.correctIndex ? '✅ ' : selected === i && !isCorrect ? '❌ ' : ''}{ans}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <>
            <div className={`rounded-2xl p-3 mb-4 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '🌟 נכון מאוד!' : `💙 התשובה הנכונה: "${currentQuestion.answers[currentQuestion.correctIndex]}"`}
            </div>
            <button onClick={next}
              className={`w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l ${current.color} shadow-lg hover:opacity-90 active:scale-95 transition-all`}>
              {questionIndex < totalQuestions - 1 ? 'שאלה הבאה ←' : 'לתוצאות! 🎉'}
            </button>
          </>
        )}
      </div>
    </div>
  );

  // ── RESULT ──
  if (phase === 'result') return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bg} p-4 flex items-center`} dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3">{current.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">סיימת — {current.name}!</h2>
        <p className="text-gray-500 mb-6">⭐ {score} / {maxScore} נקודות</p>
        <div className="flex flex-col gap-3">
          <button onClick={nextHoliday}
            className={`w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l ${current.color} shadow-lg hover:opacity-90 active:scale-95 transition-all`}>
            {holidayIndex < totalHolidays - 1 ? `הבא: ${HOLIDAYS[holidayIndex + 1].name} ${HOLIDAYS[holidayIndex + 1].emoji}` : '🎉 לסיכום!'}
          </button>
          <button onClick={goMenu} className="w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📜 בחר חג אחר</button>
        </div>
      </div>
    </div>
  );

  // ── COMPLETE ──
  const pct = Math.round((score / maxScore) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-7xl mb-4 animate-bounce">🏆</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">כל הכבוד!</h1>
        <p className="text-gray-500 mb-4">עברת על כל חגי ישראל!</p>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-bold text-indigo-700">{score} / {maxScore}</p>
          <div className="mt-2 h-3 bg-indigo-100 rounded-full"><div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} /></div>
          <p className="text-indigo-500 text-sm mt-1">{pct}%</p>
        </div>
        <button onClick={restart} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-indigo-500 to-purple-500 hover:opacity-90 active:scale-95 transition-all">🔄 שחק שוב</button>
      </div>
    </div>
  );
}
