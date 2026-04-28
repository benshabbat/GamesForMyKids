import Link from 'next/link';

interface Props {
  onSignOut: () => void;
}

export function AccountSection({ onSignOut }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        👤 חשבון
      </h2>
      <div className="space-y-4">
        <Link
          href="/profile"
          className="block w-full text-left p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
        >
          ערוך פרופיל
        </Link>
        <button
          onClick={onSignOut}
          className="block w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          התנתק מהחשבון
        </button>
      </div>
    </div>
  );
}
