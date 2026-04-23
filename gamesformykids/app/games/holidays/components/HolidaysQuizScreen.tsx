'use client';

interface HolidayQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

interface CurrentHoliday {
  emoji: string;
  name: string;
  description: string;
  color: string;
  bg: string;
}

interface Props {
  current: CurrentHoliday;
  currentQuestion: HolidayQuestion;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
}

export default function HolidaysQuizScreen({ current, currentQuestion, questionIndex, totalQuestions, score, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bg} p-4`} dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className={`rounded-3xl p-5 mb-5 text-center text-white bg-gradient-to-br ${current.color} shadow-xl relative`}>
          <div className="text-5xl mb-1">{current.emoji}</div>
          <h2 className="text-2xl font-bold">{current.name}</h2>
          <p className="text-white/80 text-sm mt-1">{current.description}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-2 px-1">
          <span>שאלה {questionIndex + 1} / {totalQuestions}</span>
          <span>⭐ {score} נקודות</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-4">
          <div className={`h-full rounded-full bg-gradient-to-l ${current.color} transition-all`}
            style={{ width: `${(questionIndex / totalQuestions) * 100}%` }} />
        </div>
        <div className="bg-white rounded-2xl shadow p-5 mb-4 text-center">
          <p className="text-xl font-bold text-gray-800">{currentQuestion.question}</p>
        </div>
        <div className="space-y-3 mb-4">
          {currentQuestion.answers.map((ans, i) => {
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400';
            if (selected !== null) {
              if (i === currentQuestion.correctIndex) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (i === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={i} onClick={() => onSelect(i)} disabled={selected !== null}
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
            <button onClick={onNext}
              className={`w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l ${current.color} shadow-lg hover:opacity-90 active:scale-95 transition-all`}>
              {questionIndex < totalQuestions - 1 ? 'שאלה הבאה ←' : 'לתוצאות! 🎉'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
