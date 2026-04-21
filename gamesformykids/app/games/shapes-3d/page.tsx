import Shapes3DGameClient from './Shapes3DGameClient';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';

export const metadata = generateGameMetadata('shapes-3d');

export default function Shapes3DPage() { return <Shapes3DGameClient />; }
