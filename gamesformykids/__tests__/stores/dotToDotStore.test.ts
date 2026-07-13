import { beforeEach, describe, expect, it } from 'vitest';
import { useDotToDotStore } from '@/app/games/dot-to-dot/dotToDotStore';
import { getPictureById } from '@/app/games/dot-to-dot/data/pictures';

const store = useDotToDotStore;

beforeEach(() => {
  store.setState({ phase: 'menu', pictureId: null, connected: 0 });
});

describe('dotToDotStore', () => {
  describe('selectPicture', () => {
    it('sets the picture, resets connected count, and enters playing phase', () => {
      store.getState().selectPicture('star');
      const { phase, pictureId, connected } = store.getState();
      expect(phase).toBe('playing');
      expect(pictureId).toBe('star');
      expect(connected).toBe(0);
    });
  });

  describe('clickDot', () => {
    it('advances connected count when clicking the next expected dot', () => {
      store.getState().selectPicture('star');
      store.getState().clickDot(0);
      expect(store.getState().connected).toBe(1);
    });

    it('ignores out-of-order clicks', () => {
      store.getState().selectPicture('star');
      store.getState().clickDot(5);
      expect(store.getState().connected).toBe(0);
    });

    it('is a no-op if no picture is selected', () => {
      store.getState().clickDot(0);
      expect(store.getState().connected).toBe(0);
      expect(store.getState().phase).toBe('menu');
    });

    it('flips phase to complete once every dot is connected', () => {
      store.getState().selectPicture('star');
      const total = getPictureById('star')!.points.length;
      for (let i = 0; i < total; i++) store.getState().clickDot(i);
      expect(store.getState().connected).toBe(total);
      expect(store.getState().phase).toBe('complete');
    });
  });

  describe('reset', () => {
    it('replays the same picture from zero without returning to the menu', () => {
      store.getState().selectPicture('cat');
      store.getState().clickDot(0);
      store.getState().reset();
      const { phase, pictureId, connected } = store.getState();
      expect(phase).toBe('playing');
      expect(pictureId).toBe('cat');
      expect(connected).toBe(0);
    });
  });

  describe('backToMenu', () => {
    it('clears the picture and returns to the menu phase', () => {
      store.getState().selectPicture('fish');
      store.getState().backToMenu();
      const { phase, pictureId, connected } = store.getState();
      expect(phase).toBe('menu');
      expect(pictureId).toBeNull();
      expect(connected).toBe(0);
    });
  });
});
