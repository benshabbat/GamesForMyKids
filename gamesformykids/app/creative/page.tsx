import type { Metadata } from 'next';
import CreativePageClient from './CreativePageClient';

export const metadata: Metadata = {
  title: 'יצירה ואומנות — GamesForMyKids',
  description: 'משחקי יצירה לילדים: ציור, צביעה, מוזיקה, בניית אווטאר ועוד.',
  keywords: 'יצירה לילדים, ציור, צביעה, מוזיקה, אמנות לילדים',
};

export default function CreativePage() {
  return <CreativePageClient />;
}
