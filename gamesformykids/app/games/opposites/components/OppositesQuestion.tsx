'use client';

interface OppositeItem {
  word: string;
  opposite: string;
  emoji: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: OppositeItem;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (word: string) => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function OppositesQuestion({ index, total, score, current, choices, selected, isCorrect, onSelect, onNext, onMenu }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onMenu} className="text-orange-500 text-sm bg-orange-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-orange-700">{index + 1} / {total}</span>
          <span className="font-bold text-orange-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-orange-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 text-center">
          <p className="text-sm font-semibold text-gray-400 mb-2">מה ההפך של...</p>
          <div className="text-5xl mb-2">{current.emoji}</div>
          <p className="text-4xl font-black text-gray-800">{current.word}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {choices.map((word, i) => {
            const isRight = word === current.opposite;
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-orange-50';
            if (selected !== null) {
              if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (word === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={i} onClick={() => onSelect(word)} disabled={selected !== null}
                className={`py-5 rounded-2xl font-black text-2xl transition-all active:scale-95 ${style}`}>
                {word}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold text-xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! ${current.word} ↔ ${current.opposite}` : `💙 ההפך של "${current.word}" = "${current.opposite}"`}
            </div>
            <button onClick={onNext} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-orange-500 to-red-500 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
