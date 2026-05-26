import Link from 'next/link';

/**
 * Rendered by Next.js when forbidden() is called from a Server Component.
 * Returns HTTP 403 — used when a user is authenticated but lacks permission.
 */
export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">גישה נדחתה</h1>
        <p className="text-gray-600 mb-6">
          אין לך הרשאה לצפות בדף זה.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
