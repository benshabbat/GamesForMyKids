
import FamilyGameClient from './FamilyGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('family');

export default function FamilyPage() {
  return <FamilyGameClient />;
}
