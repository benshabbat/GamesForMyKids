import { Metadata } from 'next';
import MathRaceClient from './MathRaceClient';
export const metadata: Metadata = { title: '🏎️ מרוץ מתמטיקה | משחקים לילדים', description: 'פתור כמה שיותר תרגילים לפני שהזמן נגמר!' };
export default function Page() { return <MathRaceClient />; }
