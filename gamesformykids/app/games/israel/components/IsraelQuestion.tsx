'use client';

const CAT_COLORS: Record<string, string> = {
  'הכל':      'bg-blue-600 text-white',
  'גאוגרפיה': 'bg-teal-500 text-white',
  'היסטוריה': 'bg-amber-500 text-white',
  'תרבות':    'bg-purple-500 text-white',
  'טבע':      'bg-green-500 text-white',
  'ערים':     'bg-rose-500 text-white',
};

interface IsraelQuestion {
  emoji: string;
  category: string;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: IsraelQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
}

export default function IsraelQuestion({ index, total, score, current, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="bg-blue-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-2">{current.emoji}</div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${CAT_COLORS[current.category] ?? 'bg-gray-400 text-white'}`}>
            {current.category}
          </span>
          <p className="text-gray-800 text-lg font-bold leading-relaxed">{current.question}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {current.answers.map((ans, i) => {
            let cls = 'p-3 rounded-2xl border-2 font-semibold text-base transition-all text-center ';
            if (selected === null) cls += 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 cursor-pointer';
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
          <div className={`rounded-2xl p-3 mb-3 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-bold">{isCorrect ? '🎉 נכון!' : `❌ הנכון: ${current.answers[current.correctIndex]}`}</p>
            <p className="text-sm mt-1 opacity-80">💡 {current.funFact}</p>
          </div>
        )}
        {selected !== null && (
          <button onClick={onNext} className="w-full py-3 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all">
            {index + 1 < total ? 'שאלה הבאה ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
