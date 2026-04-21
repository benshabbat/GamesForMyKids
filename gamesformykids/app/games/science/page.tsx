import ScienceGameClient from './ScienceGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('science');

export default function SciencePage() {
  return <ScienceGameClient />;
}
