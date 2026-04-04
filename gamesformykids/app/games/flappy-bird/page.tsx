import { Metadata } from 'next';
import FlappyBirdClient from './FlappyBirdClient';

export const metadata: Metadata = {
  title: 'ציפור מעופפת | GamesForMyKids',
  description: 'הקש כדי להרים את הציפור ועזור לה לעבור בין הצינורות!',
};

export default function FlappyBirdPage() {
  return <FlappyBirdClient />;
}
