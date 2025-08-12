'use client'

import { useGameData, useGameItemsByCategory } from '@/hooks'
import { useEffect, useState } from 'react'
import { GameType, BaseGameItem } from '@/lib/types/base'
import { convertGameItemsToBaseItems } from '@/lib/adapters/supabaseDataAdapter'
import { AutoStartScreen } from '@/components/shared/AutoStartScreen'
import { useBaseGame } from '@/hooks'

interface SupabaseGamePageProps {
  gameType: GameType
}

export function SupabaseGamePage({ gameType }: SupabaseGamePageProps) {
  const { getGameTypeByName } = useGameData()
  const { items: dbItems, loading: itemsLoading } = useGameItemsByCategory(gameType)
  const [gameItems, setGameItems] = useState<BaseGameItem[]>([])
  const [gameStarted, setGameStarted] = useState(false)

  // Convert database items to game format
  useEffect(() => {
    if (dbItems.length > 0) {
      const convertedItems = convertGameItemsToBaseItems(dbItems)
      setGameItems(convertedItems)
    }
  }, [dbItems])

  const gameTypeInfo = getGameTypeByName(gameType)

  const {
    currentItem,
    isCorrect,
    gameWon,
    score,
    level,
    handleItemClick,
    nextQuestion,
    speakItem,
    resetGame,
    gameConfig
  } = useBaseGame({
    items: gameItems,
    gameType,
    onGameComplete: () => {
      // Game completion logic handled by useBaseGame
    }
  })

  const handleStart = () => {
    setGameStarted(true)
    if (gameItems.length > 0) {
      nextQuestion()
    }
  }

  const handleRestart = () => {
    resetGame()
    setGameStarted(false)
  }

  if (itemsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-xl">טוען נתונים מהשרת...</div>
      </div>
    )
  }

  if (gameItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">אין נתונים זמינים</h1>
          <p>לא נמצאו נתונים עבור המשחק {gameType}</p>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <AutoStartScreen
        gameType={gameType}
        items={gameItems}
        onStart={handleStart}
        onSpeak={speakItem}
        title={gameTypeInfo?.display_name_hebrew || gameType}
        description={gameTypeInfo?.description}
      />
    )
  }

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-purple-800 mb-4">כל הכבוד!</h1>
          <p className="text-xl text-gray-600 mb-6">סיימת את המשחק בהצלחה!</p>
          <div className="space-y-4">
            <div className="text-lg">
              <span className="font-semibold">ניקוד:</span> {score}
            </div>
            <div className="text-lg">
              <span className="font-semibold">רמה:</span> {level}
            </div>
            <button
              onClick={handleRestart}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              שחק שוב
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            {gameTypeInfo?.display_name_hebrew || gameType}
          </h1>
          <div className="flex justify-center space-x-4 space-x-reverse text-lg">
            <span>ניקוד: {score}</span>
            <span>רמה: {level}</span>
          </div>
        </div>

        {/* Current Question */}
        {currentItem && (
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentItem.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              מצא את: {currentItem.hebrew}
            </h2>
            <button
              onClick={() => speakItem(currentItem)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              🔊 שמע שוב
            </button>
          </div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {gameItems.slice(0, gameConfig.itemsPerRound).map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              onClick={() => handleItemClick(item)}
              disabled={isCorrect !== null}
              className={`
                relative p-6 rounded-2xl border-4 transition-all duration-300 transform hover:scale-105
                ${item.color || 'bg-white border-gray-300'}
                ${isCorrect === true && item === currentItem ? 'border-green-500 bg-green-100' : ''}
                ${isCorrect === false && item === currentItem ? 'border-red-500 bg-red-100' : ''}
                ${isCorrect === null ? 'hover:border-purple-400' : ''}
                disabled:cursor-not-allowed
              `}
            >
              <div className="text-4xl mb-2">{item.emoji}</div>
              <div className="text-sm font-semibold text-gray-700">{item.hebrew}</div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {isCorrect !== null && (
          <div className="text-center">
            {isCorrect ? (
              <div className="text-green-600 text-xl font-bold mb-4">
                🎉 נכון מאוד!
              </div>
            ) : (
              <div className="text-red-600 text-xl font-bold mb-4">
                ❌ לא נכון, נסה שוב
              </div>
            )}
            <button
              onClick={nextQuestion}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              המשך
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
