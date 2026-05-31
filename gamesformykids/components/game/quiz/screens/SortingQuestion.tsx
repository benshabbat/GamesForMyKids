'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { SortingQuestion } from '@/lib/quiz/useSortingGame';

interface Props {
  current: SortingQuestion;
  onSelect: (choice: string) => void;
}

export default function SortingQuestion({ current, onSelect }: Props) {
  const { item, categoryA, categoryB, itemCategory } = current;
  const correctLabel = itemCategory === 'A' ? categoryA.name : categoryB.name;
  const choices = [categoryA.name, categoryB.name];

  return (
    <QuizQuestionShell
      theme="emerald"
      choices={choices}
      correctLabel={correctLabel}
      onSelect={onSelect}
      cols={2}
      correctMsg={`✅ נכון! ${item.emoji} ${item.name} שייך ל${correctLabel}`}
      wrongMsg={`💙 ${item.emoji} ${item.name} שייך ל${correctLabel}`}
      renderChoice={(choice) => {
        const cat = choice === categoryA.name ? categoryA : categoryB;
        return (
          <span className="flex items-center gap-2 justify-center text-lg font-bold">
            <span className="text-2xl">{cat.emoji}</span>
            {choice}
          </span>
        );
      }}
    >
      <p className="text-sm font-semibold text-gray-400 mb-3">לאיזו קבוצה שייך?</p>
      <div className="text-7xl mb-3">{item.emoji}</div>
      <p className="text-3xl font-black text-gray-800">{item.name}</p>
    </QuizQuestionShell>
  );
}
