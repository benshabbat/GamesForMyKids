
import BalloonPopClient from './BalloonPopClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('balloon-pop');

export default function BalloonPopPage() {
  return <BalloonPopClient />;
}
