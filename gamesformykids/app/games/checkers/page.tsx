
import DamkaClient from './DamkaClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('checkers');

export default function DamkaPage() {
  return <DamkaClient />;
}
