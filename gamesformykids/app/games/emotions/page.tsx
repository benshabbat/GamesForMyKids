import EmotionsGameClient from './EmotionsGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('emotions');

export default function EmotionsPage() { return <EmotionsGameClient />; }
