'use client';

interface Question {
  emoji: string;
  question: string;
  answers: string[];
  correctIndex: number;
}

interface Props {
  phase: string;
  currentIndex: number;
  total: number;
  score: number;
  question: Question;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function FamilyQuestion({ phase, currentIndex, total, score, question, selected, isCorrect, onSelect, onNext, onMenu }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onMenu} className="text-gray-500 text-sm">← חזור</button>
        <span className="font-bold text-rose-600">💕 {score} | שאלה {currentIndex + 1}/{total}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{question.emoji}</div>
          <div className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-rose-400 mb-3">קשר משפחתי</div>
          <p className="text-lg font-bold text-gray-800">{question.question}</p>
          {phase === 'answered' && (
            <div className={`mt-4 p-3 rounded-xl text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isCorrect ? '✅ נכון!' : `❌ התשובה הנכונה: ${question.answers[question.correctIndex]}`}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          {question.answers.map((ans, idx) => {
            let cls = 'py-3 px-4 rounded-xl font-bold text-center shadow active:scale-95 transition-all ';
            if (phase === 'answered') {
              if (idx === question.correctIndex) cls += 'bg-green-500 text-white';
              else if (idx === selected) cls += 'bg-red-400 text-white';
              else cls += 'bg-gray-100 text-gray-500';
            } else {
              cls += 'bg-white text-gray-800 border-2 border-rose-200 hover:border-rose-400';
            }
            return (
              <button key={idx} onClick={() => onSelect(idx)} disabled={phase === 'answered'} className={cls}>
                {ans}
              </button>
            );
          })}
        </div>
        {phase === 'answered' && (
          <button onClick={onNext} className="mt-6 px-8 py-3 bg-rose-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {currentIndex + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
