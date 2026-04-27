import MemoryClient from './MemoryClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('memory');

export default function MemoryPage() { return <MemoryClient />; }
