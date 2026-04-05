'use client';

interface Question {
  a: number;
  b: number;
  op: string;
  answer: number;
  choices: number[];
}

interface Level {
  id: number;
  label: string;
  maxNum: number;
  operations: string[];
}

interface Props {
  level: Level;
  question: Question;
  questionNum: number;
  totalQuestions: number;
  score: number;
  selected: number | null;
  isCorrect: boolean;
  timeLeft: number;
  timePct: number;
  onSelect: (choice: number) => void;
  onAdvance: () => void;
  onMenu: () => void;
}

export default function ArithmeticQuestion({ level, question, questionNum, totalQuestions, score, selected, isCorrect, timeLeft, timePct, onSelect, onAdvance, onMenu }: Props) {
  const timerColor = timePct > 60 ? 'bg-green-400' : timePct > 30 ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <button onClick={onMenu} className="text-indigo-500 text-sm bg-indigo-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-indigo-700">{level.label} | שאלה {questionNum + 1}/{totalQuestions}</span>
          <span className="font-bold text-indigo-700">⭐ {score}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full mb-5 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timePct}%` }} />
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
              <button key={i} onClick={() => onSelect(choice)} disabled={selected !== null}
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
            <button onClick={onAdvance} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-indigo-500 to-blue-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {questionNum < totalQuestions - 1 ? 'שאלה הבאה ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
