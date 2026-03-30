import ScienceGameClient from './ScienceGameClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדע לילדים | GamesForMyKids',
  description: 'גוף, חלל, טבע, פיזיקה וכימיה — מדע כיפי לילדים!',
};

export default function SciencePage() {
  return <ScienceGameClient />;
}
