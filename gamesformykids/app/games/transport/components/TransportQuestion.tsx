'use client';

import type { TransportQuestion as TQ } from '../data/transport';
import { answerButtonClass } from '@/lib/quiz/answerButtonClass';

interface Props {
  currentQuestion: TQ;
  onSelect: (idx: number) => void;
  index: number;
  total: number;
  score: number;
  selected: number | null;
  isCorrect: boolean;
  phase: 'playing' | 'answered';
  onNext: () => void;
}

export default function TransportQuestion({
  currentQuestion, onSelect, index, total, score, selected, isCorrect, phase, onNext,
}: Props) {
  const answered = phase === 'answered' || selected !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-blue-600">✈️ {score * 10} | שאלה {index + 1}/{total}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6 text-center">
          <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
          <div className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-blue-400 mb-3">{currentQuestion.type}</div>
          <p className="text-lg font-bold text-gray-800">{currentQuestion.question}</p>
          {answered && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-100 text-green-700 font-bold' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '✅ מעולה!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}
              <br /><span className="text-xs font-normal">💡 {currentQuestion.funFact}</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          {currentQuestion.answers.map((ans, idx) => (
            <button key={idx} onClick={() => onSelect(idx)} disabled={answered}
              className={`py-3 px-4 rounded-xl font-bold text-center shadow active:scale-95 transition ${answerButtonClass(
                idx === currentQuestion.correctIndex,
                idx === selected,
                answered,
                'bg-white text-gray-800 border-2 border-blue-200 hover:border-blue-400',
              )}`}>
              {ans}
            </button>
          ))}
        </div>
        {answered && (
          <button onClick={onNext} className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {index + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
