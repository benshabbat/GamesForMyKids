'use client';
import { QuizQuestionShell } from '@/components/game/quiz';
import { CATEGORY_EMOJIS, DIFFICULTY_EMOJIS, type TriviaCatQuestion, type TriviaCatDifficulty } from '@/lib/quiz/data/trivia-categories';

interface Props {
  current: TriviaCatQuestion;
  choices: string[];
  correctLabel: string;
  difficulty: TriviaCatDifficulty;
  streak: number;
  onSelect: (v: string) => void;
}

export default function TriviaCategoriesQuestion({ current, choices, correctLabel, difficulty, streak, onSelect }: Props) {
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
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-amber-700">
          {CATEGORY_EMOJIS[current.category]} {current.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-600">{DIFFICULTY_EMOJIS[difficulty]}</span>
          {streak >= 2 && (
            <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">
              🔥 {streak} ברצף!
            </span>
          )}
        </div>
      </div>
      <p className="text-xl font-bold text-gray-800 mt-1">{current.question}</p>
    </QuizQuestionShell>
  );
}
