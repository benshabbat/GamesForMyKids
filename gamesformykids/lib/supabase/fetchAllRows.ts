/**
 * Supabase's Data API returns at most 1000 rows per select by default, silently.
 * Admin stats that aggregate in JS need every row, so page through with range().
 * The query must have a stable order (e.g. `.order('id')`) or pages can overlap.
 */
export async function fetchAllRows<T>(
  page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
  pageSize = 1000,
): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await page(from, from + pageSize - 1);
    if (error) throw error;
    rows.push(...(data ?? []));
    if (!data || data.length < pageSize) return rows;
  }
}
