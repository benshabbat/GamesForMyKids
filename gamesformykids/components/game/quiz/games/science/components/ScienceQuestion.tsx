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
  current: ScienceQuestion;
  onSelect: (i: number) => void;
}

export default function ScienceQuestion({ current, onSelect }: Props) {
  const choices = current.answers.map((_, i) => String(i));

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 w-full">
        <QuizProgress theme="cyan" />
        <div className="bg-cyan-50 rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">{current.emoji}</span>
            <span className="text-sm text-cyan-700 font-semibold bg-cyan-100 px-2 py-0.5 rounded-full">{current.topic}</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          correctValue={String(current.correctIndex)}
          onSelect={(v) => onSelect(Number(v))}
          theme="cyan"
          cols={1}
          renderChoice={(v) => current.answers[Number(v)]}
        />
        <QuizFeedback
          correctLabel={current.answers[current.correctIndex]}
          funFact={`💡 ${current.explanation}`}
          theme="cyan"
          correctMsg="✅ נכון!"
        />
      </div>
    </div>
  );
}
