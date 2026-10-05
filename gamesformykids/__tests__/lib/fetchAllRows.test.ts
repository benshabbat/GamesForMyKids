import { describe, expect, it, vi } from 'vitest';
import { fetchAllRows } from '@/lib/supabase/fetchAllRows';

const table = Array.from({ length: 2345 }, (_, i) => ({ id: i }));
const pageOf = (from: number, to: number) => Promise.resolve({ data: table.slice(from, to + 1), error: null });

describe('fetchAllRows', () => {
  it('pages past the 1000-row cap until a short page', async () => {
    const page = vi.fn(pageOf);
    const rows = await fetchAllRows(page);
    expect(rows).toHaveLength(2345);
    expect(page.mock.calls).toEqual([[0, 999], [1000, 1999], [2000, 2999]]);
  });

  it('stops after an exactly-full last page with one empty request', async () => {
    const page = vi.fn((from: number, to: number) => Promise.resolve({ data: table.slice(0, 2000).slice(from, to + 1), error: null }));
    expect(await fetchAllRows(page)).toHaveLength(2000);
    expect(page).toHaveBeenCalledTimes(3);
  });

  it('throws the query error instead of returning a partial result', async () => {
    const boom = new Error('permission denied');
    await expect(fetchAllRows(() => Promise.resolve({ data: null, error: boom }))).rejects.toBe(boom);
  });
});
