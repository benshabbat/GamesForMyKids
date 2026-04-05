'use client';

interface SportsQuestion {
  emoji: string;
  sport: string;
  question: string;
  answers: string[];
  correctIndex: number;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: SportsQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function SportsQuizQuestion({
  index, total, score, current, selected, isCorrect, onSelect, onNext, onMenu,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <div className="bg-green-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-2">{current.emoji}</div>
          <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">{current.sport}</span>
          <p className="text-gray-800 text-lg font-bold mt-3 leading-relaxed">{current.question}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {current.answers.map((ans, i) => {
            let cls = 'p-4 rounded-2xl border-2 font-bold text-lg transition-all text-center ';
            if (selected === null) cls += 'border-green-200 bg-green-50 hover:bg-green-100 text-green-800 cursor-pointer';
            else if (i === current.correctIndex) cls += 'border-green-500 bg-green-100 text-green-800';
            else if (i === selected) cls += 'border-red-400 bg-red-100 text-red-700';
            else cls += 'border-gray-200 bg-gray-50 text-gray-400';
            return (
              <button key={i} onClick={() => onSelect(i)} className={cls} disabled={selected !== null}>
                {ans}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className={`rounded-2xl p-3 mb-4 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-bold text-lg">{isCorrect ? '🎉 כל הכבוד!' : `❌ לא נכון — התשובה: ${current.answers[current.correctIndex]}`}</p>
          </div>
        )}
        {selected !== null && (
          <button
            onClick={onNext}
            className="w-full py-3 rounded-2xl bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition-all"
          >
            {index + 1 < total ? 'שאלה הבאה ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
