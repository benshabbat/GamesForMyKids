import { Metadata } from 'next';
import { unauthorized } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
  title: 'הפרופיל שלי | GamesForMyKids',
  description: 'נהל את פרטי החשבון שלך',
  robots: { index: false },
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) unauthorized();
  return <ProfileClient />;
}
