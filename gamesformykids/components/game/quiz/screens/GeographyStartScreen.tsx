'use client';

import Image from 'next/image';
import { COUNTRIES, getFlagUrl } from '@/lib/quiz/data/geography';
import type { QuestionMode, Country } from '@/lib/quiz/data/geography';
import StartScreenHeader from '@/components/shared/headers/StartScreenHeader';
import SimpleGameInstructions from '@/components/shared/feedback/SimpleGameInstructions';

const INSTRUCTIONS: Record<QuestionMode, string[]> = {
  capital:   ['ראה את הדגל ושם המדינה', 'בחר את הבירה הנכונה מבין 4 אפשרויות', 'צבור נקודות ועלה ברמות!'],
  flag:      ['ראה את הדגל הגדול על המסך', 'בחר את שם המדינה הנכונה מבין 4 אפשרויות', 'צבור נקודות ועלה ברמות!'],
  continent: ['ראה את הדגל ושם המדינה', 'בחר את היבשת הנכונה מבין 4 אפשרויות', 'צבור נקודות ועלה ברמות!'],
};

function countryLabel(c: Country, mode: QuestionMode): string {
  if (mode === 'capital')   return `${c.name} — ${c.capital}`;
  if (mode === 'continent') return `${c.name} — ${c.continent}`;
  return c.name;
}

interface Props {
  mode: QuestionMode;
  title: string;
  subtitle: string;
  emoji: string;
  onStart: () => void;
}

export default function GeographyStartScreen({ mode, title, subtitle, emoji, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-cyan-700 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto text-center">
        <StartScreenHeader
          title={`${emoji} ${title}`}
          subTitle={subtitle}
          textColorHeader="text-white"
          textColorSubHeader="text-teal-100"
        />

        <SimpleGameInstructions
          title="איך משחקים?"
          instructions={INSTRUCTIONS[mode]}
          showSteps
          variant="detailed"
        />

        <div className="mb-10">
          <button
            onClick={onStart}
            className="px-12 py-4 bg-white text-teal-700 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4 border-teal-200"
          >
            {emoji} בואו נתחיל לשחק!
          </button>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-5">המדינות במשחק:</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {COUNTRIES.map(country => (
              <div
                key={country.id}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-2 flex flex-col items-center gap-1"
              >
                <Image
                  src={getFlagUrl(country.iso2, 80)}
                  alt={country.name}
                  width={60}
                  height={40}
                  className="rounded shadow-md object-cover"
                />
                <span className="text-white text-xs font-semibold leading-tight text-center">
                  {countryLabel(country, mode)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
