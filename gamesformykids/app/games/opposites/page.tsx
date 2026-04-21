import OppositesGameClient from './OppositesGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('opposites');

export default function OppositesPage() { return <OppositesGameClient />; }
