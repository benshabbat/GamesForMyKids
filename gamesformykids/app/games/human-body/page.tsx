
import HumanBodyGameClient from './HumanBodyGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('human-body');

export default function HumanBodyPage() {
  return <HumanBodyGameClient />;
}
