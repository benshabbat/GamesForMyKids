import GameSpinnerScreen from '@/components/ui/GameSpinnerScreen';

export default function ChampionshipLoading() {
  return (
    <GameSpinnerScreen
      emoji="🏆"
      emojiClassName="animate-bounce"
      dots={['bg-yellow-400', 'bg-orange-400', 'bg-red-400']}
      label="אליפות נטענת..."
      labelColor="text-yellow-700"
      gradientClass="from-yellow-50 via-orange-50 to-red-50"
    />
  );
}
