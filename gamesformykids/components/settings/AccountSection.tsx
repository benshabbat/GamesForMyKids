import Link from 'next/link';
import type { AccountSectionProps } from '@/lib/types/components';
import { SectionContainer } from './SectionContainer';

export function AccountSection({ onSignOut }: AccountSectionProps) {
  return (
    <SectionContainer title="חשבון" emoji="👤">
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
    </SectionContainer>
  );
}
