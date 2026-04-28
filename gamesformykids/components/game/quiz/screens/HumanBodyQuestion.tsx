'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { BodyQuestion } from '@/lib/quiz/data/body';

interface Props {
  currentQuestion: BodyQuestion;
  choices: string[];
  onSelect: (choice: string) => void;
}

export default function HumanBodyQuestion({ currentQuestion, choices, onSelect }: Props) {
  return (
    <QuizQuestionShell
      theme="red"
      choices={choices}
      correctLabel={currentQuestion.function}
      onSelect={onSelect}
      cols={1}
      correctMsg="✅ נכון!"
      wrongMsg={`❌ התשובה: ${currentQuestion.function}`}
    >
      <div className="text-7xl mb-3">{currentQuestion.emoji}</div>
      <div className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-red-400 mb-3">{currentQuestion.category}</div>
      <p className="text-lg font-bold text-gray-800">מה התפקיד של: <span className="text-red-600">{currentQuestion.part}</span>?</p>
    </QuizQuestionShell>
  );
}

