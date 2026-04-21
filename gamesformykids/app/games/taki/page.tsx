
import TakiClient from './TakiClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('taki');

export default function TakiPage() {
  return <TakiClient />;
}
