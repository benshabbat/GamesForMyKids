'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import { CATEGORY_EMOJIS, type TriviaQuestion as Q } from '../data/questions';

interface Props {
  current: Q;
  choices: string[];
  correctLabel: string;
  onSelect: (v: string) => void;
}

export default function TriviaQuestion({ current, choices, correctLabel, onSelect }: Props) {
  return (
    <QuizQuestionShell
      theme="amber"
      choices={choices}
      correctLabel={correctLabel}
      onSelect={onSelect}
      cols={1}
      renderChoice={(v) => current.answers[Number(v)]}
      funFact={current.funFact}
      correctMsg="🌟 מעולה!"
    >
      <span className="text-sm font-bold text-amber-700">{CATEGORY_EMOJIS[current.category]} {current.category}</span>
      <p className="text-xl font-bold text-gray-800 mt-2">{current.question}</p>
    </QuizQuestionShell>
  );
}
