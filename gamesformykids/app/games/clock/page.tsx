import ClockGameClient from './ClockGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('clock');

export default function ClockPage() { return <ClockGameClient />; }
