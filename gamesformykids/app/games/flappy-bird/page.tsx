
import FlappyBirdClient from './FlappyBirdClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('flappy-bird');

export default function FlappyBirdPage() {
  return <FlappyBirdClient />;
}
