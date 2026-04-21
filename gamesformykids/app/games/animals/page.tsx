import AnimalsGameClient from './AnimalsGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('animals');

export default function AnimalsPage() {
  return <AnimalsGameClient />;
}
