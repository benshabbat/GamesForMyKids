'use client';
import { makeGameClient } from '@/components/game/shared/makeGameClient';
export default makeGameClient(() => import('./StackGame'));
