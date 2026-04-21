import TriviaGameClient from './TriviaGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('trivia');

export default function TriviaPage() {
  return <TriviaGameClient />;
}
