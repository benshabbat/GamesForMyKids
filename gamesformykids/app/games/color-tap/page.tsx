
import ColorTapClient from './ColorTapClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('color-tap');

export default function Page() {
  return <ColorTapClient />;
}
