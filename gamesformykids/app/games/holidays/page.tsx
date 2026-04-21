import HolidaysGameClient from './HolidaysGameClient';
import { Metadata } from 'next';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateGameMetadata('holidays');
}

export default function HolidaysPage() {
  return <HolidaysGameClient />;
}
