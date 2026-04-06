/**
 * Hook לניהול מערכת רמזים חכמה
 * מספק רמזים מותאמים אישית בהתבסס על טעויות השחקן
 */

'use client';

import { useEffect, useCallback } from 'react';
import { BaseGameItem } from '@/lib/types/core/base';
import { GameHint } from '@/lib/types/hooks/ui';
import { UseGameHintsProps, UseGameHintsReturn } from '@/lib/types/hooks/ui';
import { useGameHintsStore } from '@/lib/stores/gameHintsStore';

export function useGameHints(props: UseGameHintsProps): UseGameHintsReturn {
  const hints = useGameHintsStore((s) => s.hints);
  const revealedHintsCount = useGameHintsStore((s) => s.revealedHintsCount);
  const { setHints, revealNextHint: storeRevealNext, resetHints } = useGameHintsStore();
  
  // Extract props with defaults
  const { currentChallenge, wrongAttempts = 0 } = props;

  // Generate contextual hints based on the challenge
  const generateHints = useCallback((challenge: BaseGameItem): GameHint[] => {
    const hints: GameHint[] = [];

        // Sound hint - based on color which can give audio cues
    if (challenge.color) {
      hints.push({
        type: 'sound',
        text: `🔊 הקשב שוב לשם`,
        isRevealed: false,
        order: 1
      });
    }

    // Color hint
    if (challenge.color) {
      hints.push({
        type: 'color',
        text: `🎨 הצבע הוא: ${challenge.color}`,
        isRevealed: false,
        order: 2
      });
    }

    // English hint
    if (challenge.english && challenge.english !== challenge.hebrew) {
      hints.push({
        type: 'description',
        text: `🌍 באנגלית: ${challenge.english}`,
        isRevealed: false,
        order: 3
      });
    }

    // Visual hint - show the emoji
    if (challenge.emoji) {
      hints.push({
        type: 'visual',
        text: `� רמז ראייתי: ${challenge.emoji}`,
        isRevealed: false,
        order: 4
      });
    }

    // Name hint - first letter
    if (challenge.hebrew) {
      const firstLetter = challenge.hebrew.charAt(0);
      hints.push({
        type: 'description',
        text: `� מתחיל באות: ${firstLetter}`,
        isRevealed: false,
        order: 5
      });
    }

    return hints.sort((a, b) => a.order - b.order);
  }, []);

  // Reveal hints based on wrong attempts
  const revealNextHint = useCallback(() => {
    if (revealedHintsCount < hints.length) {
      storeRevealNext();
    }
  }, [hints.length, revealedHintsCount, storeRevealNext]);

  // Auto-reveal hints based on wrong attempts
  useEffect(() => {
    if (wrongAttempts > 0 && wrongAttempts <= hints.length) {
      revealNextHint();
    }
  }, [wrongAttempts, revealNextHint, hints.length]);

  // Reset hints when challenge changes
  useEffect(() => {
    if (currentChallenge) {
      setHints(generateHints(currentChallenge));
    }
  }, [currentChallenge, generateHints, setHints]);

  // Get currently revealed hints
  const getRevealedHints = useCallback(() => {
    return hints.filter(hint => hint.isRevealed);
  }, [hints]);

  // Check if more hints are available
  const hasMoreHints = useCallback(() => {
    return revealedHintsCount < hints.length;
  }, [revealedHintsCount, hints.length]);

  // Manually reveal next hint (for hint button)
  const showNextHint = useCallback(() => {
    if (hasMoreHints()) {
      revealNextHint();
    }
  }, [hasMoreHints, revealNextHint]);

  // resetHints comes directly from the store (no wrapper needed)

  return {
    hints: getRevealedHints(),
    hasMoreHints: hasMoreHints(),
    showNextHint,
    resetHints,
    revealedHintsCount,
    revealedCount: revealedHintsCount,
    totalHints: hints.length,
  };
}
