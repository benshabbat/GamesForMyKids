import PuzzlesClient from './PuzzlesClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('puzzles');

export default function PuzzlesPage() { return <PuzzlesClient />; }