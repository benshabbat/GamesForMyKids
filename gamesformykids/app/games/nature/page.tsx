import NatureGameClient from './NatureGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('nature');

export default function NaturePage() { return <NatureGameClient />; }
