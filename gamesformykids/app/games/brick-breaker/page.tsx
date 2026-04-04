import { Metadata } from 'next';
import BrickBreakerClient from './BrickBreakerClient';

export const metadata: Metadata = {
  title: 'שובר לבנים | GamesForMyKids',
  description: 'שבור את כל הלבנים עם הכדור!',
};

export default function BrickBreakerPage() {
  return <BrickBreakerClient />;
}
