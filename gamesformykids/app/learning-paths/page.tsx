import type { Metadata } from 'next';
import LearningPathsPageClient from './LearningPathsPageClient';

export const metadata: Metadata = {
  title: 'מסלולי למידה | GamesForMyKids',
  description: 'רצפי משחקים מומלצים סביב נושא — אותיות, מספרים, טבע וזמן',
  keywords: 'מסלולי למידה, תוכנית לימודים, משחקים לילדים, למידה מודרכת',
};

export default function LearningPathsPage() {
  return <LearningPathsPageClient />;
}
