
import CatchFruitClient from './CatchFruitClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('catch-fruit');

export default function CatchFruitPage() {
  return <CatchFruitClient />;
}
