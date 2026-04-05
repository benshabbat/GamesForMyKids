'use client';
import { CATEGORY_EMOJIS, TriviaCategory } from '../data/questions';

interface TriviaQuestion {
  category: TriviaCategory;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: TriviaQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function TriviaQuestion({
  index, total, score, current, selected, isCorrect, onSelect, onNext, onMenu,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onMenu} className="text-amber-500 text-sm bg-amber-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-amber-700">{CATEGORY_EMOJIS[current.category]} {current.category} | {index + 1} / {total}</span>
          <span className="font-bold text-amber-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5 text-center">
          <p className="text-xl font-bold text-gray-800">{current.question}</p>
        </div>
        <div className="space-y-3">
          {current.answers.map((ans, i) => {
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-400';
            if (selected !== null) {
              if (i === current.correctIndex) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (i === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button
                key={i}
                onClick={() => onSelect(i)}
                disabled={selected !== null}
                className={`w-full text-right py-4 px-5 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${style}`}
              >
                {ans}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '🌟 מעולה!' : `💙 ${current.answers[current.correctIndex]}`}
              <p className="text-sm font-normal mt-1">{current.funFact}</p>
            </div>
            <button
              onClick={onNext}
              className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-amber-500 to-yellow-500 hover:opacity-90 active:scale-95 transition-all"
            >
              {index < total - 1 ? 'שאלה הבאה ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
