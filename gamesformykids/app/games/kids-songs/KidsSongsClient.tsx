'use client';
import { useKidsSongsStore } from './kidsSongsStore';
import SongPicker from './components/SongPicker';
import LyricsDisplay from './components/LyricsDisplay';
import SongQuiz from './components/SongQuiz';
import GameResultCard from '@/components/game/shared/GameResultCard';

export default function KidsSongsClient() {
  const {
    phase,
    currentSong,
    currentQuestionIdx,
    score,
    selectSong,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetGame,
  } = useKidsSongsStore();

  if (phase === 'menu' || !currentSong) {
    return <SongPicker onSelect={selectSong} />;
  }

  if (phase === 'lyrics') {
    return (
      <LyricsDisplay
        key={currentSong.id}
        song={currentSong}
        onFinish={startQuiz}
        onBack={resetGame}
      />
    );
  }

  if (phase === 'quiz') {
    return (
      <SongQuiz
        song={currentSong}
        question={currentSong.questions[currentQuestionIdx as 0 | 1]}
        questionNum={currentQuestionIdx + 1}
        onAnswer={(idx) => {
          answerQuestion(idx);
          nextQuestion();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-6">
      <GameResultCard
        emoji={currentSong.emoji}
        title={`${currentSong.title} — סיימת!`}
        gradientClass="from-purple-500 to-pink-600"
        buttonClass="bg-purple-600 hover:bg-purple-700"
        onRestart={resetGame}
        restartLabel="שיר נוסף"
        score={score}
        scorePercent={(score / 2) * 100}
      >
        <p className="text-center text-purple-700 font-medium mt-2">
          ענית נכון על {score} מתוך 2 שאלות
        </p>
      </GameResultCard>
    </div>
  );
}
