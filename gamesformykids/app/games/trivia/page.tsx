import TriviaGameClient from './TriviaGameClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ידע כללי | GamesForMyKids',
  description: 'שאלות ידע כללי על טבע, מדע, חלל, היסטוריה ועוד!',
};

export default function TriviaPage() {
  return <TriviaGameClient />;
}
