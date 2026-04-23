'use client';

interface FoodQuestion {
  emoji: string;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

interface Props {
  phase: string;
  currentIndex: number;
  total: number;
  score: number;
  currentQuestion: FoodQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
}

export default function HealthyFoodQuestion({ phase: _phase, currentIndex, total, score, currentQuestion, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-green-600">🥗 {score} | שאלה {currentIndex + 1}/{total}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
          <p className="text-lg font-bold text-gray-800">{currentQuestion.question}</p>
          {selected !== null && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-100 text-green-700 font-bold' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '✅ נכון!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}
              <br /><span className="text-xs font-normal">💡 {currentQuestion.funFact}</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          {currentQuestion.answers.map((ans, idx) => {
            let cls = 'py-3 px-4 rounded-xl font-bold text-center shadow active:scale-95 transition-all ';
            if (selected !== null) {
              if (idx === currentQuestion.correctIndex) cls += 'bg-green-500 text-white';
              else if (idx === selected) cls += 'bg-red-400 text-white';
              else cls += 'bg-gray-100 text-gray-500';
            } else {
              cls += 'bg-white text-gray-800 border-2 border-green-200 hover:border-green-400';
            }
            return (
              <button key={idx} onClick={() => onSelect(idx)} disabled={selected !== null} className={cls}>
                {ans}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <button onClick={onNext} className="mt-6 px-8 py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {currentIndex + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
