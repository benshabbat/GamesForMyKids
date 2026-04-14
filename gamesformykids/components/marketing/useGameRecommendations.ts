"use client";

// Logic moved to featuredGameStore — call initialize() on mount
// Kept for backwards compatibility
export { useFeaturedGameStore as useGameRecommendationsStore } from '@/lib/stores/featuredGameStore';
export type { AgeGroupData } from '@/lib/stores/featuredGameStore';
