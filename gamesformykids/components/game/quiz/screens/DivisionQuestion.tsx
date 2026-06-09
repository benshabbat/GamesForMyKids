'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { DivisionQuestion as DivisionQuestionType } from '@/lib/quiz/data/division';

interface Props {
  current: DivisionQuestionType;
  choices: string[];
  onSelect: (choice: string) => void;
}

function ItemGrid({ dividend, divisor, quotient, emoji }: { dividend: number; divisor: number; quotient: number; emoji: string }) {
  if (dividend > 30) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="text-4xl">{emoji}</div>
        <p className="text-sm text-gray-500">סה&quot;כ {dividend} פריטים ב-{divisor} קבוצות</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1 items-center">
      {Array.from({ length: divisor }).map((_, g) => (
        <div key={g} className="flex gap-1 justify-center px-2 py-0.5 bg-blue-50 rounded-lg">
          {Array.from({ length: quotient }).map((_, i) => (
            <span key={i} className="text-lg leading-none">{emoji}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DivisionQuestion({ current, choices, onSelect }: Props) {
  return (
    <QuizQuestionShell
      theme="blue"
      choices={choices}
      correctLabel={String(current.quotient)}
      onSelect={onSelect}
      correctMsg={`✅ נכון! ${current.dividend} ÷ ${current.divisor} = ${current.quotient}`}
      wrongMsg={`💙 ${current.dividend} ÷ ${current.divisor} = ${current.quotient}`}
    >
      <p className="text-base font-bold text-gray-600 mb-2">כמה בכל קבוצה?</p>
      <div className="text-3xl font-black text-blue-700 mb-3 tracking-wide" dir="ltr">
        {current.dividend} ÷ {current.divisor} = ?
      </div>
      <ItemGrid
        dividend={current.dividend}
        divisor={current.divisor}
        quotient={current.quotient}
        emoji={current.emoji}
      />
    </QuizQuestionShell>
  );
}
