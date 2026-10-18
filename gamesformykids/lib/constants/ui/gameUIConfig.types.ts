import { GameStep } from "@/lib/types/components";

export interface GameUIConfig {
  title: string;
  subTitle: string;
  itemsTitle: string;
  itemsDescription: string;
  steps: GameStep[];
  colors: {
    background: string;
    /**
     * Text classes below are not used for the start screen's own text — GenericStartScreen
     * derives readable text colors from `background` (see startScreenTone.ts). `header`
     * still tints the challenge icon in ChallengeBox.
     */
    header: string;
    subHeader: string;
    itemsDescription: string;
    button: { from: string; to: string };
    stepsBg: string;
  };
  grid: {
    className: string;
    showSpeaker?: boolean;
  };
  // הוספות עבור AutoGamePage (אופציונליים עם ברירות מחדל)
  challengeTitle?: string;
  challengeIcon?: string;
  challengeDescription?: string;
  itemLabel?: string;
  tip?: string;
  tipDescription?: string;
  // מטאדאטה SEO
  metadata?: {
    keywords?: string;
    description?: string;
    ogImagePath?: string;
    twitterImagePath?: string;
  };
}