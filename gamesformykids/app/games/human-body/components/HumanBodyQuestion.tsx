'use client';

interface BodyQuestion {
  emoji: string;
  category: string;
  part: string;
  function: string;
}

interface Props {
  phase: string;
  currentIndex: number;
  total: number;
  score: number;
  currentQuestion: BodyQuestion;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (choice: string) => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function HumanBodyQuestion({ phase: _phase, currentIndex, total, score, currentQuestion, choices, selected, isCorrect, onSelect, onNext, onMenu }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onMenu} className="text-gray-500 text-sm">← חזור</button>
        <span className="font-bold text-red-600">❤️ {score} | שאלה {currentIndex + 1}/{total}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
          <div className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-red-400 mb-3">{currentQuestion.category}</div>
          <p className="text-lg font-bold text-gray-800">מה התפקיד של: <span className="text-red-600">{currentQuestion.part}</span>?</p>
          {selected !== null && (
            <div className={`mt-4 p-3 rounded-xl text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isCorrect ? '✅ נכון!' : `❌ התשובה: ${currentQuestion.function}`}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 w-full max-w-md">
          {choices.map(choice => {
            let cls = 'py-3 px-4 rounded-xl font-bold text-right shadow active:scale-95 transition-all ';
            if (selected !== null) {
              if (choice === currentQuestion.function) cls += 'bg-green-500 text-white';
              else if (choice === selected) cls += 'bg-red-400 text-white';
              else cls += 'bg-gray-100 text-gray-500';
            } else {
              cls += 'bg-white text-gray-800 border-2 border-red-200 hover:border-red-400';
            }
            return (
              <button key={choice} onClick={() => onSelect(choice)} disabled={selected !== null} className={cls}>
                {choice}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <button onClick={onNext} className="mt-6 px-8 py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {currentIndex + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
