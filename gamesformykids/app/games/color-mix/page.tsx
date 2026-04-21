import ColorMixGameClient from './ColorMixGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('color-mix');

export default function ColorMixPage() {
  return <ColorMixGameClient />;
}
