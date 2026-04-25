'use client';

import { useQuizGameStore } from '@/lib/stores/quizGameStore';

interface TransportQuestion {
  emoji: string;
  type: string;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

interface Props {
  currentQuestion: TransportQuestion;
  phase: string;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
}

export default function TransportQuestion({ currentQuestion, phase, selected, isCorrect, onSelect, onNext }: Props) {
  const index = useQuizGameStore(s => s.index);
  const total = useQuizGameStore(s => s.total);
  const score = useQuizGameStore(s => s.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-blue-600">✈️ {score * 10} | שאלה {index + 1}/{total}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
          <div className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-blue-400 mb-3">{currentQuestion.type}</div>
          <p className="text-lg font-bold text-gray-800">{currentQuestion.question}</p>
          {phase === 'answered' && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-100 text-green-700 font-bold' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '✅ מעולה!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}
              <br /><span className="text-xs font-normal">💡 {currentQuestion.funFact}</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          {currentQuestion.answers.map((ans, idx) => {
            let cls = 'py-3 px-4 rounded-xl font-bold text-center shadow active:scale-95 transition-all ';
            if (phase === 'answered') {
              if (idx === currentQuestion.correctIndex) cls += 'bg-green-500 text-white';
              else if (idx === selected) cls += 'bg-red-400 text-white';
              else cls += 'bg-gray-100 text-gray-500';
            } else {
              cls += 'bg-white text-gray-800 border-2 border-blue-200 hover:border-blue-400';
            }
            return (
              <button key={idx} onClick={() => onSelect(idx)} disabled={phase === 'answered'} className={cls}>
                {ans}
              </button>
            );
          })}
        </div>
        {phase === 'answered' && (
          <button onClick={onNext} className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {index + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
