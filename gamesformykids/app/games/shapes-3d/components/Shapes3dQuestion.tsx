'use client';

const SHAPE_COLORS: Record<string, string> = {
  'קובייה':        '#6366f1',
  'כדור':          '#06b6d4',
  'גליל':          '#f59e0b',
  'חרוט':          '#ef4444',
  'פירמידה':       '#8b5cf6',
  'מנסרה משולשת':  '#10b981',
  'תיבה':          '#3b82f6',
  'כדורי (ספירה)': '#06b6d4',
};

interface Shape3d {
  shape: string;
  emoji: string;
}

interface Shapes3dQuestion {
  type: string;
  question: string;
  answer: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: Shapes3dQuestion;
  currentShape: Shape3d | null;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (choice: string) => void;
  onNext: () => void;
}

export default function Shapes3dQuestion({ index, total, score, current, currentShape, choices, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-5 text-center">
          {currentShape && (
            <>
              <div className="text-6xl mb-2" style={{ filter: `drop-shadow(0 0 8px ${SHAPE_COLORS[currentShape.shape] ?? '#6366f1'})` }}>
                {currentShape.emoji}
              </div>
              {current.type !== 'name' && (
                <div className="text-lg font-bold mb-1" style={{ color: SHAPE_COLORS[currentShape.shape] ?? '#6366f1' }}>
                  {currentShape.shape}
                </div>
              )}
            </>
          )}
          <p className="text-gray-800 text-lg font-bold mt-2 leading-relaxed">{current.question}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {choices.map(choice => {
            let cls = 'p-4 rounded-2xl border-2 font-bold text-base transition-all text-center ';
            if (selected === null) cls += 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 cursor-pointer';
            else if (choice === current.answer) cls += 'border-green-500 bg-green-100 text-green-800';
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
            <p className="font-bold text-lg">{isCorrect ? '🎉 נכון!' : `❌ הנכון: ${current.answer}`}</p>
          </div>
        )}
        {selected !== null && (
          <button onClick={onNext} className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all">
            {index + 1 < total ? 'הבא ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
