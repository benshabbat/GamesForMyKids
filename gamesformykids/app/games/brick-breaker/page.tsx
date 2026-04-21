
import BrickBreakerClient from './BrickBreakerClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('brick-breaker');

export default function BrickBreakerPage() {
  return <BrickBreakerClient />;
}
