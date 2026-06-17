'use client';
import { useRobotCoder } from './useRobotCoder';
import RobotGrid from './components/RobotGrid';
import CommandStrip from './components/CommandStrip';
import GameResultCard from '@/components/game/shared/GameResultCard';

export default function RobotCoderClient() {
  const {
    phase, levelIdx, level, commands, robotPos, collectedLetters, animStep, totalLevels,
    startGame, nextLevel, addCommand, removeCommand, clearCommands, run, resetLevel, resetGame,
  } = useRobotCoder();

  const isRunning = phase === 'running';

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center gap-6">
          <div className="text-6xl">🤖</div>
          <h1 className="text-3xl font-extrabold text-indigo-800 text-center">תכנת את הרובוט</h1>
          <p className="text-center text-gray-600 leading-relaxed">
            הכנס פקודות לרובוט, הרץ אותו — ואסוף אותיות עברית לפי הסדר!
          </p>
          <div className="bg-indigo-50 rounded-2xl p-4 text-sm text-indigo-700 text-right w-full">
            <p>↑ ↓ ← → לתנועה</p>
            <p>לחץ על חץ להוספה לפס הפקודות</p>
            <p>לחץ על פקודה בפס להסרתה</p>
            <p>לחץ &quot;הרץ!&quot; להפעלה</p>
          </div>
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xl rounded-2xl py-4 transition active:scale-95 shadow-md"
          >
            🤖 בואו נתכנת!
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'success') {
    const isLast = levelIdx >= totalLevels - 1;
    return (
      <GameResultCard
        emoji="🤖"
        title={`${level.targetWord}! מצוין!`}
        gradientClass="from-indigo-50 to-purple-100"
        buttonClass="from-indigo-500 to-purple-600"
        onRestart={isLast ? resetGame : nextLevel}
        restartLabel={isLast ? 'התחל מחדש' : `שלב ${levelIdx + 2} ←`}
        score={(levelIdx + 1) * 100}
        gameType="robot-coder"
        scorePercent={Math.round(((levelIdx + 1) / totalLevels) * 100)}
      >
        <div className="flex flex-col items-center gap-2" dir="rtl">
          <p className="text-gray-600">הרובוט איסף את המילה <strong>{level.targetWord}</strong>!</p>
          <p className="text-gray-500 text-sm">שלב {levelIdx + 1} מתוך {totalLevels}</p>
          {isLast && <p className="text-green-600 font-bold">השלמת את כל השלבים! 🏆</p>}
        </div>
      </GameResultCard>
    );
  }

  if (phase === 'fail') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center gap-4">
          <div className="text-5xl">😅</div>
          <h2 className="text-2xl font-bold text-red-700">לא הצלחנו הפעם!</h2>
          <p className="text-gray-600 text-center">
            הרובוט לא אסף את <strong>{level.targetWord}</strong> בסדר הנכון.
          </p>
          <p className="text-sm text-amber-600 bg-amber-50 rounded-xl px-4 py-2">
            💡 {level.hint}
          </p>
          <button
            onClick={resetLevel}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-2xl py-3 transition active:scale-95"
          >
            נסה שוב
          </button>
          <button onClick={resetGame} className="text-sm text-gray-400 underline">
            חזור לתפריט
          </button>
        </div>
      </div>
    );
  }

  // editing / running
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-3 gap-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <button onClick={resetGame} className="text-white/70 hover:text-white text-sm font-bold px-3 py-1.5 rounded-xl bg-white/10">
          ← חזור
        </button>
        <div className="text-white font-bold text-sm">שלב {levelIdx + 1}/{totalLevels}</div>
      </div>

      {/* Target word */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
        <p className="text-white/70 text-xs mb-1">אסוף את המילה:</p>
        <div className="flex gap-2 justify-center">
          {level.targetWord.split('').map((letter, i) => (
            <span
              key={i}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition ${
                i < collectedLetters.length
                  ? 'border-green-400 bg-green-300 text-green-900'
                  : 'border-white/30 text-white'
              }`}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4">
        <RobotGrid level={level} robotPos={robotPos} collectedLetters={collectedLetters} animStep={animStep} />
      </div>

      {/* Command strip */}
      <div className="bg-white rounded-3xl shadow-xl p-4 w-full max-w-sm">
        <CommandStrip
          commands={commands}
          maxCommands={level.maxCommands}
          isRunning={isRunning}
          animStep={animStep}
          onAdd={addCommand}
          onRemove={removeCommand}
          onClear={clearCommands}
          onRun={run}
        />
      </div>
    </div>
  );
}
