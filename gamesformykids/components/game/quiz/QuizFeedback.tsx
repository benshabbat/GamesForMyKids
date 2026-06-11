'use client';

import { useEffect } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';
import { vibrateCorrect, vibrateWrong } from '@/lib/utils/haptic';

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
  const streak    = useQuizGameStore(s => s.streak);
  const next      = useQuizGameStore(s => s.nextQuestion);

  useEffect(() => {
    if (isCorrect === true) vibrateCorrect();
    else if (isCorrect === false) vibrateWrong();
  }, [isCorrect]);

  if (isCorrect === null) return null;

  const t = QUIZ_THEMES[theme];
  const message = isCorrect ? correctMsg : (wrongMsg ?? `כמעט! 💙 הנכון: ${correctLabel}`);
  const isLast = index + 1 >= total;

  return (
    <div>
      {isCorrect && streak >= 3 && (
        <div
          role="status"
          aria-live="assertive"
          className="text-center text-orange-500 font-black text-lg mb-2 motion-safe:animate-bounce"
        >
          🔥 רצף של {streak}!
        </div>
      )}
      <div
        role="status"
        aria-live="polite"
        className={`rounded-2xl p-3 mb-4 text-center ${
          isCorrect ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
        }`}
      >
        <p className="font-bold text-lg">{message}</p>
        {funFact && <p className="text-sm mt-1 opacity-80">{funFact}</p>}
      </div>
      <button
        onClick={next}
        className={`w-full py-3 rounded-2xl ${t.button} text-white font-bold text-lg transition-opacity`}
      >
        {isLast ? 'סיום' : '← הבא'}
      </button>
    </div>
  );
}
