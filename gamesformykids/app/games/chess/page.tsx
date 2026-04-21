
import ChessClient from './ChessClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('chess');

export default function ChessPage() {
  return <ChessClient />;
}
