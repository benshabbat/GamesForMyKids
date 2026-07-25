import { Metadata } from 'next';
import { requireAdmin } from '@/lib/supabase/requireAdmin';
import { createAdminClient } from '@/lib/supabase/adminClient';
import { UsersTable, type AdminUserRow } from './UsersTable';

export const metadata: Metadata = {
  title: 'ניהול משתמשים | GamesForMyKids',
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const { supabase, user: currentUser } = await requireAdmin();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, role, created_at')
    .order('created_at', { ascending: false });

  // Ban status lives on auth.users, not profiles — needs the service-role client.
  // perPage covers this app's user-scale; would need pagination if it ever grows large.
  const bannedIds = new Set<string>();
  try {
    const { data: authUsers } = await createAdminClient().auth.admin.listUsers({ perPage: 1000 });
    for (const u of authUsers?.users ?? []) {
      if (u.banned_until && new Date(u.banned_until) > new Date()) bannedIds.add(u.id);
    }
  } catch {
    // Service role not configured yet — suspend status just won't show; role/delete still work.
  }

  const rows: AdminUserRow[] = (profiles ?? []).map((p) => ({
    id: p.id,
    full_name: p.full_name,
    avatar_url: p.avatar_url,
    role: p.role,
    created_at: p.created_at,
    banned: bannedIds.has(p.id),
  }));

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">👤 משתמשים ({rows.length})</h2>
      <UsersTable users={rows} currentUserId={currentUser.id} />
    </div>
  );
}
