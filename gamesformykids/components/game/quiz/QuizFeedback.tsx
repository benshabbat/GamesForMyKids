'use client';

import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';

interface Props {
  correctLabel: string;
  funFact?: string | undefined;
  theme: QuizTheme;
  correctMsg?: string | undefined;
  wrongMsg?: string | undefined;
}

export function QuizFeedback({
  correctLabel,
  funFact,
  theme,
  correctMsg = '🎉 נכון!',
  wrongMsg,
}: Props) {
  const isCorrect = useQuizGameStore(s => s.isCorrect);
  const index     = useQuizGameStore(s => s.index);
  const total     = useQuizGameStore(s => s.total);
  const next      = useQuizGameStore(s => s.nextQuestion);

  if (isCorrect === null) return null;

  const t = QUIZ_THEMES[theme];
  const message = isCorrect ? correctMsg : (wrongMsg ?? `❌ הנכון: ${correctLabel}`);
  const isLast = index + 1 >= total;

  return (
    <div>
      <div
        className={`rounded-2xl p-3 mb-4 text-center ${
          isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}
      >
        <p className="font-bold text-lg">{message}</p>
        {funFact && <p className="text-xs mt-1 opacity-80">{funFact}</p>}
      </div>
      <button
        onClick={next}
        className={`w-full py-3 rounded-2xl ${t.button} text-white font-bold text-lg transition-all`}
      >
        {isLast ? 'סיום' : 'הבא ←'}
      </button>
    </div>
  );
}
