'use client';
import FractionBar from './FractionBar';

interface FractionQuestion {
  numerator: number;
  denominator: number;
  description: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: FractionQuestion;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (choice: string) => void;
  onNext: () => void;
}

export default function FractionsQuestion({ index, total, score, current, choices, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>

        <div className="bg-purple-50 rounded-2xl p-5 mb-5 text-center">
          <p className="text-gray-600 text-sm mb-2">מה השבר המיוצג כאן?</p>
          <div className="text-4xl font-bold text-purple-700 mb-3">
            {current.numerator}/{current.denominator}
          </div>
          <FractionBar numerator={current.numerator} denominator={current.denominator} />
          <p className="text-xs text-gray-500 mt-2">({current.numerator} חלקים מתוך {current.denominator})</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {choices.map(choice => {
            let cls = 'p-4 rounded-2xl border-2 font-bold text-base transition-all text-center ';
            if (selected === null) cls += 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 cursor-pointer';
            else if (choice === current.description) cls += 'border-green-500 bg-green-100 text-green-800';
            else if (choice === selected) cls += 'border-red-400 bg-red-100 text-red-700';
            else cls += 'border-gray-200 bg-gray-50 text-gray-400';
            return (
              <button key={choice} onClick={() => onSelect(choice)} className={cls} disabled={selected !== null}>
                {choice}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`rounded-2xl p-3 mb-4 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-bold text-lg">{isCorrect ? '🎉 נכון!' : `❌ הנכון: ${current.description}`}</p>
          </div>
        )}

        {selected !== null && (
          <button onClick={onNext} className="w-full py-3 rounded-2xl bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all">
            {index + 1 < total ? 'הבא ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
