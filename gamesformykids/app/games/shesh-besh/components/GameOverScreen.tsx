import { useSheshBeshStore } from '../sheshBeshGameStore';

export function GameOverScreen() {
  const phase = useSheshBeshStore(s => s.phase) as 'won' | 'lost';
  const message = useSheshBeshStore(s => s.message);
  const playerScore = useSheshBeshStore(s => s.playerScore);
  const computerScore = useSheshBeshStore(s => s.computerScore);
  const startGame = useSheshBeshStore(s => s.startGame);
  return (
    <div className="flex flex-col items-center gap-6 text-center mt-16">
      <div className="text-8xl">{phase === 'won' ? '🎉' : '😢'}</div>
      <h2 className="text-4xl font-extrabold text-white">{message}</h2>
      <div className="flex gap-4 text-lg font-semibold">
        <span className="bg-rose-900/60 text-rose-200 px-4 py-1.5 rounded-full border border-rose-700">🔴 {playerScore}</span>
        <span className="bg-slate-700/60 text-slate-200 px-4 py-1.5 rounded-full border border-slate-500">⚪ {computerScore}</span>
      </div>
      <button
        onClick={startGame}
        className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-all hover:scale-105"
      >
        🔄 שחק שוב
      </button>
    </div>
  );
}
