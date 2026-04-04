import { Metadata } from 'next';
import EmojiMathClient from './EmojiMathClient';
export const metadata: Metadata = { title: '🧮 מתמטיקה עם אמוג\'י | משחקים לילדים', description: 'ספור את האמוג\'י ופתור את התרגיל!' };
export default function Page() { return <EmojiMathClient />; }
