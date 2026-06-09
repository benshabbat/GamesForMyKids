'use client';

import { useEffect } from 'react';
import { QuizQuestionShell } from '@/components/game/quiz';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import type { NikudQuestion as NikudQuestionType } from '@/lib/quiz/data/nikud';

interface Props {
  current: NikudQuestionType;
  choices: string[];
  onSelect: (choice: string) => void;
}

export default function NikudQuestion({ current, choices, onSelect }: Props) {
  // Auto-play TTS when question changes
  useEffect(() => {
    speakHebrew(current.syllable);
  }, [current.id, current.syllable]);

  return (
    <QuizQuestionShell
      theme="violet"
      choices={choices}
      correctLabel={current.answer}
      onSelect={onSelect}
      correctMsg={`✅ נכון! ${current.syllable} — ${current.answer}`}
      wrongMsg={`💜 ${current.syllable} — ${current.answer}`}
      cols={1}
    >
      <p className="text-sm font-semibold text-violet-600 mb-2">מה שם הניקוד?</p>

      {/* Large nikud display */}
      <div
        className="text-8xl font-bold text-violet-800 mb-3 leading-none"
        style={{ fontFamily: 'serif', direction: 'rtl' }}
      >
        {current.syllable}
      </div>

      {/* TTS replay button */}
      <button
        onClick={() => speakHebrew(current.syllable)}
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-700 text-sm font-medium transition-colors"
        type="button"
      >
        🔊 שמע שוב
      </button>
    </QuizQuestionShell>
  );
}
