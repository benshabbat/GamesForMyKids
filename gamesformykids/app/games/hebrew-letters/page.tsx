import HebrewLettersHub from './components/hub/HebrewLettersHub';

import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('hebrew-letters');

export default function HebrewLettersPage() {
  return <HebrewLettersHub />;
}
