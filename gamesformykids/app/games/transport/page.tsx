
import TransportGameClient from './TransportGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('transport');

export default function TransportPage() {
  return <TransportGameClient />;
}
