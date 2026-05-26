import { Metadata } from 'next';
import { unauthorized } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'לוח המחוונים | GamesForMyKids',
  description: 'עקוב אחר ההתקדמות, הישגים וניקודים',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) unauthorized();
  return <DashboardClient />;
}
