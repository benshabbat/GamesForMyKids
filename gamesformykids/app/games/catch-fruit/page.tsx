import { Metadata } from 'next';
import CatchFruitClient from './CatchFruitClient';

export const metadata: Metadata = {
  title: 'תפוס פירות | GamesForMyKids',
  description: 'הזז את הסל ותפוס את הפירות הנופלים!',
};

export default function CatchFruitPage() {
  return <CatchFruitClient />;
}
