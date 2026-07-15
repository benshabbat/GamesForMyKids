import { Metadata } from 'next';
import { unauthorized } from 'next/navigation';
import { connection } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import DotToDotEditorClient from './DotToDotEditorClient';

export const metadata: Metadata = {
  title: 'עורך נקודה לנקודה | משחקים לילדים',
  robots: { index: false, follow: false },
};

export default async function DotToDotEditorPage() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) unauthorized();

  return <DotToDotEditorClient />;
}
