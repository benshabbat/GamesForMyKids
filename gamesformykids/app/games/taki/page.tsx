import { Metadata } from 'next';
import TakiClient from './TakiClient';

export const metadata: Metadata = {
  title: 'טאקי | GamesForMyKids',
  description: 'שחק טאקי — משחק הקלפים הישראלי הקלאסי נגד המחשב!',
};

export default function TakiPage() {
  return <TakiClient />;
}
