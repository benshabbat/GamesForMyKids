import SequencesGameClient from './SequencesGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('sequences');

export default function SequencesPage() { return <SequencesGameClient />; }
