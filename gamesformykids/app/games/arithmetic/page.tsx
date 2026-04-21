import ArithmeticGameClient from './ArithmeticGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('arithmetic');

export default function ArithmeticPage() {
  return <ArithmeticGameClient />;
}
