import { Metadata } from 'next';
import ChessClient from './ChessClient';

export const metadata: Metadata = {
  title: 'שחמט | GamesForMyKids',
  description: 'שחק שחמט נגד המחשב!',
};

export default function ChessPage() {
  return <ChessClient />;
}
