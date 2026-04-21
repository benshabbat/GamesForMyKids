
import NumberBubblesClient from './NumberBubblesClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('number-bubbles');

export default function Page() { return <NumberBubblesClient />; }
