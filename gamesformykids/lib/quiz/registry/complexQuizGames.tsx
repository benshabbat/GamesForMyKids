'use client';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import QuizGameSkeleton from '@/components/ui/QuizGameSkeleton';

/**
 * Games with their own store / multi-phase rendering — loaded lazily.
 */
export const COMPLEX_QUIZ_GAMES: Record<string, ComponentType> = {
  'transport':  dynamic(() => import('@/app/games/transport/TransportGame'),   { ssr: false, loading: () => <QuizGameSkeleton /> }),
  'holidays':   dynamic(() => import('@/app/games/holidays/HolidaysGame'),     { ssr: false, loading: () => <QuizGameSkeleton /> }),
  'tzadikim':   dynamic(() => import('@/app/games/tzadikim/TzadikimGame'),     { ssr: false, loading: () => <QuizGameSkeleton /> }),
  'word-chain': dynamic(() => import('@/app/games/word-chain/WordChainGame'),  { ssr: false, loading: () => <QuizGameSkeleton /> }),
};
