---
name: hebrew-content-conventions
description: This skill should be used whenever writing or editing Hebrew game content in GamesForMyKids — new `BaseGameItem` entries in `lib/constants/gameData/`, quiz question data in `lib/quiz/data/`, `_PRONUNCIATIONS` maps, or any text a child will hear read aloud via TTS. Triggers on tasks like "add game data", "add items for the X game", "write questions for the quiz", or "fix pronunciation". Covers the `hebrewNikud` field, the `createPronunciationDictionary` helper, and content-quality rules for a K-2 audience.
---

# Hebrew Content Conventions — GamesForMyKids

All game text is read aloud by a browser TTS engine to young (K-2) children. Hebrew without vowel points (nikud) is frequently mispronounced by TTS — this skill exists to get pronunciation right the first time instead of relying on the reactive `/pronunciation-qa` audit to catch it later.

## The `BaseGameItem` shape

Defined in `lib/types/core/base.ts`. Core fields for any new item:

```typescript
{
  name: string;        // stable English/kebab identifier — used as the lookup key everywhere
  hebrew: string;       // display text, plain (no nikud)
  english: string;      // English display text
  emoji?: string;
  color?: string;        // Tailwind gradient class, e.g. "bg-gradient-to-br from-blue-400 to-blue-600"
  sound?: number[];      // optional tone sequence for a custom sound effect
  hebrewNikud?: string;  // Hebrew WITH vowel points, used only for TTS disambiguation
}
```

`hebrewNikud` exists specifically so `hebrew` can stay clean for display while TTS gets an unambiguous pronunciation. Add `hebrewNikud` whenever the plain `hebrew` word is a homograph, a loanword, or anything a TTS engine is likely to stress incorrectly (rule of thumb: words over ~4 characters or with irregular vowel patterns).

## Building the pronunciation map — prefer the helper, don't hand-write it

Do not hand-write a `_PRONUNCIATIONS: Record<string, string>` literal that duplicates `name` → `hebrew` pairs. Use the existing helper instead:

```typescript
import { createPronunciationDictionary } from "@/lib/constants/core";

export const MY_GAME_PRONUNCIATIONS = createPronunciationDictionary(MY_GAME_CONSTANTS);
```

`createPronunciationDictionary` (in `lib/constants/core/index.ts`) builds `{ [item.name]: item.hebrewNikud || item.hebrew }` automatically from the items object — so the only thing to actually author is `hebrewNikud` on individual items that need it. This is the pattern used by `animals.ts`, `colors.ts`, and most other `gameData` files; a hand-rolled map is a duplicate of this factory and will drift out of sync as items are added.

Only write a manual `_PRONUNCIATIONS` map when an entry needs a phonetic respelling that isn't just nikud on the same word (rare — e.g. an acronym or foreign name).

## Content-quality rules

- **`name` is a stable key** — used in `gameItemsMap.ts`, quiz data, registry entries, and pronunciation lookups. Never rename an existing item's `name`; add a new item instead.
- **Minimum item counts** — Style A card games: ~8 items minimum. Quiz styles (B/C/E): 10 questions minimum. Below this, difficulty scaling and challenge-uniqueness logic in the shared hooks degrade.
- **Emoji required for card items** — the UI falls back to a generic placeholder without one, which reads as broken to a child.
- **Quiz `wrongOptions`** must be plausible-but-clearly-wrong for the target age group, and must not accidentally duplicate the correct `answer` string.
- **RTL-safe text only** — don't embed LTR strings (raw English brand names, numbers with units) inside a Hebrew sentence without checking it renders correctly RTL; prefer keeping English terms in their own field (`english`) rather than inline in `hebrew`.

## After writing content

Run `/pronunciation-qa` (optionally scoped to the new file) to catch orphan pronunciation keys and items with likely-mispronounced Hebrew that are still missing `hebrewNikud`. Run `/quiz-validator` for new quiz data to catch structural issues (duplicate answers, malformed `wrongOptions`, etc.).
