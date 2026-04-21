import TzadikimGameClient from './TzadikimGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('tzadikim');

export default function TzadikimPage() {
  return <TzadikimGameClient />;
}
