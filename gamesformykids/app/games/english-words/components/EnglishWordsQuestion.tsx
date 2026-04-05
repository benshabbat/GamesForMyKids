'use client';

const CAT_COLORS: Record<string, string> = {
  'הכל': 'bg-indigo-600 text-white',
  'חיות': 'bg-green-500 text-white',
  'אוכל': 'bg-orange-500 text-white',
  'גוף': 'bg-pink-500 text-white',
  'בית': 'bg-teal-500 text-white',
  'צבעים': 'bg-purple-500 text-white',
  'מספרים': 'bg-blue-500 text-white',
};

interface Word {
  emoji: string;
  hebrew: string;
  english: string;
  category: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: Word;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (choice: string) => void;
  onNext: () => void;
}

export default function EnglishWordsQuestion({ index, total, score, current, choices, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="bg-indigo-50 rounded-2xl p-6 mb-5 text-center">
          <div className="text-6xl mb-3">{current.emoji}</div>
          <p className="text-gray-500 text-sm mb-1">מה המילה באנגלית?</p>
          <p className="text-3xl font-bold text-indigo-800">{current.hebrew}</p>
          <span className={`inline-block text-xs font-semibold mt-2 px-3 py-1 rounded-full ${CAT_COLORS[current.category] ?? 'bg-gray-400 text-white'}`}>
            {current.category}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4" dir="ltr">
          {choices.map(choice => {
            let cls = 'p-4 rounded-2xl border-2 font-bold text-xl transition-all text-center tracking-wide ';
            if (selected === null) cls += 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 cursor-pointer';
            else if (choice === current.english) cls += 'border-green-500 bg-green-100 text-green-800';
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
          <div className={`rounded-2xl p-3 mb-4 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`} dir="rtl">
            <p className="font-bold text-lg">{isCorrect ? '🎉 Correct!' : `❌ הנכון: "${current.english}"`}</p>
          </div>
        )}
        {selected !== null && (
          <button onClick={onNext} className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all" dir="rtl">
            {index + 1 < total ? 'הבא ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
