export interface GameItem {
  readonly id: string;
  readonly name: string;
  readonly hebrew: string;
  readonly english: string;
  readonly emoji: string;
  readonly category: string;
  readonly subcategory?: string;
  readonly color_class?: string;
  readonly sound_frequencies: readonly number[];
  readonly additional_data: Readonly<Record<string, object>>;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface GameTypeDbRecord {
  readonly id: string;
  readonly name: string;
  readonly display_name_hebrew: string;
  readonly display_name_english: string;
  readonly description?: string;
  readonly icon?: string;
  readonly category: string;
  readonly difficulty_level: string;
  readonly min_age: number;
  readonly max_age: number;
  readonly is_active: boolean;
  readonly created_at: string;
  readonly updated_at: string;
}
