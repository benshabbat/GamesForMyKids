import { Metadata } from 'next';
import WordScrambleClient from './WordScrambleClient';
export const metadata: Metadata = { title: '🔡 מילים מבולבלות | משחקים לילדים', description: 'סדר את האותיות וגלה את המילה הסודית!' };
export default function Page() { return <WordScrambleClient />; }
