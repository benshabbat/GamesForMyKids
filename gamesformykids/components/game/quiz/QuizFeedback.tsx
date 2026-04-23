'use client';

import { QUIZ_THEMES, type QuizTheme } from './quizTheme';

interface Props {
  isCorrect: boolean | null;
  /** Label shown after a wrong answer: "❌ הנכון: {correctLabel}" */
  correctLabel: string;
  /** Optional fun-fact / extra info shown below the feedback message. */
  funFact?: string;
  onNext: () => void;
  index: number;
  total: number;
  theme: QuizTheme;
  /** Override the default correct message (default: "🎉 נכון!"). */
  correctMsg?: string;
  /** Override the full wrong message (default: "❌ הנכון: {correctLabel}"). */
  wrongMsg?: string;
}

/**
 * Feedback panel (green/red) + "Next" / "Finish" button.
 * Renders nothing while `isCorrect === null` (no answer yet).
 */
export function QuizFeedback({
  isCorrect,
  correctLabel,
  funFact,
  onNext,
  index,
  total,
  theme,
  correctMsg = '🎉 נכון!',
  wrongMsg,
}: Props) {
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
        onClick={onNext}
        className={`w-full py-3 rounded-2xl ${t.button} text-white font-bold text-lg transition-all`}
      >
        {isLast ? 'סיום' : 'הבא ←'}
      </button>
    </div>
  );
}
