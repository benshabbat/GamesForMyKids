import { Metadata } from 'next';
import PongClient from './PongClient';

export const metadata: Metadata = {
  title: 'פונג | GamesForMyKids',
  description: 'שחק פונג נגד המחשב!',
};

export default function PongPage() {
  return <PongClient />;
}
