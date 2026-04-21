
import MeteorDodgeClient from './MeteorDodgeClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('meteor-dodge');

export default function MeteorDodgePage() {
  return <MeteorDodgeClient />;
}
