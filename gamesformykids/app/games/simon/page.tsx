
import SimonClient from './SimonClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('simon');

export default function Page() {
  return <SimonClient />;
}
