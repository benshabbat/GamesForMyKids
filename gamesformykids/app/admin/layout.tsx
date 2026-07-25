import { Metadata } from 'next';
import Link from 'next/link';
import { connection } from 'next/server';
import { requireAdmin } from '@/lib/supabase/requireAdmin';

export const metadata: Metadata = {
  title: 'ניהול | GamesForMyKids',
  robots: { index: false, follow: false },
};

const NAV_ITEMS = [
  { href: '/admin/users', label: '👤 משתמשים' },
  { href: '/admin/analytics', label: '📊 אנליטיקס' },
  { href: '/admin/games', label: '🎮 משחקים' },
  { href: '/admin/content', label: '📚 תוכן' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await connection();
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-4">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🛠️ פאנל ניהול</h1>
          <nav className="flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-xl shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← חזרה לאתר
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
