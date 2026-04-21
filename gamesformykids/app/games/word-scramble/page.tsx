
import WordScrambleClient from './WordScrambleClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('word-scramble');

export default function Page() { return <WordScrambleClient />; }
