import { Metadata } from 'next';
import { requireAdmin } from '@/lib/supabase/requireAdmin';
import { createAdminClient } from '@/lib/supabase/adminClient';
import { fetchAllRows } from '@/lib/supabase/fetchAllRows';
import { UsersTable, type AdminUserRow } from './UsersTable';

export const metadata: Metadata = {
  title: 'ניהול משתמשים | GamesForMyKids',
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const { supabase, user: currentUser } = await requireAdmin();

  const profiles = await fetchAllRows((from, to) =>
    supabase
      .from('profiles')
      .select('id, full_name, avatar_url, role, created_at')
      .order('created_at', { ascending: false })
      .order('id')
      .range(from, to)
  );

  // Ban status lives on auth.users, not profiles — needs the service-role client.
  const bannedIds = new Set<string>();
  try {
    const admin = createAdminClient();
    const perPage = 1000;
    for (let page = 1; ; page++) {
      const { data: authUsers, error } = await admin.auth.admin.listUsers({ page, perPage });
      if (error) break;
      const users = authUsers?.users ?? [];
      for (const u of users) {
        if (u.banned_until && new Date(u.banned_until) > new Date()) bannedIds.add(u.id);
      }
      if (users.length < perPage) break;
    }
  } catch {
    // Service role not configured yet — suspend status just won't show; role/delete still work.
  }

  const rows: AdminUserRow[] = profiles.map((p) => ({
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
