
import JumperClient from './JumperClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('jumper');

export default function Page() {
  return <JumperClient />;
}
