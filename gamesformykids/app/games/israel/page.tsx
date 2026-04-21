import IsraelGameClient from './IsraelGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('israel');

export default function IsraelPage() {
  return <IsraelGameClient />;
}
