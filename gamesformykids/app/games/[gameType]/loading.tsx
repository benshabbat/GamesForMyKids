import GameSpinnerScreen from '@/components/ui/GameSpinnerScreen';

export default function GameLoading() {
  return (
    <GameSpinnerScreen
      emoji="⭐"
      emojiClassName="animate-spin"
      emojiStyle={{ animationDuration: '2s' }}
      dots={['bg-blue-400', 'bg-purple-400', 'bg-pink-400']}
      label="המשחק נטען..."
      labelColor="text-blue-700"
      gradientClass="from-blue-100 via-purple-100 to-pink-100"
    />
  );
}
