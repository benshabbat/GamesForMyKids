
import MathRaceClient from './MathRaceClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('math-race');

export default function Page() { return <MathRaceClient />; }
