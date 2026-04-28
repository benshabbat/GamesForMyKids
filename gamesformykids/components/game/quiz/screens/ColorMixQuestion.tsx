'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import type { ColorMix } from '@/lib/quiz/data/color-mix';

interface Props {
  mix: ColorMix;
  choices: string[];
  onSelect: (label: string) => void;
}

function ResultCircle({ mix }: { mix: ColorMix }) {
  const selected = useQuizGameStore(s => s.selected);
  return (
    <div className="text-center">
      <div
        className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200 flex items-center justify-center"
        style={{ backgroundColor: selected ? mix.result : '#f3f4f6' }}
      >
        {!selected && <span className="text-3xl">❓</span>}
      </div>
      <span className="text-sm font-bold text-gray-600">{selected ? mix.resultLabel : '?'}</span>
    </div>
  );
}

export default function ColorMixQuestion({ mix, choices, onSelect }: Props) {
  return (
    <QuizQuestionShell
      theme="purple"
      choices={choices}
      correctLabel={mix.resultLabel}
      onSelect={onSelect}
      correctMsg={`✅ נכון! ${mix.label1} + ${mix.label2} = ${mix.resultLabel}`}
      wrongMsg={`💙 ${mix.label1} + ${mix.label2} = ${mix.resultLabel}`}
    >
      <p className="text-xl font-bold text-gray-700 text-center mb-5">מה מקבלים?</p>
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200" style={{ backgroundColor: mix.color1 }} />
          <span className="text-sm font-bold text-gray-600">{mix.label1}</span>
        </div>
        <div className="text-4xl font-black text-gray-400">+</div>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200" style={{ backgroundColor: mix.color2 }} />
          <span className="text-sm font-bold text-gray-600">{mix.label2}</span>
        </div>
        <div className="text-4xl font-black text-gray-400">=</div>
        <ResultCircle mix={mix} />
      </div>
    </QuizQuestionShell>
  );
}

