'use client';

import { QuizQuestionShell } from '@/components/game/quiz';
import type { GeoQuestion } from '@/lib/quiz/useGeographyGame';
import { getGeoPrompt, getChoiceLabel, getFlagUrl } from '@/lib/quiz/data/geography';

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
      renderChoice={(id) => getChoiceLabel(choices.find(ch => ch.id === id)!, mode)}
      correctMsg={`✅ נכון! ${country.name} — ${country.capital}`}
      wrongMsg={`💙 ${country.name} — ${country.capital}, ${country.continent}`}
    >
      <div className="flex flex-col items-center gap-3 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFlagUrl(country.iso2, mode === 'flag' ? 160 : 80)}
          alt={country.name}
          width={mode === 'flag' ? 160 : 80}
          height={mode === 'flag' ? 107 : 53}
          className="rounded-lg shadow-md object-cover"
        />
        <p className="text-lg font-bold text-gray-700">{getGeoPrompt(country, mode)}</p>
      </div>
    </QuizQuestionShell>
  );
}

