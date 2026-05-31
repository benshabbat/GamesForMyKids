'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { PatternQuestionWithChoices } from '@/lib/quiz/usePatternsGame';

interface Props {
  current: PatternQuestionWithChoices;
  onSelect: (choice: string) => void;
}

export default function PatternQuestion({ current, onSelect }: Props) {
  const { question, choices } = current;

  return (
    <QuizQuestionShell
      theme="sky"
      choices={choices}
      correctLabel={question.answer}
      onSelect={onSelect}
      correctMsg={`✅ נכון! הדפוס ממשיך עם ${question.answer}`}
      wrongMsg={`💙 הדפוס ממשיך עם ${question.answer}`}
    >
      <p className="text-sm font-semibold text-gray-400 mb-4">מה בא הלאה בדפוס?</p>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-2">
        {question.sequence.map((item, i) => (
          <span
            key={i}
            className={`text-4xl ${item === '❓' ? 'bg-gray-100 rounded-xl px-2 py-1 border-2 border-dashed border-gray-300' : ''}`}
          >
            {item}
          </span>
        ))}
      </div>
    </QuizQuestionShell>
  );
}
