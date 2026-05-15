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

export function createScoreBestResultScreen<S extends { score: number; best: number; startGame: () => void }>(
  config: ScoreBestResultScreenConfig,
  useGameHook: () => S,
  getConfig?: (state: S) => Partial<Pick<ScoreBestResultScreenConfig, 'emoji' | 'title'>>,
) {
  function ScoreBestResultScreen() {
    const state = useGameHook();
    const { score, best, startGame } = state;
    const dynamic = getConfig ? getConfig(state) : {};
    return (
      <ScoreBestResultCard
        {...config}
        {...dynamic}
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
