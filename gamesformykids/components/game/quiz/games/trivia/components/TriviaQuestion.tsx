'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import { CATEGORY_EMOJIS, type TriviaCategory } from '../data/questions';

interface TriviaQuestion {
  category: TriviaCategory;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

interface Props {
  current: TriviaQuestion;
  onSelect: (idx: number) => void;
}

export default function TriviaQuestion({ current, onSelect }: Props) {
  const choices = current.answers.map((_, i) => String(i));
  return (
    <QuizQuestionShell
      theme="amber"
      choices={choices}
      correctLabel={String(current.correctIndex)}
      onSelect={(v) => onSelect(Number(v))}
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
