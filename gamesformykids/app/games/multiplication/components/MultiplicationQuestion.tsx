'use client';
import { useMultiplicationGame } from '../useMultiplicationGame';
import { TIME_PER_QUESTION } from '../data/tables';

export default function MultiplicationQuestion() {
  const { level, question, questionNum, totalQuestions, score, selected, isCorrect, timeLeft, selectAnswer, advance, goMenu } = useMultiplicationGame();

  if (!question) return null;

  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor = timerPct > 50 ? 'bg-green-400' : timerPct > 25 ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goMenu} className="text-purple-500 text-sm bg-purple-100 rounded-full px-3 py-1 hover:bg-purple-200">← חזור</button>
          <span className="font-bold text-purple-700">לוח {level} | שאלה {questionNum + 1}/{totalQuestions}</span>
          <span className="font-bold text-purple-700">⭐ {score}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-6 text-center">
          <p className="text-6xl font-black text-purple-700 mb-2">{question.a} × {question.b} = ?</p>
          <p className="text-gray-400 text-lg">⏱️ {timeLeft} שניות</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {question.choices.map((choice, i) => {
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50';
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
              {isCorrect ? `✅ נכון! ${question.a} × ${question.b} = ${question.answer}` : `❌ ${question.a} × ${question.b} = ${question.answer}`}
            </div>
            <button onClick={advance} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-purple-500 to-violet-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {questionNum < totalQuestions - 1 ? 'שאלה הבאה ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
     