import { useState, useCallback } from 'react';
import { Block } from '../types';
import { ACHIEVEMENTS } from '../constants';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const checkAchievements = useCallback((blocks: Block[]) => {
    // Builder achievement
    if (blocks.length >= ACHIEVEMENTS.BUILDER.threshold && !achievements.includes(ACHIEVEMENTS.BUILDER.id)) {
      setAchievements(prev => [...prev, ACHIEVEMENTS.BUILDER.id]);
    }

    // Star collector achievement
    const starCount = blocks.filter(b => b.shape === ACHIEVEMENTS.STAR_COLLECTOR.shape).length;
    if (starCount >= ACHIEVEMENTS.STAR_COLLECTOR.threshold && !achievements.includes(ACHIEVEMENTS.STAR_COLLECTOR.id)) {
      setAchievements(prev => [...prev, ACHIEVEMENTS.STAR_COLLECTOR.id]);
    }
  }, [achievements]);

  const addScore = useCallback((points: number) => {
    setScore(prev => prev + points);
  }, []);

  return {
    achievements,
    score,
    checkAchievements,
    addScore
  };
};
