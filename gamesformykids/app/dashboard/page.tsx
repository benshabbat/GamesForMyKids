import { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'לוח המחוונים | GamesForMyKids',
  description: 'עקוב אחר ההתקדמות, הישגים וניקודים',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
