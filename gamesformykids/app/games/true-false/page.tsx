
import TrueFalseClient from './TrueFalseClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('true-false');

export default function Page() { return <TrueFalseClient />; }
