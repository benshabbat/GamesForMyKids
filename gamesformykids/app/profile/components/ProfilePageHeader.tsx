import Link from 'next/link';

export function ProfilePageHeader() {
  return (
    <div className="text-center mb-8">
      <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
        ← חזור לדף הבית
      </Link>
      <h1 className="text-3xl font-bold text-purple-800">הפרופיל שלי</h1>
    </div>
  );
}
