'use client';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import type { BodyQuestion } from '@/lib/quiz/data/body';
import { answerButtonClass } from '@/lib/quiz/answerButtonClass';

interface Props {
  currentQuestion: BodyQuestion;
  choices: string[];
  onSelect: (choice: string) => void;
}

export default function HumanBodyQuestion({ currentQuestion, choices, onSelect }: Props) {
  const index     = useQuizGameStore(s => s.index);
  const total     = useQuizGameStore(s => s.total);
  const score     = useQuizGameStore(s => s.score);
  const selected  = useQuizGameStore(s => s.selected);
  const isCorrect = useQuizGameStore(s => s.isCorrect);
  const next      = useQuizGameStore(s => s.nextQuestion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-red-600">❤️ {score * 10} | שאלה {index + 1}/{total}</span>
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
          {choices.map(choice => (
            <button key={choice} onClick={() => onSelect(choice)} disabled={selected !== null}
              className={`py-3 px-4 rounded-xl font-bold text-right shadow active:scale-95 transition-all ${answerButtonClass(
                choice === currentQuestion.function,
                choice === selected,
                selected !== null,
                'bg-white text-gray-800 border-2 border-red-200 hover:border-red-400',
              )}`}>
              {choice}
            </button>
          ))}
        </div>
        {selected !== null && (
          <button onClick={next} className="mt-6 px-8 py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg active:scale-95">
            {index + 1 < total ? 'הבא ←' : 'סיום 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
