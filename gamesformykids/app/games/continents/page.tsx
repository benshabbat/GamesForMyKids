import { Metadata } from 'next';
import ContinentsGameClient from './ContinentsGameClient';

export const metadata: Metadata = {
  title: 'יבשות העולם | GamesForMyKids',
  description: 'גלה את 7 היבשות של כדור הארץ — עובדות, מדינות ועוד!',
};

export default function ContinentsPage() {
  return <ContinentsGameClient />;
}
