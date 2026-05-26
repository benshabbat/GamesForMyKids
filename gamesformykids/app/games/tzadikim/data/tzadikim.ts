export type { TzaddikStory, QuizQuestion } from './types';
import type { TzaddikStory } from './types';
import { BAAL_SHEM_TOV_STORY } from './stories/baalShemTov';
import { RABBI_AKIVA_STORY } from './stories/rabbiAkiva';
import { CHOFETZ_CHAIM_STORY } from './stories/chofetzChaim';
import { RABBI_SHIMON_BAR_YOCHAI_STORY } from './stories/rabbiShimonBarYochai';
import { RABBI_MEIR_BAAL_HANES_STORY } from './stories/rabbiMeirBaalHanes';
import { MENACHEM_MENDEL_MI_VITEBSK_STORY } from './stories/menachamMendelMiVitebsk';

export const TZADIKIM_STORIES: TzaddikStory[] = [
  BAAL_SHEM_TOV_STORY,
  RABBI_AKIVA_STORY,
  CHOFETZ_CHAIM_STORY,
  RABBI_SHIMON_BAR_YOCHAI_STORY,
  RABBI_MEIR_BAAL_HANES_STORY,
  MENACHEM_MENDEL_MI_VITEBSK_STORY,
];
