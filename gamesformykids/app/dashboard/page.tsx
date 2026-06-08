import { Metadata } from 'next';
import { unauthorized } from 'next/navigation';
import { connection } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'לוח המחוונים | GamesForMyKids',
  description: 'עקב אחר ההתקדמות, הישגים וניקודים',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) unauthorized();
  return <DashboardClient />;
}
