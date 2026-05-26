'use client';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Games with their own store / multi-phase rendering — loaded lazily.
 */
export const COMPLEX_QUIZ_GAMES: Record<string, ComponentType> = {
  'transport': dynamic(() => import('@/app/games/transport/TransportGame')),
  'holidays':  dynamic(() => import('@/app/games/holidays/HolidaysGame')),
  'tzadikim':  dynamic(() => import('@/app/games/tzadikim/TzadikimGame')),
};
