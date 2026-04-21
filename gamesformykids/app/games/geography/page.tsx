import GeographyGameClient from './GeographyGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('geography');

export default function GeographyPage() {
  return <GeographyGameClient />;
}
