'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { GeoQuestion } from '@/lib/quiz/useGeographyGame';
import { getGeoPrompt, getChoiceLabel } from '@/lib/quiz/data/geography';

interface Props {
  current: GeoQuestion;
  onSelect: (id: string) => void;
}

export default function GeographyQuestion({ current, onSelect }: Props) {
  const { country, mode, choices } = current;
  return (
    <QuizQuestionShell
      theme="teal"
      choices={choices.map(c => c.id)}
      correctLabel={country.id}
      onSelect={onSelect}
      cols={2}
      renderChoice={(id) => {
        const c = choices.find(ch => ch.id === id)!;
        if (mode === 'flag') {
          return (
            <div className="flex flex-col items-center gap-1 py-1">
              <span className="text-5xl leading-none">{c.flag}</span>
              <span className="text-sm font-bold">{c.name}</span>
            </div>
          );
        }
        return getChoiceLabel(c, mode);
      }}
      correctMsg={`✅ נכון! ${country.flag} ${country.name} — ${country.capital}`}
      wrongMsg={`💙 ${country.flag} ${country.name} — ${country.capital}, ${country.continent}`}
    >
      {mode === 'flag' ? (
        <div className="flex flex-col items-center gap-3 py-2">
          <span className="text-8xl leading-none">{country.flag}</span>
          <p className="text-lg font-bold text-gray-700">לאיזו מדינה שייך הדגל?</p>
        </div>
      ) : (
        <p className="text-xl font-bold text-gray-800">{getGeoPrompt(country, mode)}</p>
      )}
    </QuizQuestionShell>
  );
}

