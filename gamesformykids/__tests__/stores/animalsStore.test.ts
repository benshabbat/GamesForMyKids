import { describe, it, expect, beforeEach } from 'vitest';
import { useAnimalsStore, makeAnimalQuestion, buildAnimalPool } from '@/lib/stores/animalsStore';

beforeEach(() => {
  useAnimalsStore.getState().reset();
});

describe('animalsStore helpers', () => {
  describe('buildAnimalPool', () => {
    it('"all" returns a non-empty array', () => {
      const pool = buildAnimalPool('all');
      expect(pool.length).toBeGreaterThan(0);
    });

    it('category filter returns only animals of that category', () => {
      const allPool = buildAnimalPool('all');
      const categories = [...new Set(allPool.map(a => a.category))] as Parameters<typeof buildAnimalPool>[0][];
      if (categories.length === 0) return;
      const cat = categories[0]!;
      const filtered = buildAnimalPool(cat);
      expect(filtered.every(a => a.category === cat)).toBe(true);
      expect(filtered.length).toBeGreaterThan(0);
    });
  });

  describe('makeAnimalQuestion', () => {
    it('returns a question with an animal and 4 choices', () => {
      const pool = buildAnimalPool('all');
      const q = makeAnimalQuestion(pool);
      expect(q.animal).toBeDefined();
      expect(q.choices).toHaveLength(4);
    });

    it('the correct animal is always among the choices', () => {
      const pool = buildAnimalPool('all');
      for (let i = 0; i < 10; i++) {
        const q = makeAnimalQuestion(pool);
        expect(q.choices.some(c => c.id === q.animal.id)).toBe(true);
      }
    });

    it('choices are unique (no duplicates)', () => {
      const pool = buildAnimalPool('all');
      const q = makeAnimalQuestion(pool);
      const ids = q.choices.map(c => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('mode is either emoji-to-name or name-to-emoji', () => {
      const pool = buildAnimalPool('all');
      const q = makeAnimalQuestion(pool);
      expect(['emoji-to-name', 'name-to-emoji']).toContain(q.mode);
    });
  });
});

describe('animalsStore', () => {
  it('initial state has empty questions', () => {
    expect(useAnimalsStore.getState().questions).toHaveLength(0);
  });

  it('setQuestions updates category and questions', () => {
    const pool = buildAnimalPool('all');
    const qs = [makeAnimalQuestion(pool), makeAnimalQuestion(pool)];
    useAnimalsStore.getState().setQuestions('all', qs);
    const s = useAnimalsStore.getState();
    expect(s.category).toBe('all');
    expect(s.questions).toHaveLength(2);
  });

  it('reset clears questions', () => {
    const pool = buildAnimalPool('all');
    useAnimalsStore.getState().setQuestions('all', [makeAnimalQuestion(pool)]);
    useAnimalsStore.getState().reset();
    expect(useAnimalsStore.getState().questions).toHaveLength(0);
  });
});
