import SequencesGameClient from './SequencesGameClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'סדרות מספרים | GamesForMyKids',
  description: 'מצא את המספר הבא בסדרה! משחק חשיבה מתמטית לילדים.',
};
export default function SequencesPage() { return <SequencesGameClient />; }
