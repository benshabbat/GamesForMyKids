'use client';

import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';

interface ScienceQuestion {
  emoji: string;
  topic: string;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: ScienceQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
}

export default function ScienceQuestion({ index, total, score, current, selected, isCorrect, onSelect, onNext }: Props) {
  const choices = current.answers.map((_, i) => String(i));
  const strSelected = selected !== null ? String(selected) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 w-full">
        <QuizProgress index={index} total={total} score={score} theme="cyan" />
        <div className="bg-cyan-50 rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">{current.emoji}</span>
            <span className="text-sm text-cyan-700 font-semibold bg-cyan-100 px-2 py-0.5 rounded-full">{current.topic}</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={strSelected}
          isCorrect={isCorrect}
          correctValue={String(current.correctIndex)}
          onSelect={(v) => onSelect(Number(v))}
          theme="cyan"
          cols={1}
          renderChoice={(v) => current.answers[Number(v)]}
        />
        <QuizFeedback
          isCorrect={selected !== null ? isCorrect : null}
          correctLabel={current.answers[current.correctIndex]}
          funFact={`💡 ${current.explanation}`}
          onNext={onNext}
          index={index}
          total={total}
          theme="cyan"
          correctMsg="✅ נכון!"
        />
      </div>
    </div>
  );
}
