/**
 * Hook לניהול מערכת רמזים חכמה
 * מספק רמזים מותאמים אישית בהתבסס על טעויות השחקן
 */

import { useState, useEffect, useCallback } from 'react';
import { BaseGameItem } from '@/lib/types/core/base';
import { UseGameHintsProps, Hint, UseGameHintsReturn } from '@/lib/types/hooks/ui';

export function useGameHints({ currentChallenge, wrongAttempts }: UseGameHintsProps): UseGameHintsReturn {
  const [hints, setHints] = useState<Hint[]>([]);
  const [revealedHintsCount, setRevealedHintsCount] = useState(0);

  // Generate contextual hints based on the challenge
  const generateHints = useCallback((challenge: BaseGameItem): Hint[] => {
    const hints: Hint[] = [];

    // Sound hint - based on color which can give audio cues
    if (challenge.color) {
      hints.push({
        type: 'sound',
        text: `🔊 הקשב שוב לשם`,
        audioText: challenge.hebrew,
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
      setHints(prev => prev.map((hint, index) => 
        index === revealedHintsCount 
          ? { ...hint, isRevealed: true }
          : hint
      ));
      setRevealedHintsCount(prev => prev + 1);
    }
  }, [hints.length, revealedHintsCount]);

  // Auto-reveal hints based on wrong attempts
  useEffect(() => {
    if (wrongAttempts > 0 && wrongAttempts <= hints.length) {
      revealNextHint();
    }
  }, [wrongAttempts, revealNextHint, hints.length]);

  // Reset hints when challenge changes
  useEffect(() => {
    if (currentChallenge) {
      const newHints = generateHints(currentChallenge);
      setHints(newHints);
      setRevealedHintsCount(0);
    }
  }, [currentChallenge, generateHints]);

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

  // Reset all hints
  const resetHints = useCallback(() => {
    setRevealedHintsCount(0);
    setHints([]);
  }, []);

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
