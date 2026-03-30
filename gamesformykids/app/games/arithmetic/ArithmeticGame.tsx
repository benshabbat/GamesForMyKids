'use client';
import { useArithmeticGame } from './useArithmeticGame';
import { TIME_PER_QUESTION } from './data/questions';

export default function ArithmeticGame() {
  const {
    phase, level, question, questionNum, score, correct,
    selected, isCorrect, timeLeft, totalQuestions, levels,
    startGame, selectAnswer, advance, goMenu,
  } = useArithmeticGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">➕</div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">חשבון מהיר</h1>
          <p className="text-indigo-600">בחר רמה ותתחיל!</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {levels.map(lv => (
            <button key={lv.id} onClick={() => startGame(lv)}
              className="p-5 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-br from-indigo-500 to-blue-600 text-right">
              <div className="text-2xl mb-1">{['➕', '➕➖', '➕', '➖', '✖️', '🔣'][lv.id - 1]}</div>
              <div>{lv.label}</div>
              <div className="text-xs opacity-70 mt-1 font-normal">עד {lv.maxNum}{lv.operations.includes('×') ? ' × ' + lv.maxNum : ''}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing' && question) {
    const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
    const timerColor = timerPct > 60 ? 'bg-green-400' : timerPct > 30 ? 'bg-yellow-400' : 'bg-red-400';
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <button onClick={goMenu} className="text-indigo-500 text-sm bg-indigo-100 rounded-full px-3 py-1">← חזור</button>
            <span className="font-bold text-indigo-700">{level.label} | שאלה {questionNum + 1}/{totalQuestions}</span>
            <span className="font-bold text-indigo-700">⭐ {score}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full mb-5 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-6 text-center">
            <p className="text-5xl font-black text-indigo-700">{question.a} {question.op} {question.b} = ?</p>
            <p className="text-gray-400 mt-3">⏱️ {timeLeft} שניות</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {question.choices.map((choice, i) => {
              let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400';
              if (selected !== null) {
                if (choice === question.answer) style = 'bg-green-500 border-2 border-green-600 text-white';
                else if (choice === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
                else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
              }
              return (
                <button key={i} onClick={() => selectAnswer(choice)} disabled={selected !== null}
                  className={`py-5 rounded-2xl text-3xl font-black transition-all active:scale-95 ${style}`}>
                  {choice}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <div className="mt-4">
              <div className={`rounded-2xl p-3 mb-3 text-center font-bold text-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isCorrect ? `✅ נכון! ${question.a} ${question.op} ${question.b} = ${question.answer}` : `❌ ${question.a} ${question.op} ${question.b} = ${question.answer}`}
              </div>
              <button onClick={advance} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-indigo-500 to-blue-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
                {questionNum < totalQuestions - 1 ? 'שאלה הבאה ←' : 'תוצאות! 🎉'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT ──
  const pct = Math.round((correct / totalQuestions) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3">{pct >= 80 ? '🏆' : pct >= 50 ? '😊' : '💪'}</div>
        <h1 className="text-2xl font-bold mb-4">{level.label} — סיום!</h1>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-indigo-700">{correct} / {totalQuestions}</p>
          <p className="text-indigo-500 text-sm mt-1">תשובות נכונות</p>
          <p className="text-xl font-bold text-indigo-600 mt-2">⭐ {score} נקודות</p>
          <div className="mt-2 h-3 bg-indigo-100 rounded-full"><div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} /></div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => startGame(level)} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-indigo-500 to-blue-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📋 רמות</button>
        </div>
      </div>
    </div>
  );
}
