import { describe, expect, it } from 'vitest';
import { finalRotationFor, segmentUnderPointer } from '@/app/games/spinner/spinnerMath';

describe('spinnerMath', () => {
  describe('segmentUnderPointer', () => {
    it('puts segment 0 under the pointer at rotation 0', () => {
      expect(segmentUnderPointer(0, 8)).toBe(0);
    });

    it('moves to the last segment when the wheel turns a little clockwise', () => {
      // Segment 0 starts at the top and runs clockwise, so turning the wheel clockwise
      // slides the previous (last) segment under the pointer.
      expect(segmentUnderPointer(10, 8)).toBe(7);
    });

    it('handles rotations larger than a full turn', () => {
      expect(segmentUnderPointer(360 * 6 + 10, 8)).toBe(7);
    });
  });

  describe('finalRotationFor', () => {
    it('lands the announced segment under the pointer for every segment count and start angle', () => {
      [2, 3, 5, 8, 10, 12, 22].forEach((n) => {
        [0, 17.3, 180, 359.9, 360 * 7 + 123.4].forEach((startRotation) => {
          Array.from({ length: n }, (_, winIndex) => winIndex).forEach((winIndex) => {
            const final = finalRotationFor(startRotation, winIndex, n, 6);
            expect(segmentUnderPointer(final, n)).toBe(winIndex);
          });
        });
      });
    });

    it('always spins forward by at least the requested number of full turns', () => {
      Array.from({ length: 8 }, (_, winIndex) => winIndex).forEach((winIndex) => {
        const final = finalRotationFor(45, winIndex, 8, 5);
        expect(final - 45).toBeGreaterThanOrEqual(5 * 360);
        expect(final - 45).toBeLessThan(6 * 360);
      });
    });
  });
});
