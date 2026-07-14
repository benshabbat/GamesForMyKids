/**
 * ===============================================
 * Supabase Service — Generated Coloring Pages
 * ===============================================
 * All raw `supabase.from('generated_coloring_pages')` calls live here.
 * Inserts happen server-side only (app/api/coloring/generate/route.ts).
 */

import { supabase } from './client';

export interface GeneratedColoringPage {
  id: string;
  user_id: string;
  prompt: string;
  image_url: string;
  width: number;
  height: number;
  created_at: string;
}

/** Fetch a user's own generated coloring pages, most recent first. */
export async function fetchGeneratedColoringPages(userId: string): Promise<GeneratedColoringPage[]> {
  const { data, error } = await supabase
    .from('generated_coloring_pages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as GeneratedColoringPage[];
}
