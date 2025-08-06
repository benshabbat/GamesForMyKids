import { useMemoryDebug } from '@/hooks/games/useMemoryDebug';

/**
 * קומפוננט דיבוג לפיתוח (לא לייצור!)
 */
export default function MemoryDebugPanel() {
  const debug = useMemoryDebug();
  
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <div className="mb-2 font-bold text-yellow-300">🐛 Debug Panel</div>
      
      <div className="space-y-1">
        <div>מצב: {debug.gameInfo.started ? '🟢' : '🔴'}</div>
        <div>קלפים: {debug.cardsInfo.total} ({debug.cardsInfo.flipped} הפוכים)</div>
        <div>זוגות: {debug.cardsInfo.matched}/{debug.config.pairs}</div>
        <div>ניקוד: {debug.stats.score}</div>
        <div>זמן: {debug.gameInfo.timeLeft}s</div>
      </div>
      
      <div className="mt-3 space-y-1">
        <button 
          onClick={debug.actions.logState}
          className="block w-full text-left text-yellow-300 hover:text-yellow-100"
        >
          📝 Log State
        </button>
        <button 
          onClick={debug.actions.validateGame}
          className="block w-full text-left text-blue-300 hover:text-blue-100"
        >
          ✅ Validate
        </button>
        <button 
          onClick={debug.actions.simulateWin}
          className="block w-full text-left text-green-300 hover:text-green-100"
        >
          🎯 Simulate Win
        </button>
      </div>
    </div>
  );
}
