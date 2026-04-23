import { GameStep } from "@/lib/types/components";

export interface GameUIConfig {
  title: string;
  subTitle: string;
  itemsTitle: string;
  itemsDescription: string;
  steps: GameStep[];
  colors: {
    background: string;
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
  // ׳”׳•׳¡׳₪׳•׳× ׳¢׳‘׳•׳¨ AutoGamePage (׳׳•׳₪׳¦׳™׳•׳ ׳׳™׳™׳ ׳¢׳ ׳‘׳¨׳™׳¨׳•׳× ׳׳—׳“׳)
  challengeTitle?: string;
  challengeIcon?: string;
  challengeDescription?: string;
  itemLabel?: string;
  tip?: string;
  tipDescription?: string;
  // ׳׳˜׳׳“׳׳˜׳” SEO
  metadata?: {
    keywords?: string;
    description?: string;
    ogImagePath?: string;
    twitterImagePath?: string;
  };
}