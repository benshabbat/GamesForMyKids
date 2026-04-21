
import ContinentsGameClient from './ContinentsGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('continents');

export default function ContinentsPage() {
  return <ContinentsGameClient />;
}
