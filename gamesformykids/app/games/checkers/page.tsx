import { Metadata } from 'next';
import DamkaClient from './DamkaClient';

export const metadata: Metadata = {
  title: 'דמקה | GamesForMyKids',
  description: 'שחק דמקה קלאסית נגד המחשב!',
};

export default function DamkaPage() {
  return <DamkaClient />;
}
