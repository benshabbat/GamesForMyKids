
import EmojiMathClient from './EmojiMathClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('emoji-math');

export default function Page() { return <EmojiMathClient />; }
