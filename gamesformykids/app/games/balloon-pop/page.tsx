import { Metadata } from 'next';
import BalloonPopClient from './BalloonPopClient';

export const metadata: Metadata = {
  title: 'פוצץ בלונים | GamesForMyKids',
  description: 'פוצץ בלונים לפני שהם עפים למעלה!',
};

export default function BalloonPopPage() {
  return <BalloonPopClient />;
}
