'use client';

import { useRouter } from 'next/navigation';
import UnifiedHeader from './UnifiedHeader';
import { ComponentTypes } from '@/lib/types';
import { ROUTES } from '@/lib/constants/routes';

type GameHeaderProps = ComponentTypes.GameHeaderProps;

/**
 * 🎯 GameHeader עם props אופציונליים
 */
export default function GameHeader({ onHome }: GameHeaderProps = {}) {
  const router = useRouter();

  return (
    <UnifiedHeader
      title="משחק"
      showScore={true}
      showBackButton={true}
      onBack={onHome ?? (() => router.push(ROUTES.HOME))}
    />
  );
}
