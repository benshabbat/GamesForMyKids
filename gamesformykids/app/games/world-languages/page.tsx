import WorldLanguagesGameClient from './WorldLanguagesGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('world-languages');

export default function WorldLanguagesPage() { return <WorldLanguagesGameClient />; }
