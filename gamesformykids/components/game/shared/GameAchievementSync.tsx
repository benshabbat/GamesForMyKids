'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useProgressTrackingStore } from '@/lib/stores/progressTrackingStore';
import { useAchievementsStore } from '@/lib/stores/achievementsStore';
import { useUIStore } from '@/lib/stores';
import {
  checkAchievements,
  getLocalAchievementTypes,
  saveLocalAchievementType,
} from '@/lib/utils/engagement/checkAchievements';
import { findAchievement, insertAchievement } from '@/lib/supabase/achievements';

/**
 * Mounts once in games layout. Subscribes to progressTrackingStore and
 * awards achievements whenever a new session is added.
 * Works for both logged-in users (Supabase) and guests (localStorage).
 */
export default function GameAchievementSync() {
  const { user } = useAuth();
  const { prependAchievement } = useAchievementsStore();
  const addNotification = useUIStore((s) => s.addNotification);
  const lastCountRef = useRef<number>(
    useProgressTrackingStore.getState().allSessions.length,
  );

  useEffect(() => {
    const unsub = useProgressTrackingStore.subscribe((state) => {
      const sessions = state.allSessions;
      if (sessions.length <= lastCountRef.current) return;

      const newSession = sessions[sessions.length - 1];
      lastCountRef.current = sessions.length;

      if (!newSession) return;

      const alreadyEarned = user
        ? new Set<string>() // Supabase handles idempotency via findAchievement
        : getLocalAchievementTypes();

      const earned = checkAchievements(sessions, newSession, alreadyEarned);

      for (const a of earned) {
        // Show toast notification
        addNotification(`${a.icon} הישג חדש: ${a.name}! ${a.description}`, 'success');

        if (user) {
          findAchievement(user.id, a.type, a.gameType).then((existing) => {
            if (existing) return;
            insertAchievement(user.id, {
              achievement_type: a.type,
              achievement_name: a.name,
              description: a.description,
              icon: a.icon,
              game_type: a.gameType || null,
              metadata: {},
            }).then((row) => {
              prependAchievement(row);
            }).catch(() => {});
          }).catch(() => {});
        } else {
          saveLocalAchievementType(a.type);
        }
      }
    });

    return unsub;
  }, [user, prependAchievement, addNotification]);

  return null;
}
