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
      renderChoice={(id) => getChoiceLabel(choices.find(c => c.id === id)!, mode)}
      correctMsg={`✅ נכון! ${country.flag} ${country.name} — ${country.capital}`}
      wrongMsg={`💙 ${country.flag} ${country.name} — ${country.capital}, ${country.continent}`}
    >
      <p className="text-xl font-bold text-gray-800">{getGeoPrompt(country, mode)}</p>
    </QuizQuestionShell>
  );
}

