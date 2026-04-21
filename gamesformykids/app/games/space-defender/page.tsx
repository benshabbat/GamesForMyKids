
import SpaceDefenderClient from './SpaceDefenderClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('space-defender');

export default function SpaceDefenderPage() {
  return <SpaceDefenderClient />;
}
