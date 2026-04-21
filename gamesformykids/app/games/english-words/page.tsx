import EnglishWordsGameClient from './EnglishWordsGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('english-words');

export default function EnglishWordsPage() {
  return <EnglishWordsGameClient />;
}
