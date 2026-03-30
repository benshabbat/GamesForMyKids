import SpellingGameClient from './SpellingGameClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'כתיב עברי | GamesForMyKids',
  description: 'תרגל כתיב נכון בעברית עם משחק מהנה!',
};
export default function SpellingPage() { return <SpellingGameClient />; }
