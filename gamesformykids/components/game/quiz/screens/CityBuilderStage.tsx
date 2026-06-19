'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import type { CityBuilderQuestion } from '@/lib/quiz/data/city-builder';

const BUILDINGS = ['🏠', '🏢', '🏛️', '🏪', '🏬', '🏦', '🏨', '🏰', '⛪', '🗼'] as const;

function CityPanorama() {
  const score     = useQuizGameStore(s => s.score);
  const isCorrect = useQuizGameStore(s => s.isCorrect);
  const total     = useQuizGameStore(s => s.total);

  return (
    <div dir="rtl" className="mb-4">
      {/* Sky + city strip */}
      <div className="rounded-xl bg-gradient-to-b from-sky-300 to-sky-100 p-3 relative overflow-hidden">
        <p className="text-xs font-bold text-sky-700 mb-2 text-center">
          🏙️ העיר שלי — {score} / {total} בניינים
        </p>
        <div className="flex gap-1 justify-center items-end min-h-[3rem]">
          {BUILDINGS.map((building, i) => {
            const isBuilt = i < score;
            const isNewest = isBuilt && i === score - 1 && isCorrect === true;
            return (
              <span
                key={i}
                className={`text-2xl leading-none transition-all duration-300 ${
                  isBuilt
                    ? isNewest
                      ? 'opacity-100 scale-125 animate-bounce'
                      : 'opacity-100 scale-100'
                    : 'opacity-20 grayscale'
                }`}
                title={isBuilt ? undefined : 'עוד לא נבנה'}
              >
                {isBuilt ? building : '🏗️'}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface Props {
  current: CityBuilderQuestion;
  choices: string[];
  onSelect: (choice: string) => void;
}

export default function CityBuilderStage({ current, choices, onSelect }: Props) {
  return (
    <QuizQuestionShell
      theme="sky"
      choices={choices}
      correctLabel={current.answer}
      onSelect={onSelect}
      correctMsg={`✅ נכון! בניין חדש נוסף לעיר! 🏙️`}
      wrongMsg={`כמעט! התשובה הנכונה: ${current.answer}`}
    >
      <CityPanorama />

      {/* Question */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-3xl">{current.emoji}</span>
        <span className="text-xs font-semibold text-sky-500 bg-sky-100 rounded-full px-2 py-0.5">
          {current.category}
        </span>
      </div>
      <p className="text-base font-bold text-sky-900 leading-snug">{current.question}</p>
    </QuizQuestionShell>
  );
}
