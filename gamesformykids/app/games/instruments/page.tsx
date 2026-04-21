import InstrumentsGameClient from './InstrumentsGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('instruments');

export default function InstrumentsPage() {
  return <InstrumentsGameClient />;
}
