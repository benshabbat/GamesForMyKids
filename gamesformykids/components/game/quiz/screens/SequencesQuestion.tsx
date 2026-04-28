'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { SequenceLevel, SequenceQuestion } from '@/lib/quiz/data/sequences';

interface Props {
  level: SequenceLevel;
  current: SequenceQuestion;
  choices: number[];
  onSelect: (n: number) => void;
}

export default function SequencesQuestion({ level, current, choices, onSelect }: Props) {
  return (
    <QuizQuestionShell
      theme="sky"
      choices={choices.map(String)}
      correctLabel={String(current.next)}
      onSelect={(v) => onSelect(Number(v))}
      renderChoice={(v) => <span className="text-3xl font-black">{v}</span>}
      correctMsg={`✅ נכון! הסדרה: ${[...current.sequence, current.next].join(', ')}`}
      wrongMsg={`💙 הנכון: ${current.next}`}
      funFact={`כלל: ${current.rule}`}
    >
      <p className="text-sm font-semibold text-gray-400 text-center mb-4">מה המספר הבא? <span className="text-xs text-indigo-400">{level.label}</span></p>
      <div className="flex flex-wrap justify-center gap-3 items-center">
        {current.sequence.map((n, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-100 border-2 border-cyan-300 flex items-center justify-center font-black text-xl text-cyan-800">{n}</div>
            {i < current.sequence.length - 1 && <span className="text-gray-400 font-bold">،</span>}
          </div>
        ))}
        <span className="text-gray-400 font-bold text-2xl">,</span>
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-3xl">❓</div>
      </div>
    </QuizQuestionShell>
  );
}

