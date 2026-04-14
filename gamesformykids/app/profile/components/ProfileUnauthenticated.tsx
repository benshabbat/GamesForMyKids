import Link from 'next/link';

export function ProfileUnauthenticated() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">נדרשת התחברות</h1>
        <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          התחבר כעת
        </Link>
      </div>
    </div>
  );
}
