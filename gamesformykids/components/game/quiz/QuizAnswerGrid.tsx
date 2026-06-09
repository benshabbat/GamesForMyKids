'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';
import { answerButtonClass } from '@/lib/quiz/answerButtonClass';
import { useKeyboardAnswerSelect } from '@/hooks/shared/useKeyboardAnswerSelect';
import { useHaptic } from '@/hooks/shared/haptic/useHaptic';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const WRONG_PHRASES = ['כמעט!', 'נסה שוב!', 'לא נורא, תנסה שוב!'] as const;

interface Props {
  choices: string[];
  correctValue: string;
  onSelect: (choice: string) => void;
  theme: QuizTheme;
  renderChoice?: ((choice: string) => ReactNode) | undefined;
  cols?: 1 | 2 | undefined;
}

export function QuizAnswerGrid({
  choices,
  correctValue,
  onSelect,
  theme,
  renderChoice,
  cols = 2,
}: Props) {
  const selected = useQuizGameStore(s => s.selected);
  const t = QUIZ_THEMES[theme];
  const enabled = selected === null;
  const { wrong: hapticWrong } = useHaptic();
  const [shakingChoice, setShakingChoice] = useState<string | null>(null);

  const { focusedIdx } = useKeyboardAnswerSelect(
    choices.length,
    (idx) => onSelect(choices[idx]!),
    enabled,
  );

  useEffect(() => {
    if (selected !== null && selected !== correctValue) {
      hapticWrong();
      const phrase = WRONG_PHRASES[Math.floor(Math.random() * WRONG_PHRASES.length)]!;
      void speakHebrew(phrase);
      setShakingChoice(selected);
      const id = setTimeout(() => setShakingChoice(null), 600);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const gridClass = cols === 1
    ? 'grid grid-cols-1 gap-3 mb-4'
    : 'grid grid-cols-2 gap-3 mb-4';

  return (
    <div>
      <div className={gridClass}>
        {choices.map((choice, idx) => (
          <button
            key={choice}
            onClick={() => onSelect(choice)}
            disabled={!enabled}
            className={`p-4 rounded-2xl border-2 font-bold text-base transition-colors text-center ${answerButtonClass(
              choice === correctValue,
              choice === selected,
              !enabled,
              `${t.answerIdle} cursor-pointer`,
            )} ${enabled && idx === focusedIdx ? 'ring-4 ring-offset-2 ring-blue-400' : ''} ${choice === shakingChoice ? 'animate-shake' : ''}`}
          >
            {renderChoice ? renderChoice(choice) : choice}
          </button>
        ))}
      </div>

      {/* Keyboard hints — desktop only */}
      <div className="hidden md:flex justify-center gap-3 mt-1 mb-3" aria-hidden>
        {choices.map((_, idx) => (
          <span
            key={idx}
            className={`text-xs font-mono px-2 py-0.5 rounded border transition-colors ${
              enabled && idx === focusedIdx
                ? 'border-blue-400 text-blue-600 bg-blue-50'
                : 'border-gray-300 text-gray-400 bg-gray-50'
            }`}
          >
            [{idx + 1}]
          </span>
        ))}
      </div>
    </div>
  );
}
