import WordBuilderGameClient from './WordBuilderGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('word-builder');

export default function WordBuilderPage() {
  return <WordBuilderGameClient />;
}
