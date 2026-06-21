'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import GameSpinnerScreen from '@/components/ui/GameSpinnerScreen';

const GAME_CLIENTS: Record<string, ComponentType> = {
  arithmetic:        dynamic(() => import('../arithmetic/ArithmeticGameClient'),              { ssr: false }),
  'balloon-pop':     dynamic(() => import('../balloon-pop/BalloonPopClient'),                 { ssr: false }),
  'brick-breaker':   dynamic(() => import('../brick-breaker/BrickBreakerClient'),             { ssr: false }),
  bubbles:           dynamic(() => import('../bubbles/components/BubbleGame'),                         { ssr: false }),
  building:          dynamic(() => import('../building/BuildingGameClient'),                   { ssr: false }),
  'catch-fruit':     dynamic(() => import('../catch-fruit/CatchFruitClient'),                 { ssr: false }),
  checkers:          dynamic(() => import('../checkers/DamkaClient'),                          { ssr: false }),
  chess:             dynamic(() => import('../chess/ChessClient'),                             { ssr: false }),
  'color-tap':       dynamic(() => import('../color-tap/ColorTapClient'),                     { ssr: false }),
  coloring:          dynamic(() => import('../coloring/ColoringGameClient')),
  'dino-runner':     dynamic(() => import('../dino-runner/DinoRunnerClient'),                 { ssr: false }),
  drawing:           dynamic(() => import('../drawing/components/DrawingGameClient'),          { ssr: false }),
  'emoji-math':      dynamic(() => import('../emoji-math/EmojiMathClient'),                   { ssr: false }),
  'flappy-bird':     dynamic(() => import('../flappy-bird/FlappyBirdClient'),                 { ssr: false }),
  frogger:           dynamic(() => import('../frogger/FroggerClient'),                        { ssr: false }),
  'hebrew-letters':  dynamic(() => import('../hebrew-letters/components/hub/HebrewLettersHub'),        { ssr: false }),
  jumper:            dynamic(() => import('../jumper/JumperClient'),                           { ssr: false }),
  'math-race':       dynamic(() => import('../math-race/MathRaceClient'),                     { ssr: false }),
  memory:            dynamic(() => import('../memory/MemoryClient'),                           { ssr: false }),
  'meteor-dodge':    dynamic(() => import('../meteor-dodge/MeteorDodgeClient'),               { ssr: false }),
  multiplication:    dynamic(() => import('../multiplication/MultiplicationGameClient')),
  'number-bubbles':  dynamic(() => import('../number-bubbles/NumberBubblesClient')),
  pong:              dynamic(() => import('../pong/PongClient'),                               { ssr: false }),
  puzzles:           dynamic(() => import('../puzzles/PuzzlesClient'),                         { ssr: false }),
  reflex:            dynamic(() => import('../reflex/ReflexGameClient'),                       { ssr: false }),
  'shesh-besh':      dynamic(() => import('../shesh-besh/SheshBeshClient'),                   { ssr: false }),
  simon:             dynamic(() => import('../simon/SimonClient'),                             { ssr: false }),
  snake:             dynamic(() => import('../snake/SnakeClient'),                             { ssr: false }),
  'space-defender':  dynamic(() => import('../space-defender/SpaceDefenderClient'),           { ssr: false }),
  stack:             dynamic(() => import('../stack/StackClient'),                             { ssr: false }),
  taki:              dynamic(() => import('../taki/TakiClient'),                               { ssr: false }),
  tetris:            dynamic(() => import('../tetris/components/TetrisGame'),                  { ssr: false }),
  'true-false':      dynamic(() => import('../true-false/TrueFalseClient')),
  tzedakah:          dynamic(() => import('../tzedakah/CharityCoinGame'),                               { ssr: false }),
  'whack-a-mole':    dynamic(() => import('../whack-a-mole/WhackAMoleClient'),               { ssr: false }),
  'word-builder':    dynamic(() => import('../word-builder/WordBuilderGameClient')),
  'word-scramble':   dynamic(() => import('../word-scramble/WordScrambleClient')),
  'maze':             dynamic(() => import('../maze/MazeClient'),                                 { ssr: false }),
  'letter-defender':  dynamic(() => import('../letter-defender/LetterDefenderClient'),           { ssr: false }),
  'puppet-story':     dynamic(() => import('../puppet-story/PuppetClient'),                      { ssr: false }),
  'number-slide':     dynamic(() => import('../number-slide/NumberSlideClient'),                  { ssr: false }),
  'snakes-ladders':   dynamic(() => import('../snakes-ladders/SnakesLaddersClient'),              { ssr: false }),
  'escape-room':      dynamic(() => import('../escape-room/EscapeRoomClient'),                    { ssr: false }),
  'robot-coder':      dynamic(() => import('../robot-coder/RobotCoderClient'),                    { ssr: false }),
  'find-in-scene':    dynamic(() => import('../find-in-scene/FindInSceneClient'),                  { ssr: false }),
  'hangman':           dynamic(() => import('../hangman/HangmanClient'),                             { ssr: false }),
  'choose-adventure':  dynamic(() => import('../choose-adventure/ChooseAdventureClient'),            { ssr: false }),
  'picture-dictionary':  dynamic(() => import('../picture-dictionary/PictureDictionaryClient'),        { ssr: false }),

  'word-search':       dynamic(() => import('../word-search/WordSearchClient'),                      { ssr: false }),

  'israel-map':        dynamic(() => import('../israel-map/IsraelMapClient'),                        { ssr: false }),

  'kids-songs':        dynamic(() => import('../kids-songs/KidsSongsClient'),                        { ssr: false }),
  'melody-maker':        dynamic(() => import('../melody-maker/MelodyMakerClient'),                    { ssr: false }),
  'kids-encyclopedia': dynamic(() => import('../kids-encyclopedia/EncyclopediaClient'),              { ssr: false }),
  'age-calculator':    dynamic(() => import('../age-calculator/AgeCalculatorClient'),                { ssr: false }),
  'craft-guide':       dynamic(() => import('../craft-guide/CraftGuideClient'),                      { ssr: false }),
  'jokes-browser':     dynamic(() => import('../jokes-browser/JokesBrowserClient'),                  { ssr: false }),
  'word-maze':         dynamic(() => import('../word-maze/WordMazeClient'),                          { ssr: false }),
  'avatar-maker':      dynamic(() => import('../avatar-maker/AvatarMakerClient'),                   { ssr: false }),
  'sound-quiz':        dynamic(() => import('../sound-quiz/SoundQuizClient'),                       { ssr: false }),
  'spinner':           dynamic(() => import('../spinner/SpinnerClient'),                            { ssr: false }),
  'team-picker':       dynamic(() => import('../team-picker/TeamPickerClient'),                     { ssr: false }),
  'dice':              dynamic(() => import('../dice/DiceClient'),                                    { ssr: false }),
  'timer':             dynamic(() => import('../timer/TimerClient'),                                  { ssr: false }),
  'letter-race':       dynamic(() => import('../letter-race/LetterRaceClient'),                      { ssr: false }),
  'drag-sort':         dynamic(() => import('../drag-sort/DragSortClient'),                           { ssr: false }),
  'answer-cannon':     dynamic(() => import('../answer-cannon/CannonClient'),                          { ssr: false }),
};

interface Props { gameType: string; }

export default function CustomGameRenderer({ gameType }: Props) {
  const Component = GAME_CLIENTS[gameType];
  if (!Component) return null;
  return (
    <Suspense fallback={<GameSpinnerScreen />}>
      <Component />
    </Suspense>
  );
}
