-- Migration: add gender to profiles
-- Allows the child profile to store a gender preference used for the
-- DiceBear avatar fallback (male → fun-emoji/boy, female → fun-emoji/girl).
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female')) DEFAULT NULL;
