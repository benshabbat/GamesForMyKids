-- AI-generated coloring pages (Gemini/Imagen), created and owned by a signed-in user.

CREATE TABLE IF NOT EXISTS public.generated_coloring_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_generated_coloring_pages_user_created
  ON public.generated_coloring_pages (user_id, created_at DESC);

ALTER TABLE public.generated_coloring_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generated coloring pages" ON public.generated_coloring_pages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generated coloring pages" ON public.generated_coloring_pages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Storage bucket for the generated PNGs (public read, so getPublicUrl works like the
-- existing "avatars" bucket — unlike that one, this bucket is version-controlled here).
INSERT INTO storage.buckets (id, name, public)
VALUES ('coloring-pages', 'coloring-pages', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access to generated coloring pages"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'coloring-pages');

CREATE POLICY "Users can upload their own generated coloring pages"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'coloring-pages'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
