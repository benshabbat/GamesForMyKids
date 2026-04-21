import ReflexGameClient from './ReflexGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';





export const metadata = generateGameMetadata('reflex');

export default function ReflexPage() {
  return <ReflexGameClient />;
}
