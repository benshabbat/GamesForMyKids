import FractionsGameClient from './FractionsGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('fractions');

export default function FractionsPage() { return <FractionsGameClient />; }
