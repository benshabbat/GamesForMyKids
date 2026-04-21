
import SoccerGameClient from './SoccerGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('soccer');

export default function SoccerPage() {
  return <SoccerGameClient />;
}
