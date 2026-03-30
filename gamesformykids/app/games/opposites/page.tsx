import OppositesGameClient from './OppositesGameClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ניגודים | GamesForMyKids',
  description: 'למד הפכים בעברית! גדול-קטן, חם-קר ועוד.',
};
export default function OppositesPage() { return <OppositesGameClient />; }
