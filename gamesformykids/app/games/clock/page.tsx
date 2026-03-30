import ClockGameClient from './ClockGameClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'הכרת השעון | GamesForMyKids',
  description: 'למד לקרוא שעון עם משחק כיפי לילדים!',
};
export default function ClockPage() { return <ClockGameClient />; }
