/**
 * ===============================================
 * קובץ תאימות לאחור - Backward Compatibility
 * ===============================================
 * קובץ זה מכיל re-exports לטייפים שהיו קיימים בעבר
 * כדי למנוע שבירה של קוד קיים
 */

// ייצוא הטייפים הבסיסיים עם השמות המקוריים
export type {
  GameType,
  BaseGameItem,
  BaseGameItemLegacy,
  BaseGameState,
  GameConfig,
  Game,
  Card
} from './core/base';

// ייצוא גם האינטרפייסים החדשים עם שמות חדשים
export type {
  Identifiable,
  Nameable,
  Translatable,
  Visualizable,
  Audioable,
  GameCurrentState,
  GameScoreState,
  GamePlayState,
  BaseGameSettings,
  AdvancedGameSettings,
  GameBasicInfo,
  GameVisualInfo,
  GameAvailability,
  CardState,
  CardInfo
} from './core/base';

// ייצוא אינטרפייסים מUI
export type {
  BaseComponentProps,
  Actionable,
  Loadable,
  BaseButtonProps,
  ButtonVariant,
  ComponentSize,
  ButtonStyling,
  ButtonProps,
  GameButtonText,
  GradientColors,
  CustomAction,
  GameStartButtonProps,
  TitledComponent,
  HeaderProps,
  LoadingWithMessage,
  SimpleLoadingScreenProps,
  ErrorInfo,
  ErrorRecoverable,
  ErrorScreenProps,
  NavigationItemBase,
  NavigationItemWithIcon,
  NavigationItem,
  NavigationBehavior,
  NavigationProps,
  ModalState,
  ModalContent,
  ModalProps,
  ToastType,
  ToastContent,
  ToastTiming,
  ToastProps,
  GoogleAnalyticsProps
} from './ui/core';

// ייצוא האינטרפייסים המשופרים של המשחקים
export type {
  GameRegistrationBase,
  GameVisuals,
  GameRegistration,
  CategoryInfo,
  CategoryVisuals,
  CategoryGames,
  Category,
  AgeGroupInfo,
  AgeGroupRecommendations,
  AgeGroup,
  DifficultyLevel,
  ChallengeInfo,
  ChallengeProperties,
  ChallengeState,
  GameChallenge,
  BasicGameStats,
  ScoreStats,
  TimeStats,
  GameStats
} from './games/base';
