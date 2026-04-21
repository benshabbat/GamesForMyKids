
import StackClient from './StackClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('stack');

export default function Page() {
  return <StackClient />;
}
