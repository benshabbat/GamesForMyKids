import { Metadata } from 'next';
import SoccerGameClient from './SoccerGameClient';

export const metadata: Metadata = {
  title: 'כדורגל | GamesForMyKids',
  description: 'שאלות טריוויה על ספורט המלכים — כללי, שחקנים, קבוצות, חוקים וטכניקה!',
};

export default function SoccerPage() {
  return <SoccerGameClient />;
}
