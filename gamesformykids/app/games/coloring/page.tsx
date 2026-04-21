
import ColoringGameClient from './ColoringGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('coloring');

export default function ColoringPage() {
  return <ColoringGameClient />;
}
