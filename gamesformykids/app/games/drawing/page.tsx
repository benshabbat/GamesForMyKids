import DrawingGameClient from './components/DrawingGameClient';

import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

// Server Component שמכיל את ה-metadata ומעביר לקליינט

export const metadata = generateGameMetadata('drawing');

export default function DrawingGamePage() {
  return <DrawingGameClient />;
}
