
import DinoRunnerClient from './DinoRunnerClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('dino-runner');

export default function DinoRunnerPage() {
  return <DinoRunnerClient />;
}
