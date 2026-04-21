
import PongClient from './PongClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('pong');

export default function PongPage() {
  return <PongClient />;
}
