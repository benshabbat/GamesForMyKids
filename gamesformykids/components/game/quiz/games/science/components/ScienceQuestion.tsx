'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { ScienceQuestion as Q } from '../data/questions';

interface Props {
  current: Q;
  onSelect: (i: number) => void;
}

export default function ScienceQuestion({ current, onSelect }: Props) {
  const choices = current.answers.map((_, i) => String(i));
  return (
    <QuizQuestionShell
      theme="cyan"
      choices={choices}
      correctLabel={String(current.correctIndex)}
      onSelect={(v) => onSelect(Number(v))}
      cols={1}
      renderChoice={(v) => current.answers[Number(v)]}
      funFact={`💡 ${current.explanation}`}
      correctMsg="✅ נכון!"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-3xl">{current.emoji}</span>
        <span className="text-sm text-cyan-700 font-semibold bg-cyan-100 px-2 py-0.5 rounded-full">{current.topic}</span>
      </div>
      <p className="text-xl font-bold text-gray-800">{current.question}</p>
    </QuizQuestionShell>
  );
}
