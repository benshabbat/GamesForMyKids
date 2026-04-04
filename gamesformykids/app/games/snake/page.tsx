import { Metadata } from 'next';
import SnakeClient from './SnakeClient';

export const metadata: Metadata = {
  title: 'נחש | GamesForMyKids',
  description: 'שחק בנחש הקלאסי — אסוף תפוחים וגדל!',
};

export default function SnakePage() {
  return <SnakeClient />;
}
