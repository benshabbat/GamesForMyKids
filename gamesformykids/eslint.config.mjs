import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * The five react-hooks rules that shipped with React 19 are enabled as errors
 * below, so no new violation can land. They flagged pre-existing code when the
 * Next.js 16 upgrade first turned them on, and were switched off wholesale at
 * the time; the blanket `off` is now replaced by the explicit file lists at the
 * bottom of this file.
 *
 * Those lists are a shrinking baseline, not a permanent exemption. Two of the
 * rules were cleared outright (`purity`, `static-components`) and are not
 * listed anywhere — they apply everywhere. To pay down the rest: fix a file,
 * delete its line, done. Never add a line.
 *
 * Why the remaining three still have entries:
 *
 * - `immutability` and `refs` are almost entirely the canvas arcade hooks.
 *   A requestAnimationFrame loop mutates a ref-held world object every frame on
 *   purpose — that is the architecture, and rewriting ~15 game loops to be
 *   immutable would trade real frame-time for a lint clean. These need a design
 *   decision, not a mechanical fix.
 * - `set-state-in-effect` is spread thin (one violation in most files) and each
 *   one needs its own judgement about whether the state should be derived,
 *   lifted, or genuinely set after commit.
 */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'coverage/**', 'scripts/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      'react-hooks/purity': 'error',
      'react-hooks/immutability': 'error',
      'react-hooks/refs': 'error',
      'react-hooks/set-state-in-effect': 'error',
      'react-hooks/static-components': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // ── Baseline: pre-existing violations, one file at a time ──────────────

  {
    name: 'react-hooks/set-state-in-effect baseline',
      files: [
        'app/HomePageClient.tsx',
        'app/games/coloring/components/ColoringCanvas.tsx',
        'app/games/hebrew-letters/components/practice/LetterEncouragement.tsx',
        'app/games/hebrew-letters/components/practice/useLetterEncouragement.ts',
        'app/games/hebrew-racer/components/HebrewRacerScreen.tsx',
        'app/games/letter-trace/components/useLetterCanvas.ts',
        'app/games/sound-quiz/useSoundQuizGame.ts',
        'components/game/AllGamesView.tsx',
        'components/game/GameTutorial.tsx',
        'components/game/quiz/screens/WordWheelQuestion.tsx',
        'components/game/quiz/screens/useLifeCyclesInteraction.ts',
        'components/game/shared/FullscreenToggle.tsx',
        'components/game/shared/GameCompletionCelebration.tsx',
        'components/game/shared/GameResultCard.tsx',
        'components/game/shared/MascotCharacter.tsx',
        'components/game/shared/SwipeNavigator.tsx',
        'components/game/universal/navigation/UniversalGameNavigation.tsx',
        'components/marketing/ContentTypeGrid.tsx',
        'components/marketing/DailyStreakBadge.tsx',
        'components/marketing/GamesTodayBadge.tsx',
        'components/settings/ColorblindSection.tsx',
        'components/settings/DyslexiaSection.tsx',
        'components/ui/ThemeToggle.tsx',
        'hooks/shared/app/useOnlineStatus.ts',
        'hooks/shared/audio/useSoundToggle.ts',
        'hooks/shared/audio/useSpeechRecognition.ts',
        'hooks/shared/audio/useWrongAnswerFeedback.ts',
        'hooks/shared/game-modes/useSpeedBurst.ts',
        'hooks/shared/marketing/useContinueBanner.ts',
        'hooks/shared/marketing/useDailyChallenge.ts',
        'hooks/shared/marketing/useOnboardingModal.ts',
        'hooks/shared/marketing/useRecentlyPlayed.ts',
        'hooks/shared/marketing/useVocabularyOfTheDay.ts',
        'hooks/shared/progress/useCategoryCompletion.ts',
        'hooks/shared/progress/useMasteryStars.ts',
        'hooks/shared/search/useGameSearch.ts',
        'hooks/shared/social/useGameRating.ts',
        'hooks/shared/useKeyboardAnswerSelect.ts',
        'hooks/shared/useTimerVisibility.ts',
      ],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  {
    name: 'react-hooks/immutability baseline',
      files: [
        'app/games/brick-breaker/useBrickBreakerGame.ts',
        'app/games/dino-runner/useDinoRunnerGame.ts',
        'app/games/frogger/useFroggerGame.ts',
        'app/games/kids-songs/hooks/useLyricsPlayer.ts',
        'app/games/letter-bubble-shooter/useBubbleShooterGame.ts',
        'app/games/letter-grow/useLetterGrowGame.ts',
        'app/games/letter-slingshot/useSlingshotGame.ts',
        'app/games/meteor-dodge/useMeteorDodgeGame.ts',
        'app/games/pong/usePongGame.ts',
        'app/games/snake/useSnakeDraw.ts',
        'app/games/snake/useSnakeInput.ts',
        'app/games/space-defender/useSpaceDefenderGame.ts',
        'app/games/stack/useStackGame.ts',
        'app/games/syllable-drums/useDrumsGame.ts',
        'app/games/word-fishing/useWordFishingGame.ts',
      ],
    rules: { 'react-hooks/immutability': 'off' },
  },
  {
    name: 'react-hooks/refs baseline',
      files: [
        'app/games/cooking-game/useCookingGame.ts',
        'app/games/kids-songs/hooks/useLyricsPlayer.ts',
        'app/games/letter-grow/useLetterGrowGame.ts',
        'app/games/letter-slingshot/useSlingshotGame.ts',
        'app/games/spot-the-difference/useSpotGame.ts',
        'app/games/syllable-drums/DrumsClient.tsx',
        'app/games/syllable-drums/useDrumsGame.ts',
        'app/games/word-fishing/WordFishingClient.tsx',
        'hooks/shared/audio/useAmbientMusic.ts',
      ],
    rules: { 'react-hooks/refs': 'off' },
  },
];

export default eslintConfig;
