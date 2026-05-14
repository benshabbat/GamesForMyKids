'use client';

import ScoreBestResultCard from './ScoreBestResultCard';

export interface ScoreBestResultScreenConfig {
  emoji: string;
  title: string;
  gradientClass: string;
  buttonClass: string;
  scoreBgClass?: string;
  scoreTextClass?: string;
  scoreLabelClass?: string;
  restartLabel?: string;
  shareTextFn: (score: number) => string;
}

export function createScoreBestResultScreen(
  config: ScoreBestResultScreenConfig,
  useGameHook: () => { score: number; best: number; startGame: () => void },
) {
  function ScoreBestResultScreen() {
    const { score, best, startGame } = useGameHook();
    return (
      <ScoreBestResultCard
        {...config}
        score={score}
        best={best}
        onRestart={startGame}
        shareText={config.shareTextFn(score)}
      />
    );
  }
  ScoreBestResultScreen.displayName = `ScoreBestResultScreen(${config.title})`;
  return ScoreBestResultScreen;
}
