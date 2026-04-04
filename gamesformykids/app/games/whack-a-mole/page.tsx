import { Metadata } from 'next';
import WhackAMoleClient from './WhackAMoleClient';

export const metadata: Metadata = {
  title: 'חבט על החפרפרת | GamesForMyKids',
  description: 'חבט על החפרפרות לפני שהן נעלמות!',
};

export default function WhackAMolePage() {
  return <WhackAMoleClient />;
}
