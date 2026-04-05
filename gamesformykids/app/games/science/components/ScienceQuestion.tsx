'use client';

interface ScienceQuestion {
  emoji: string;
  topic: string;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: ScienceQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function ScienceQuestion({ index, total, score, current, selected, isCorrect, onSelect, onNext, onMenu }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onMenu} className="text-indigo-500 text-sm bg-indigo-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-indigo-700">{index + 1} / {total}</span>
          <span className="font-bold text-indigo-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-indigo-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">{current.emoji}</span>
            <span className="text-sm text-indigo-500 font-semibold bg-indigo-100 px-2 py-0.5 rounded-full">{current.topic}</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{current.question}</p>
        </div>
        <div className="space-y-3 mb-4">
          {current.answers.map((ans, i) => {
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50';
            if (selected !== null) {
              if (i === current.correctIndex) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (i === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={i} onClick={() => onSelect(i)} disabled={selected !== null}
                className={`w-full text-right py-4 px-5 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${style}`}>
                {ans}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-2">
            <div className={`rounded-2xl p-3 mb-3 text-sm font-medium ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-700'}`}>
              {isCorrect ? '✅ ' : '💡 '}{current.explanation}
            </div>
            <button onClick={onNext} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-cyan-500 to-indigo-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
