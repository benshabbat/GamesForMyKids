import { Metadata } from 'next';
import FamilyGameClient from './FamilyGameClient';

export const metadata: Metadata = {
  title: 'המשפחה | GamesForMyKids',
  description: 'לימוד על קשרים משפחתיים — סבא, סבתא, דוד, דודה ועוד!',
};

export default function FamilyPage() {
  return <FamilyGameClient />;
}
