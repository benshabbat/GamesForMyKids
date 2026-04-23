'use client';

interface WorldLanguagesItem {
  flag: string;
  country: string;
  language: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: WorldLanguagesItem;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (lang: string) => void;
  onNext: () => void;
}

export default function WorldLanguagesQuestion({
  index, total, score, current, choices, selected, isCorrect, onSelect, onNext,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-emerald-700">{index + 1} / {total}</span>
          <span className="font-bold text-emerald-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 text-center">
          <p className="text-sm font-semibold text-gray-400 mb-2">באיזו שפה מדברים ב...</p>
          <div className="text-7xl mb-2">{current.flag}</div>
          <p className="text-3xl font-black text-gray-800">{current.country}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {choices.map((lang, i) => {
            const isRight = lang === current.language;
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50';
            if (selected !== null) {
              if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (lang === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button
                key={i}
                onClick={() => onSelect(lang)}
                disabled={selected !== null}
                className={`py-5 rounded-2xl font-bold text-xl transition-all active:scale-95 ${style}`}
              >
                {lang}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold text-xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect
                ? `✅ נכון! ב-${current.country} מדברים ${current.language}`
                : `💙 ב-${current.country} מדברים ${current.language}`}
            </div>
            <button
              onClick={onNext}
              className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-emerald-500 to-green-600 shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
