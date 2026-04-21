
import SheshBeshClient from './SheshBeshClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('shesh-besh');

export default function SheshBeshPage() {
  return <SheshBeshClient />;
}
