'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { ClockQuestion as ClockQuestionType } from '@/lib/quiz/data/clock';
import ClockFace from './ClockFace';

interface Props {
  current: ClockQuestionType;
  choices: ClockQuestionType[];
  onSelect: (id: number) => void;
}

export default function ClockQuestion({ current, choices, onSelect }: Props) {
  return (
    <QuizQuestionShell
      theme="indigo"
      choices={choices.map(c => String(c.id))}
      correctLabel={String(current.id)}
      onSelect={(id) => onSelect(Number(id))}
      renderChoice={(id) => {
        const c = choices.find((ch) => String(ch.id) === id) ?? current;
        return (
          <>
            <div className="text-2xl font-black">{c.digital}</div>
            <div className="text-sm opacity-75 mt-0.5">{c.description}</div>
          </>
        );
      }}
      correctMsg={`✅ נכון! ${current.digital} — ${current.description}`}
      wrongMsg={`💙 ${current.digital} — ${current.description}`}
    >
      <p className="text-lg font-bold text-gray-600 mb-4">מה השעה?</p>
      <div className="flex justify-center">
        <ClockFace hour={current.hour} minute={current.minute} size={180} />
      </div>
    </QuizQuestionShell>
  );
}
