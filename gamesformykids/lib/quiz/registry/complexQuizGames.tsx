'use client';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import GameSpinnerScreen from '@/components/ui/GameSpinnerScreen';

/**
 * Games with their own store / multi-phase rendering — loaded lazily.
 */
export const COMPLEX_QUIZ_GAMES: Record<string, ComponentType> = {
  'transport':  dynamic(() => import('@/app/games/transport/TransportGame'),   { ssr: false, loading: () => <GameSpinnerScreen /> }),
  'holidays':   dynamic(() => import('@/app/games/holidays/HolidaysGame'),     { ssr: false, loading: () => <GameSpinnerScreen /> }),
  'tzadikim':   dynamic(() => import('@/app/games/tzadikim/TzadikimGame'),     { ssr: false, loading: () => <GameSpinnerScreen /> }),
  'word-chain': dynamic(() => import('@/app/games/word-chain/WordChainGame'),  { ssr: false, loading: () => <GameSpinnerScreen /> }),
};
