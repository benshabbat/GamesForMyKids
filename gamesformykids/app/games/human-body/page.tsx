import { Metadata } from 'next';
import HumanBodyGameClient from './HumanBodyGameClient';

export const metadata: Metadata = {
  title: 'גוף האדם | GamesForMyKids',
  description: 'גלה את פלאות גוף האדם — איברים, שרירים, עצמות ועוד!',
};

export default function HumanBodyPage() {
  return <HumanBodyGameClient />;
}
