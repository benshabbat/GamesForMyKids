import { describe, expect, it } from 'vitest';
import {
  FRAMES_PER_POINT,
  STAR_BONUS,
  distanceScore,
  totalScore,
} from '@/app/games/meteor-dodge/meteorDodgeScoring';

describe('meteorDodgeScoring', () => {
  describe('distanceScore', () => {
    it('is zero at the start of a run', () => {
      expect(distanceScore(0)).toBe(0);
    });

    it('awards one point per FRAMES_PER_POINT frames, rounded down', () => {
      expect(distanceScore(FRAMES_PER_POINT - 1)).toBe(0);
      expect(distanceScore(FRAMES_PER_POINT)).toBe(1);
      expect(distanceScore(FRAMES_PER_POINT * 10 + 3)).toBe(10);
    });
  });

  describe('totalScore', () => {
    it('equals the survival score when no stars were caught', () => {
      expect(totalScore(400, 0)).toBe(distanceScore(400));
    });

    it('adds the star bonus on top of survival points', () => {
      expect(totalScore(400, STAR_BONUS)).toBe(distanceScore(400) + STAR_BONUS);
    });

    it('keeps the bonus as the frame counter advances (it is not overwritten)', () => {
      const bonus = 2 * STAR_BONUS;
      let previous = totalScore(100, bonus);
      for (let frame = 101; frame <= 200; frame++) {
        const score = totalScore(frame, bonus);
        expect(score).toBeGreaterThanOrEqual(previous);
        expect(score).toBeGreaterThanOrEqual(bonus);
        previous = score;
      }
      expect(totalScore(200, bonus)).toBe(distanceScore(200) + bonus);
    });
  });
});
