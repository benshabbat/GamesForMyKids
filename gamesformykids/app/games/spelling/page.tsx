import SpellingGameClient from './SpellingGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('spelling');

export default function SpellingPage() { return <SpellingGameClient />; }
