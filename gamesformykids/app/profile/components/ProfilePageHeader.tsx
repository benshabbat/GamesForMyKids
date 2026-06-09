import Link from 'next/link';

export function ProfilePageHeader() {
  return (
    <div className="text-center mb-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
      >
        ← חזור לדף הבית
      </Link>
      <div className="text-5xl mb-3">👤</div>
      <h1 className="text-3xl font-bold text-purple-800">האזור האישי שלי</h1>
      <p className="text-purple-500 mt-1">ניקוד, הישגים והתקדמות</p>
    </div>
  );
}
