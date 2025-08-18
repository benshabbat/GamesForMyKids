/**
 * ===============================================
 * דוגמאות לשימוש במערכת האוניברסלית 🎯
 * ===============================================
 * 
 * הנה איך להשתמש במערכת החדשה ללא props drilling
 */

"use client";

import React from 'react';
import { useUniversalGame, useGameData, useGameControls, useGameConfiguration, useGameEnhancements } from '@/contexts/UniversalGameContext';

/**
 * 🎮 דוגמה 1: קומפוננט שמשתמש בכל הקונטקסט
 */
export function AllInOneGameComponent() {
  const game = useUniversalGame();
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎮 {game.config.title}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-bold">מצב המשחק:</h3>
          <p>ניקוד: {game.score}</p>
          <p>רמה: {game.level}</p>
          <p>משחק פעיל: {game.isPlaying ? 'כן' : 'לא'}</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-bold">פעולות:</h3>
          <button 
            onClick={game.startGame}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            התחל משחק
          </button>
          <button 
            onClick={game.resetGame}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            אפס משחק
          </button>
        </div>
      </div>
      
      {game.currentChallenge && (
        <div className="mt-4 bg-yellow-100 p-4 rounded">
          <h3 className="font-bold">אתגר נוכחי:</h3>
          <p>{game.currentChallenge.hebrew}</p>
          <button 
            onClick={() => game.speakItemName(game.currentChallenge!.name)}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
          >
            🔊 השמע
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * 🎯 דוגמה 2: קומפוננטים מותאמים שמשתמשים ב-hooks ספציפיים
 */
export function GameStats() {
  const { score, level } = useGameData();
  const { currentAccuracy } = useGameEnhancements();
  
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">📊 סטטיסטיקות</h3>
      <div className="space-y-1">
        <p>ניקוד: <span className="font-bold text-blue-600">{score}</span></p>
        <p>רמה: <span className="font-bold text-green-600">{level}</span></p>
        <p>דיוק: <span className="font-bold text-purple-600">{Math.round(currentAccuracy)}%</span></p>
      </div>
    </div>
  );
}

export function GameControlPanel() {
  const { startGame, resetGame } = useGameControls();
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">🎮 בקרות</h3>
      <div className="space-x-2">
        <button 
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          ▶️ התחל
        </button>
        <button 
          onClick={resetGame}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          🔄 אפס
        </button>
      </div>
    </div>
  );
}

export function GameInfo() {
  const { config, gameType, items } = useGameConfiguration();
  
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">ℹ️ מידע על המשחק</h3>
      <div className="space-y-1">
        <p>סוג: <span className="font-bold">{gameType}</span></p>
        <p>כותרת: <span className="font-bold">{config.title}</span></p>
        <p>פריטים: <span className="font-bold">{items.length}</span></p>
      </div>
    </div>
  );
}

export function GameHintsPanel() {
  const { hints, hasMoreHints, showNextHint } = useGameEnhancements();
  
  return (
    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">💡 רמזים</h3>
      {hints.length > 0 ? (
        <div className="space-y-2">
          {hints.map((hint, index) => (
            <p key={index} className="text-sm bg-yellow-100 p-2 rounded">
              {hint}
            </p>
          ))}
          {hasMoreHints && (
            <button 
              onClick={showNextHint}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              רמז נוסף
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500">אין רמזים זמינים</p>
      )}
    </div>
  );
}

/**
 * 🎯 דוגמה 3: עמוד מלא שמשתמש בכל הקומפוננטים
 */
export function CompleteDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🎮 דאשבורד משחק מלא</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GameStats />
          <GameControlPanel />
          <GameInfo />
          <GameHintsPanel />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AllInOneGameComponent />
        </div>
      </div>
    </div>
  );
}

/**
 * 🔥 היתרונות של המערכת החדשה:
 * 
 * 1. **אפס Props Drilling**: כל קומפוננט מקבל רק מה שהוא צריך
 * 2. **מודולריות**: hooks ספציפיים לכל תפקיד
 * 3. **קוד נקי**: אין צורך להעביר props דרך כמה רמות
 * 4. **תחזוקה קלה**: שינוי בקונטקסט משפיע על כל הקומפוננטים
 * 5. **ביצועים**: רק הקומפוננטים הרלוונטיים מתעדכנים
 * 
 * 🚀 איך להוסיף קומפוננט חדש:
 * 
 * ```tsx
 * function MyNewComponent() {
 *   const { score, level } = useGameData(); // רק מה שצריך!
 *   return <div>Score: {score}, Level: {level}</div>;
 * }
 * ```
 * 
 * זהו! אין צורך לטרוח עם props או להעביר נתונים דרך הורים.
 */
