'use client';
import { useSnakesLadders } from './useSnakesLadders';
import GameBoard from './components/GameBoard';
import DiceRoller from './components/DiceRoller';
import QuizPopup from './components/QuizPopup';

export default function SnakesLaddersClient() {
  const game = useSnakesLadders();
  const {
    phase, players, currentPlayer, diceValue,
    pendingQuestion, pendingSquare, pendingSpecialType,
    winner, lastMessage,
    startGame, rollDice, answerQuestion, resetGame,
  } = game;

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center gap-6">
          <div className="text-6xl">🐍</div>
          <h1 className="text-3xl font-black text-center text-green-800">נחשים וסולמות</h1>
          <p className="text-center text-gray-600 text-sm" dir="rtl">
            הטל קוביה, התקדם בלוח וענה על שאלות מתמטיות — עלה בסולמות והימנע מהנחשים!
          </p>
          <div className="bg-green-50 rounded-2xl p-4 w-full text-sm" dir="rtl">
            <p className="font-bold text-green-800 mb-2">איך משחקים?</p>
            <p>🪜 נחת על סולם → ענה נכון → עלה!</p>
            <p>🐍 נחת על נחש → ענה נכון → הישאר!</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => startGame('solo')}
              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-2xl transition-colors"
            >
              🤖 נגד המחשב
            </button>
            <button
              onClick={() => startGame('two-player')}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg rounded-2xl transition-colors"
            >
              👥 שני שחקנים
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const w = winner !== null ? players[winner] : null;
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center gap-6 text-center">
          <div className="text-6xl">🏆</div>
          <h2 className="text-3xl font-black text-yellow-800">
            {w ? `${w.emoji} ${w.name} ניצח!` : 'סיום!'}
          </h2>
          <div className="bg-gray-50 rounded-2xl p-4 w-full" dir="rtl">
            {players.map((p, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <span className="font-bold">{p.emoji} {p.name}</span>
                <span className="text-gray-600">ריבוע {p.position}</span>
              </div>
            ))}
          </div>
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-2xl transition-colors"
          >
            🎲 משחק חדש
          </button>
        </div>
      </div>
    );
  }

  const current = players[currentPlayer];
  const isHumanTurn = !current.isAI;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 p-2 sm:p-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button onClick={resetGame} className="text-xs text-gray-500 hover:text-gray-700 underline">
            חזור לתפריט
          </button>
          <div className="flex gap-4">
            {players.map((p, i) => (
              <div key={i} className={`text-sm font-bold px-2 py-1 rounded-lg ${i === currentPlayer ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500'}`}>
                {p.emoji} {p.name}: {p.position}/100
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        {lastMessage && (
          <div className="bg-white rounded-xl px-4 py-2 text-center text-sm font-bold text-gray-700 shadow-sm" dir="rtl">
            {lastMessage}
          </div>
        )}

        {/* Board */}
        <GameBoard players={players} />

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-3">
          <DiceRoller
            diceValue={diceValue}
            canRoll={phase === 'rolling' && isHumanTurn}
            onRoll={rollDice}
            playerName={current.name}
            playerEmoji={current.emoji}
          />
        </div>
      </div>

      {/* Quiz popup */}
      {phase === 'quiz' && pendingQuestion && pendingSpecialType && (
        <QuizPopup
          question={pendingQuestion}
          square={pendingSquare}
          specialType={pendingSpecialType}
          playerName={current.name}
          playerEmoji={current.emoji}
          isAI={current.isAI}
          onAnswer={answerQuestion}
        />
      )}
    </div>
  );
}
