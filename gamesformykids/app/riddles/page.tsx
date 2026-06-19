import type { Metadata } from 'next';
import RiddlesPageClient from './RiddlesPageClient';

export const metadata: Metadata = {
  title: 'חידות ובדיחות — GamesForMyKids',
  description: 'חידות, טריוויה ובדיחות לילדים: חידות לגיל הרך, ניחוש, שאלות ותשובות ועוד.',
  keywords: 'חידות לילדים, טריוויה, בדיחות, שאלות ותשובות, ניחוש',
};

export default function RiddlesPage() {
  return <RiddlesPageClient />;
}
