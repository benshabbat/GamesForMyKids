'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GenericStartScreen from '@/components/shared/screens/GenericStartScreen';
import { COUNTRIES, getFlagUrl } from '@/lib/quiz/data/geography';
import type { QuestionMode, Country } from '@/lib/quiz/data/geography';
import { ROUTES } from '@/lib/constants/routes';

const STEPS: Record<QuestionMode, Array<{ icon: string; title: string; description: string }>> = {
  capital: [
    { icon: '🏳️', title: 'ראה את הדגל',  description: 'ראה את הדגל ושם המדינה' },
    { icon: '🏙️', title: 'בחר בירה',     description: 'בחר את הבירה הנכונה מבין 4 אפשרויות' },
    { icon: '⭐',  title: 'צבור נקודות', description: 'צבור נקודות ועלה ברמות!' },
  ],
  flag: [
    { icon: '🏳️', title: 'ראה את הדגל',  description: 'ראה את הדגל הגדול על המסך' },
    { icon: '🌍', title: 'זהה מדינה',    description: 'בחר את שם המדינה הנכונה מבין 4 אפשרויות' },
    { icon: '⭐',  title: 'צבור נקודות', description: 'צבור נקודות ועלה ברמות!' },
  ],
  continent: [
    { icon: '🏳️', title: 'ראה את הדגל',  description: 'ראה את הדגל ושם המדינה' },
    { icon: '🌍', title: 'בחר יבשת',     description: 'בחר את היבשת הנכונה מבין 4 אפשרויות' },
    { icon: '⭐',  title: 'צבור נקודות', description: 'צבור נקודות ועלה ברמות!' },
  ],
};

const ITEMS_TITLE: Record<QuestionMode, string> = {
  capital:   '🏛️ מדינות ובירותיהן:',
  flag:      '🚩 דגלי המדינות:',
  continent: '🌍 מדינות ויבשותיהן:',
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
  const router = useRouter();

  return (
    <div className="relative">
      <button
        onClick={() => router.push(ROUTES.GAMES)}
        className="absolute top-4 right-4 z-10 flex items-center gap-1 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 active:scale-95 transition-all font-bold text-sm shadow-md"
      >
        → חזרה
      </button>
      <GenericStartScreen<Country>
        title={`${emoji} ${title}`}
        subTitle={subtitle}
        textColorHeader="text-white"
        textColorSubHeader="text-teal-100"
        backgroundStyle="linear-gradient(135deg, #0d9488 0%, #0891b2 100%)"
        buttonFromColor="from-teal-600"
        buttonToColor="to-cyan-700"
        customOnStart={onStart}
        gameSteps={STEPS[mode]}
        items={COUNTRIES}
        itemsTitle={ITEMS_TITLE[mode]}
        itemsGridClass="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-4xl mx-auto"
        renderItem={(country) => (
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
        )}
        showAudioCheck={false}
      />
    </div>
  );
}
