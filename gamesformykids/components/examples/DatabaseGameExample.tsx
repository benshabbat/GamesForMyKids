/**
 * Example component showing how to use the new useGameData hook
 * to fetch game content from the Supabase database instead of static constants
 */

'use client'

import React from 'react'
import { useGameData } from '@/hooks/shared/useGameData'
import { BaseGameCard } from '@/components/shared/BaseGameCard'

export function DatabaseGameExample() {
  const { 
    gameItems, 
    gameTypes, 
    loading, 
    error,
    getItemsByCategory,
    getGameType
  } = useGameData()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">טוען נתונים...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center text-red-600">
          <p className="text-lg">שגיאה בטעינת הנתונים</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  const colors = getItemsByCategory('colors')
  const shapes = getItemsByCategory('shapes')
  const numbers = getItemsByCategory('numbers')
  const animals = getItemsByCategory('animals')

  const colorsGameType = getGameType('colors')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        🗄️ דוגמה לשימוש בנתונים מבסיס הנתונים
      </h1>

      {/* Game Type Info */}
      {colorsGameType && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {colorsGameType.icon} {colorsGameType.display_name_hebrew}
            </h2>
            <p className="text-lg">{colorsGameType.description}</p>
            <p className="text-sm mt-2">
              גילאים: {colorsGameType.min_age}-{colorsGameType.max_age} | 
              קטגוריה: {colorsGameType.category}
            </p>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{colors.length}</div>
          <div className="text-sm text-red-800">צבעים</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{shapes.length}</div>
          <div className="text-sm text-blue-800">צורות</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{numbers.length}</div>
          <div className="text-sm text-green-800">מספרים</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{animals.length}</div>
          <div className="text-sm text-purple-800">חיות</div>
        </div>
      </div>

      {/* Sample Colors from Database */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">🎨 צבעים מבסיס הנתונים:</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colors.slice(0, 5).map((color) => (
            <BaseGameCard
              key={color.id}
              item={{
                name: color.name,
                hebrew: color.hebrew,
                english: color.english,
                emoji: color.emoji,
                color: color.color_class
              }}
              onClick={() => console.log('Color selected:', color.name)}
              className="h-20"
            />
          ))}
        </div>
      </div>

      {/* Sample Shapes from Database */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">🔷 צורות מבסיס הנתונים:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {shapes.slice(0, 3).map((shape) => (
            <BaseGameCard
              key={shape.id}
              item={{
                name: shape.name,
                hebrew: shape.hebrew,
                english: shape.english,
                emoji: shape.emoji,
                color: shape.color_class
              }}
              onClick={() => console.log('Shape selected:', shape.name)}
              className="h-24"
            />
          ))}
        </div>
      </div>

      {/* Total Statistics */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">📊 סטטיסטיקות כלליות:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>סך הכל פריטים במשחק:</strong> {gameItems.length}</p>
            <p><strong>סך הכל סוגי משחקים:</strong> {gameTypes.length}</p>
          </div>
          <div>
            <p><strong>קטגוריות זמינות:</strong></p>
            <ul className="list-disc list-inside text-sm">
              {Array.from(new Set(gameItems.map(item => item.category))).map(category => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">🔧 הוראות שימוש:</h4>
        <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
          <li>הרץ את סקריפט המיגרציה: <code className="bg-blue-100 px-1 rounded">npm run supabase:migrate</code></li>
          <li>השתמש ב-hook <code className="bg-blue-100 px-1 rounded">useGameData</code> כדי לטעון נתונים</li>
          <li>השתמש ב-adapter כדי להמיר נתונים מה-DB לפורמט של האפליקציה</li>
          <li>עדכן את כל הקומפוננטים שלך לשימוש בנתונים דינמיים</li>
        </ol>
      </div>
    </div>
  )
}
