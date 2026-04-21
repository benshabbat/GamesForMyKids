import SportsQuizGameClient from './SportsQuizGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('sports-quiz');

export default function SportsQuizPage() {
  return <SportsQuizGameClient />;
}
