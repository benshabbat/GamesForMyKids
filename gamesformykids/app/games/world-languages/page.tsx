import WorldLanguagesGameClient from './WorldLanguagesGameClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'שפות העולם | GamesForMyKids',
  description: 'למד אילו שפות מדברים בכל מדינה בעולם!',
};
export default function WorldLanguagesPage() { return <WorldLanguagesGameClient />; }
