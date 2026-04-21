
import SnakeClient from './SnakeClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('snake');

export default function SnakePage() {
  return <SnakeClient />;
}
