import { Metadata } from 'next';
import SheshBeshClient from './SheshBeshClient';

export const metadata: Metadata = {
  title: 'שש-בש | GamesForMyKids',
  description: 'שחק שש-בש קלאסי נגד המחשב!',
};

export default function SheshBeshPage() {
  return <SheshBeshClient />;
}
