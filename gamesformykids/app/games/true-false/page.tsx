import { Metadata } from 'next';
import TrueFalseClient from './TrueFalseClient';
export const metadata: Metadata = { title: '✅ נכון או לא נכון | משחקים לילדים', description: 'האם המשפט נכון? לחץ מהר לפני שהזמן נגמר!' };
export default function Page() { return <TrueFalseClient />; }
