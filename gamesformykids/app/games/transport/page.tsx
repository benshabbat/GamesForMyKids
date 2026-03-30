import { Metadata } from 'next';
import TransportGameClient from './TransportGameClient';

export const metadata: Metadata = {
  title: 'כלי תחבורה | GamesForMyKids',
  description: 'גלה כלי תחבורה מהיבשה, הים והאוויר!',
};

export default function TransportPage() {
  return <TransportGameClient />;
}
