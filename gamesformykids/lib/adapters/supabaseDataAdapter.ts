/**
 * Supabase Data Adapter
 * 
 * This adapter converts data from Supabase format to the existing
 * application format, maintaining compatibility while using the database.
 */

import { BaseGameItem } from '../types/base';
import { NumberItem, ShapeItem } from '../types/games';
import { GameItem } from '@/hooks'

// Define colored shape item type for typed returns
export interface ColoredShapeItem {
  name: string
  hebrew: string
  english: string
  emoji: string
  color: string
  sound: number[]
  shape: string
  shapeHebrew: string
  svg: string
  value: string
  tailwindClass: string
}

/**
 * Convert Supabase GameItem to BaseGameItem format
 */
export function convertToBaseGameItem(dbItem: GameItem): BaseGameItem {
  return {
    name: dbItem.name,
    hebrew: dbItem.hebrew,
    english: dbItem.english,
    emoji: dbItem.emoji,
    color: dbItem.color_class || '',
    sound: dbItem.sound_frequencies || []
  }
}

/**
 * Convert Supabase GameItem to NumberItem format
 */
export function convertToNumberItem(dbItem: GameItem): NumberItem {
  return {
    name: dbItem.name,
    hebrew: dbItem.hebrew,
    english: dbItem.english,
    emoji: dbItem.emoji,
    digit: dbItem.additional_data?.digit || '',
    color: dbItem.color_class || '',
    sound: dbItem.sound_frequencies || []
  }
}

/**
 * Convert Supabase GameItem to ShapeItem format
 */
export function convertToShapeItem(dbItem: GameItem): ShapeItem {
  return {
    name: dbItem.name,
    hebrew: dbItem.hebrew,
    english: dbItem.english,
    emoji: dbItem.emoji,
    color: dbItem.color_class || '',
    sound: dbItem.sound_frequencies || [],
    svg: dbItem.additional_data?.svg || dbItem.name
  }
}

/**
 * Batch convert multiple items
 */
export function convertGameItemsToBaseItems(dbItems: GameItem[]): BaseGameItem[] {
  return dbItems.map(convertToBaseGameItem)
}

export function convertGameItemsToNumberItems(dbItems: GameItem[]): NumberItem[] {
  return dbItems.map(convertToNumberItem)
}

export function convertGameItemsToShapeItems(dbItems: GameItem[]): ShapeItem[] {
  return dbItems.map(convertToShapeItem)
}

/**
 * Create pronunciation dictionary from database items
 */
export function createPronunciationDictionary(dbItems: GameItem[]): Record<string, string> {
  return dbItems.reduce((dict, item) => {
    dict[item.name] = item.hebrew
    return dict
  }, {} as Record<string, string>)
}

/**
 * Filter items by category and convert to appropriate type
 */
export function getColorItems(dbItems: GameItem[]): BaseGameItem[] {
  return convertGameItemsToBaseItems(
    dbItems.filter(item => item.category === 'colors')
  )
}

export function getShapeItems(dbItems: GameItem[]): ShapeItem[] {
  return convertGameItemsToShapeItems(
    dbItems.filter(item => item.category === 'shapes' && !item.subcategory)
  )
}

export function getColoredShapeItems(dbItems: GameItem[]): ColoredShapeItem[] {
  return dbItems
    .filter(item => item.category === 'shapes' && item.subcategory === 'colored')
    .map(item => ({
      name: item.name,
      hebrew: item.hebrew,
      english: item.english,
      emoji: item.emoji,
      color: item.color_class || '',
      sound: item.sound_frequencies || [],
      shape: item.additional_data?.shape || '',
      shapeHebrew: item.additional_data?.shapeHebrew || '',
      svg: item.additional_data?.svg || '',
      value: item.additional_data?.value || '',
      tailwindClass: item.additional_data?.tailwindClass || ''
    }))
}

export function getNumberItems(dbItems: GameItem[]): NumberItem[] {
  return convertGameItemsToNumberItems(
    dbItems.filter(item => item.category === 'numbers')
  )
}

export function getLetterItems(dbItems: GameItem[]): BaseGameItem[] {
  return convertGameItemsToBaseItems(
    dbItems.filter(item => item.category === 'letters')
  )
}

export function getAnimalItems(dbItems: GameItem[]): BaseGameItem[] {
  return convertGameItemsToBaseItems(
    dbItems.filter(item => item.category === 'animals')
  )
}

export function getFruitItems(dbItems: GameItem[]): BaseGameItem[] {
  return convertGameItemsToBaseItems(
    dbItems.filter(item => item.category === 'fruits')
  )
}

export function getVegetableItems(dbItems: GameItem[]): BaseGameItem[] {
  return convertGameItemsToBaseItems(
    dbItems.filter(item => item.category === 'vegetables')
  )
}

/**
 * Get items suitable for memory game
 */
export function getMemoryGameAnimals(dbItems: GameItem[]): Array<{emoji: string, sound: string, name: string}> {
  return dbItems
    .filter(item => item.category === 'animals')
    .slice(0, 16) // Limit for memory game
    .map(item => ({
      emoji: item.emoji,
      sound: 'generic', // Could be enhanced with specific sounds
      name: item.hebrew
    }))
}

/**
 * Create game constants object for compatibility
 */
export function createGameConstants(dbItems: GameItem[], category: string) {
  const items = dbItems.filter(item => item.category === category)
  const constants: Record<string, BaseGameItem> = {}
  
  items.forEach(item => {
    const key = item.name.toUpperCase()
    constants[key] = convertToBaseGameItem(item)
  })
  
  return constants
}

/**
 * Get all available categories from database items
 */
export function getAvailableCategories(dbItems: GameItem[]): string[] {
  const categories = new Set(dbItems.map(item => item.category))
  return Array.from(categories).sort()
}

/**
 * Get items count by category
 */
export function getCategoryCounts(dbItems: GameItem[]): Record<string, number> {
  return dbItems.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1
    return counts
  }, {} as Record<string, number>)
}
