'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useDamkaStore } from './damkaStore';

export type { Side, GamePhase, Cell, Board, Pos, DamkaMove } from './damkaStore';

export const useDamkaGame = createShallowHook(useDamkaStore);
