import { Metadata } from 'next';
import { unauthorized } from 'next/navigation';
import { connection } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import SettingsClient from './SettingsClient';

export const metadata: Metadata = {
  title: 'הגדרות | GamesForMyKids',
  description: 'התאם אישית את חווית המשחק שלך',
  robots: { index: false },
};

export default async function SettingsPage() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) unauthorized();
  return <SettingsClient />;
}
