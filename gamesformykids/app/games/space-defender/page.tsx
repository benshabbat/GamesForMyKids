import { Metadata } from 'next';
import SpaceDefenderClient from './SpaceDefenderClient';

export const metadata: Metadata = {
  title: 'מגן החלל | GamesForMyKids',
  description: 'ירה באסטרואידים והגן על כדור הארץ!',
};

export default function SpaceDefenderPage() {
  return <SpaceDefenderClient />;
}
