import { describe, expect, it } from 'vitest';
import { LOCATIONS } from '@/app/games/israel-map/data/locations';

const factOf = (id: string) => LOCATIONS.find((l) => l.id === id)?.fact ?? '';

describe('israel-map facts', () => {
  it('describes the visible walls of Acre as Ottoman, not Crusader', () => {
    const fact = factOf('acre');
    expect(fact).toContain('העות׳מאנים');
    expect(fact).not.toContain('חומות שנבנו בתקופת הצלבנים');
  });

  it('calls Ramla a mixed city in proper Hebrew', () => {
    expect(factOf('ramla')).toContain('עיר מעורבת');
    expect(factOf('ramla')).not.toContain('מיקס');
  });

  it('calls the Kinneret a freshwater lake, not the biggest sea', () => {
    const fact = factOf('kinneret');
    expect(fact).toContain('אגם');
    expect(fact).toContain('מתוקים');
    expect(fact).not.toContain('הים הגדול');
  });
});
