import RiddlesGameClient from './RiddlesGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('riddles');

export default function RiddlesPage() {
  return <RiddlesGameClient />;
}
