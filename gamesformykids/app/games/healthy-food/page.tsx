
import HealthyFoodGameClient from './HealthyFoodGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('healthy-food');

export default function HealthyFoodPage() {
  return <HealthyFoodGameClient />;
}
