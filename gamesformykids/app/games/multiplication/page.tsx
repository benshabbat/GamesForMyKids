import MultiplicationGameClient from './MultiplicationGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('multiplication');

export default function MultiplicationPage() {
  return <MultiplicationGameClient />;
}
