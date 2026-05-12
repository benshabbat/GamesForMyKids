-- Migration: add last_score to game_progress
-- Run: ALTER TABLE public.game_progress ADD COLUMN IF NOT EXISTS last_score INTEGER DEFAULT 0;
ALTER TABLE public.game_progress ADD COLUMN IF NOT EXISTS last_score INTEGER DEFAULT 0;
