/**
 * Rendered by Next.js when unauthorized() is called from a Server Component.
 * Returns HTTP 401 — used for auth-protected pages when there is no active session.
 */
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">גישה מוגבלת</h1>
        <p className="text-gray-600 mb-6">
          עליך להיות מחובר כדי לצפות בדף זה.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          כניסה לחשבון
        </a>
      </div>
    </div>
  );
}
