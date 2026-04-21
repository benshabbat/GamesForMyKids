
import WhackAMoleClient from './WhackAMoleClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('whack-a-mole');

export default function WhackAMolePage() {
  return <WhackAMoleClient />;
}
