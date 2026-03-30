import GeographyGameClient from './GeographyGameClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'גאוגרפיה | GamesForMyKids',
  description: 'בירות, דגלים ויבשות של העולם! משחק גאוגרפיה לילדים.',
};

export default function GeographyPage() {
  return <GeographyGameClient />;
}
