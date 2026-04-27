import BuildingGameClient from './BuildingGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('building');

export default function BuildingPage() { return <BuildingGameClient />; }
