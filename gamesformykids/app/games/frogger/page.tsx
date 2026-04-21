
import FroggerClient from './FroggerClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('frogger');

export default function Page() {
  return <FroggerClient />;
}
