import CapitalsGameClient from './CapitalsGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('capitals');

export default function CapitalsPage() { return <CapitalsGameClient />; }
