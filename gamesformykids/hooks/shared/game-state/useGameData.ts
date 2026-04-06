'use client';

import { useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { GameItem, GameTypeDbRecord, UseGameDataReturn } from "@/lib/types/hooks/game-state";
import { useGameDataStore } from '@/lib/stores/gameDataStore';

export function useGameData(): UseGameDataReturn {
  const gameItems = useGameDataStore((s) => s.gameItems);
  const gameTypes = useGameDataStore((s) => s.gameTypes);
  const loading = useGameDataStore((s) => s.loading);
  const error = useGameDataStore((s) => s.error);
  const loaded = useGameDataStore((s) => s.loaded);
  const setGameData = useGameDataStore((s) => s.setGameData);
  const setLoading = useGameDataStore((s) => s.setLoading);
  const setError = useGameDataStore((s) => s.setError);

  const fetchGameData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch game items and types in parallel
      const [itemsResult, typesResult] = await Promise.all([
        supabase
          .from('game_items')
          .select('*')
          .order('category', { ascending: true })
          .order('name', { ascending: true }),
        supabase
          .from('game_types')
          .select('*')
          .eq('is_active', true)
          .order('category', { ascending: true })
          .order('name', { ascending: true })
      ])

      if (itemsResult.error) throw itemsResult.error
      if (typesResult.error) throw typesResult.error

      setGameData(itemsResult.data || [], typesResult.data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'שגיאה בטעינת נתוני המשחקים';
      setError(errorMessage);
      // Log error in development mode only
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching game data:', err);
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loaded) {
      fetchGameData()
    }
  }, [loaded, fetchGameData])

  // Helper functions to get specific categories
  const getItemsByCategory = useCallback((category: string) => {
    return gameItems.filter(item => item.category === category)
  }, [gameItems])

  const getItemsBySubcategory = useCallback((category: string, subcategory?: string) => {
    return gameItems.filter(item => 
      item.category === category && 
      (subcategory ? item.subcategory === subcategory : !item.subcategory)
    )
  }, [gameItems])

  const getGameTypeByName = useCallback((name: string) => {
    return gameTypes.find(type => type.name === name)
  }, [gameTypes])

  const getGameTypesByCategory = useCallback((category: string) => {
    return gameTypes.filter(type => type.category === category)
  }, [gameTypes])

  // Specific getters for common categories
  const colors = getItemsByCategory('colors')
  const shapes = getItemsBySubcategory('shapes')
  const coloredShapes = getItemsBySubcategory('shapes', 'colored')
  const numbers = getItemsByCategory('numbers')
  const letters = getItemsByCategory('letters')
  const animals = getItemsByCategory('animals')
  const fruits = getItemsByCategory('fruits')
  const vegetables = getItemsByCategory('vegetables')

  return {
    // Data
    gameItems,
    gameTypes,
    
    // Loading states
    loading,
    error,
    
    // Helper functions
    getItemsByCategory,
    getItemsBySubcategory,
    getGameTypeByName,
    getGameTypesByCategory,
    refreshData: fetchGameData,
    
    // Quick access to common categories
    colors,
    shapes,
    coloredShapes,
    numbers,
    letters,
    animals,
    fruits,
    vegetables
  }
}

// Hook for specific category
export function useGameItemsByCategory(category: string) {
  const [items, setItems] = useState<GameItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('game_items')
        .select('*')
        .eq('category', category)
        .order('name', { ascending: true })

      if (error) throw error

      setItems(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים')
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    if (category) {
      fetchItems()
    }
  }, [category, fetchItems])

  return {
    items,
    loading,
    error,
    refreshItems: fetchItems
  }
}
