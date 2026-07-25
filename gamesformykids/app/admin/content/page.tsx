import { Metadata } from 'next';
import { requireAdmin } from '@/lib/supabase/requireAdmin';

export const metadata: Metadata = {
  title: 'ניהול תוכן | GamesForMyKids',
  robots: { index: false, follow: false },
};

// Static list — lib/quiz/data/ content is build-time TS, not DB-backed (v1: read-only stats only).
const QUIZ_DATA_FILES = [
  'adjectives', 'alphabet-order', 'blessings', 'body', 'capitals', 'city-builder', 'clock',
  'color-mix', 'continents', 'division', 'emotions', 'english-words', 'family', 'final-letters',
  'fractions', 'gematria', 'gender', 'healthy-food', 'instruments', 'israel', 'life-cycles',
  'math-stories', 'mispar-bonds', 'morning-routine', 'nature', 'nikud', 'opposites', 'patterns',
  'phonics', 'proverbs', 'rhyming', 'riddles-pro', 'riddles', 'science', 'sequences',
  'shapes-3d', 'singular-plural', 'skip-counting', 'soccer', 'sorting', 'spelling', 'sports-quiz',
  'storyBuilderData', 'trivia-categories', 'trivia', 'verbs', 'visual-addition', 'visual-logic',
  'word-chain', 'word-wheel', 'world-languages',
] as const;

async function countEntries(file: string): Promise<number> {
  try {
    const mod: Record<string, unknown> = await import(`@/lib/quiz/data/${file}`);
    const firstArray = Object.values(mod).find((v) => Array.isArray(v)) as unknown[] | undefined;
    return firstArray?.length ?? 0;
  } catch {
    return 0;
  }
}

export default async function AdminContentPage() {
  await requireAdmin();

  const counts = await Promise.all(QUIZ_DATA_FILES.map((f) => countEntries(f)));
  const rows = QUIZ_DATA_FILES.map((file, i) => ({ file, count: counts[i] }));
  const total = counts.reduce((sum, c) => sum + c, 0);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        📚 תוכן חידות ושאלות — {rows.length} קבצים, {total} פריטים
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        תוכן זה קבוע בקוד (build-time) ואינו ניתן לעריכה מכאן — תצוגה בלבד.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {rows.map(({ file, count }) => (
          <div key={file} className="flex justify-between border-b border-gray-50 py-2 text-sm">
            <span className="text-gray-700">{file}.ts</span>
            <span className="text-gray-500">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
