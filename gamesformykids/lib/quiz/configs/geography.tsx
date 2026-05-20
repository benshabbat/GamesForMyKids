import Image from 'next/image';
import { shuffle } from '@/lib/utils';
import { GEO_QUESTIONS_PER_GAME, COUNTRIES, CONTINENTS, getFlagUrl } from '@/lib/quiz/data/geography';
import type { Country, Continent } from '@/lib/quiz/data/geography';
import { defineConfig } from './types';

function randomCapitals(exclude: Country): string[] {
  return shuffle(COUNTRIES.filter(c => c.id !== exclude.id)).slice(0, 3).map(c => c.capital);
}

function randomNames(exclude: Country): string[] {
  return shuffle(COUNTRIES.filter(c => c.id !== exclude.id)).slice(0, 3).map(c => c.name);
}

function randomContinents(exclude: Continent): string[] {
  return shuffle(CONTINENTS.filter(c => c !== exclude)).slice(0, 3);
}

const flagImg = (iso2: string, size: 80 | 160) => (
  <Image
    src={getFlagUrl(iso2, size)}
    alt=""
    width={size}
    height={Math.round(size * 0.667)}
    className="rounded-lg shadow-md object-cover"
  />
);

export const geographyCapitalsConfig = defineConfig<Country>({
  gameType: 'geography-capitals',
  emoji: '🏛️',
  title: 'בירות העולם',
  description: 'מה הבירה של כל מדינה?',
  theme: 'teal',
  questions: COUNTRIES,
  questionsPerGame: GEO_QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.capital, ...randomCapitals(q)]),
  isCorrect: (choice, q) => choice === q.capital,
  getCorrectLabel: (q) => q.capital,
  renderQuestion: (q) => (
    <div className="flex flex-col items-center gap-3 py-2">
      {flagImg(q.iso2, 80)}
      <p className="text-lg font-bold text-gray-700">🏙️ מה הבירה של {q.name}?</p>
    </div>
  ),
  wrongMsg: (q) => `💙 הבירה של ${q.name} היא ${q.capital}`,
});

export const geographyFlagsConfig = defineConfig<Country>({
  gameType: 'geography-flags',
  emoji: '🚩',
  title: 'דגלי העולם',
  description: 'לאיזו מדינה שייך הדגל?',
  theme: 'teal',
  questions: COUNTRIES,
  questionsPerGame: GEO_QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.name, ...randomNames(q)]),
  isCorrect: (choice, q) => choice === q.name,
  getCorrectLabel: (q) => q.name,
  renderQuestion: (q) => (
    <div className="flex flex-col items-center gap-3 py-2">
      {flagImg(q.iso2, 160)}
      <p className="text-lg font-bold text-gray-700">לאיזו מדינה שייך הדגל?</p>
    </div>
  ),
  wrongMsg: (q) => `💙 זה הדגל של ${q.name}`,
});

export const geographyContinentsConfig = defineConfig<Country>({
  gameType: 'geography-continents',
  emoji: '🌍',
  title: 'יבשות העולם',
  description: 'באיזו יבשת נמצאת המדינה?',
  theme: 'teal',
  questions: COUNTRIES,
  questionsPerGame: GEO_QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.continent, ...randomContinents(q.continent)]),
  isCorrect: (choice, q) => choice === q.continent,
  getCorrectLabel: (q) => q.continent,
  renderQuestion: (q) => (
    <div className="flex flex-col items-center gap-3 py-2">
      {flagImg(q.iso2, 80)}
      <p className="text-lg font-bold text-gray-700">🌍 באיזו יבשת נמצאת {q.name}?</p>
    </div>
  ),
  wrongMsg: (q) => `💙 ${q.name} נמצאת ב${q.continent}`,
});
