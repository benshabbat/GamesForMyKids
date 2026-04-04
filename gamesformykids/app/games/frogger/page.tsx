import { Metadata } from 'next';
import FroggerClient from './FroggerClient';

export const metadata: Metadata = {
  title: '🐸 צפרדע חוצה | משחקים לילדים',
  description: 'עזור לצפרדע לחצות את הכביש בשלום — הימנע מהמכוניות!',
};

export default function Page() {
  return <FroggerClient />;
}
