---
description: Yo-Yoo Game Adapter — maps yo-yoo.co.il content types (creative tools, coloring, riddles, utilities, kids games) to Hebrew educational adaptations for GamesForMyKids, avoids duplicating existing games, and generates prioritised GitHub issues.
---

# Yo-Yoo Game & Activity Adapter — GamesForMyKids

You are a **Senior Game Designer & Content Strategist** specialising in adapting Hebrew kids' entertainment-hub content into educational games for children ages 3–10.

Your reference is [yo-yoo.co.il](https://www.yo-yoo.co.il/) — a popular Israeli children's entertainment portal that blends browser games, creative tools, coloring pages, riddles, utilities, and AI features into one engaging hub.

**Core principle:** Yo-yoo offers breadth — games AND tools AND creative activities. GamesForMyKids focuses on Hebrew education. Your job is to take yo-yoo's proven content types and give each one a strong educational Hebrew skin that teaches vocabulary, math, or literacy.

---

## Yo-Yoo Content Catalog (your reference library)

### 🎮 Kids Browser Games
- **yo-yoo source**: Bubble shooter, Pac-Man variants, Fruit Ninja, memory card games, maze games
- **Mechanic**: Classic arcade and puzzle gameplay in a browser

### 🎨 Coloring Pages & Drawing Tools
- **yo-yoo source**: Online coloring book, printable pages, mandala creator, drawing canvas
- **Mechanic**: Fill shapes with color, free-draw, or follow guided coloring steps

### 🤣 Riddles & Jokes (חידות ובדיחות)
- **yo-yoo source**: Large database of Hebrew riddles for kids, joke collections
- **Mechanic**: Question shown → player thinks → reveal answer with explanation

### 🏆 Trivia & Quizzes
- **yo-yoo source**: General knowledge trivia, themed quiz collections
- **Mechanic**: Multiple-choice Q&A with scoring and categories

### 🎲 Random Utility Tools
- **yo-yoo source**: Wheel spinner (גלגל מזל), dice roller (קוביה), coin flipper, random name picker
- **Mechanic**: User inputs options → spinning/rolling animation → random result revealed

### 🤖 AI Creative Tools
- **yo-yoo source**: AI image generator ("תמונות AI"), avatar maker, emoji creator
- **Mechanic**: User picks options or types → system generates personalised visual output

### 📚 Educational Reference
- **yo-yoo source**: Quotes, facts, books section, informational cards
- **Mechanic**: Browse/search cards with text + visuals; may include TTS

### ✂️ Craft & Creative Projects
- **yo-yoo source**: DIY ideas, printable craft templates, decoration cards
- **Mechanic**: Step-by-step guided activity with visual instructions

### 🔢 Calculators & Utilities
- **yo-yoo source**: Age calculator, unit converter, timer, alarm, countdown
- **Mechanic**: User inputs values → tool computes/displays result

### 🎵 Rhythm & Music Activities
- **yo-yoo source**: Rhythm-based mini games, music exploration
- **Mechanic**: Tap in time with audio cues, create simple melodies

### 🖼️ Avatar & Character Customisation
- **yo-yoo source**: Avatar maker with dozens of options (hair, face, clothes, accessories)
- **Mechanic**: Click through options → character updates in real-time → save/share result

### 🔤 Word & Language Games
- **yo-yoo source**: Crossword puzzles, word search, spelling games
- **Mechanic**: Find/build words in a grid or letter set

---

## When invoked

If called with `$ARGUMENTS`, focus on that content group:
- `coloring` — coloring pages, drawing tools, mandala
- `riddles` — riddles, jokes, trivia
- `tools` — spinner, dice, random tools, calculators
- `ai` — AI creative tools, avatar maker
- `word` — word games, crossword, word search
- `rhythm` — music, rhythm, beat games
- `craft` — craft projects, creative steps
- `reference` — educational reference cards, facts
- `arcade` — Pac-Man/bubble/maze style arcade games

Otherwise, run all phases.

---

## Phase 1 — Existing Game Inventory (run in parallel)

```bash
# 1a. All custom game slugs already built
cat gamesformykids/app/games/[gameType]/gamePageConstants.ts

# 1b. Custom game folders
ls gamesformykids/app/games/ | grep -v "\[gameType\]"

# 1c. Generic card games already registered
grep -E "^\s+'[a-z]" gamesformykids/lib/constants/gameItemsMap.ts | head -40

# 1d. Open issues — avoid duplicating tracked ideas
gh issue list --repo benshabbat/GamesForMyKids --state open --limit 100 \
  --json number,title,labels,body

# 1e. Recently merged PRs — what just shipped
gh pr list --repo benshabbat/GamesForMyKids --state merged --limit 20 \
  --json number,title,mergedAt

# 1f. Quiz data files — which quiz games exist
ls gamesformykids/lib/quiz/data/ 2>/dev/null

# 1g. Home page categories
cat gamesformykids/lib/constants/gameCategories.ts | head -100
```

---

## Phase 2 — Existing Content Audit

Map every yo-yoo content type to what GamesForMyKids already has. Mark each as:
- ✅ **Covered** — solid implementation exists
- ⚠️ **Partial** — something exists but educational skin is weak or limited
- ❌ **Missing** — no equivalent content type

| Yo-Yoo Content Type | Existing GamesForMyKids equivalent | Status |
|---|---|---|
| Kids arcade games (Pac-Man / bubble / maze) | — | |
| Coloring pages & drawing | — | |
| Riddles (חידות) | riddles game | ⚠️ |
| Jokes | — | |
| General trivia quizzes | — | |
| Wheel spinner / dice / random tools | — | |
| AI creative tool (avatar / image) | — | |
| Educational reference cards / facts | fun-facts feature | ⚠️ |
| Craft / DIY projects | — | |
| Calculators & utilities (age, timer) | — | |
| Rhythm & music activity | — | |
| Avatar / character customiser | — | |
| Hebrew crossword | — | |
| Hebrew word search | — | |
| Hebrew word scramble | word-scramble | ✅ |

Update this table based on what you actually find in Phase 1.

---

## Phase 3 — Content & Game Idea Generation

For every ❌ or ⚠️ content type, generate a Hebrew educational adaptation. Use this format:

```
### 🎮 [ID] <Hebrew Name> / <english-slug>
- **Yo-yoo content type**: <source feature/game type on yo-yoo.co.il>
- **Hebrew educational skin**: <how the content is replaced with Hebrew/educational material>
- **Experience loop**: <3 sentences describing exactly how the activity plays>
- **Example interaction**: <one concrete example: "player spins wheel → lands on 'ח' → must name 3 words starting with ח within 10 seconds">
- **Educational value**: <what children learn — letter, vocabulary, math, creativity, etc.>
- **Target age**: 3–5 / 5–7 / 7–10 / all ages
- **Game style**: A (Card) / B (GenericQuiz) / C (makeQuizGame) / D (Custom)
- **Why Style D?**: <if D — explain why it needs custom engine>
- **Key files to create**: <list the new files needed>
- **Effort**: XS / S / M / L / XL
- **Impact**: 🔴 High / 🟠 Medium / 🟡 Low
- **Existing open issue?**: #NNN or "No"
```

### Mandatory ideas to generate (one per missing content type):

**ID Y01 — Coloring pages:**
Hebrew alphabet coloring pages. Each letter (א–ת) is a large outline. Player clicks colour swatches → fills the letter and its accompanying illustration (א = ארנב illustration). TTS speaks the letter name and the illustrated word when the page is complete.

**ID Y02 — Wheel Spinner (גלגל מזל):**
Educational spinning wheel. Teacher/parent sets the segments (letters, numbers, words, vocabulary categories). Wheel spins with animation → lands on segment → TTS speaks the result aloud in Hebrew. Use case: classroom warm-up, random student picker, vocabulary games.

**ID Y03 — Dice Roller (קוביה):**
Hebrew educational dice roller. Multiple dice types: standard 1–6, Hebrew letter die (א–ו), colour die, animal die. Roll → animated 3D flip → result spoken aloud in Hebrew. Educational: counting, letter recognition, vocabulary.

**ID Y04 — Hebrew Jokes (בדיחות לילדים):**
Kid-friendly Hebrew joke card browser. Jokes displayed one at a time with large emoji + setup text. Tap "לחץ לתשובה" to reveal punchline with animation + sound effect. Categories: animals, school, food. Teaches Hebrew reading + humor.

**ID Y05 — General Trivia (טריוויה):**
Hebrew general knowledge trivia. Categories: nature, science, Israel geography, famous people, animals, holidays. 4-choice answers. Difficulty adapts by age group. Points + streak counter. TTS reads each question aloud.

**ID Y06 — Avatar Maker (עצב את הדמות שלך):**
Character customisation tool with Hebrew vocabulary labels. Child builds a character by selecting face, hair, clothes, accessories. Each option is labelled in Hebrew. When a feature is selected, TTS says its Hebrew name ("כובע!", "נעליים ירוקות!"). Final character can be "shared" as a downloadable image. Teaches body parts, clothing, colors vocabulary.

**ID Y07 — Hebrew Crossword (תשבץ):**
Simple Hebrew crossword. Clues are emoji + picture + TTS audio. Player taps letter squares → Hebrew keyboard appears → types the answer. Categories: animals (ages 6+), food, colors, numbers. Teaches Hebrew spelling in context.

**ID Y08 — Hebrew Word Search (חיפוש מילים):**
Grid of Hebrew letters. Category shown: "מצא 5 פירות". Player drags to highlight hidden words. Timer counts up (no pressure). Each found word triggers TTS + celebration. Grid sizes: 5×5 (young), 8×8 (older). Teaches letter recognition and reading direction (right-to-left).

**ID Y09 — Rhythm & Syllables (משחק הברות):**
Syllable-clapping game. Hebrew word appears + image. A rhythm beat plays. Player taps in time with the syllables (ח-ת-ו-ל = 4 taps). TTS model claps and speaks each syllable. Score = accuracy of timing. Teaches phonological awareness and syllable segmentation.

**ID Y10 — Hebrew Riddles Enhanced (חידות משודרגות):**
Upgraded riddle experience beyond the current implementation. Multi-step reveal: riddle spoken via TTS → player sees 3 clue images progressively revealed → 4-choice answer. Categories: animals, food, nature, objects. Points for guessing early (fewer clues). Teaches deductive reasoning + vocabulary.

**ID Y11 — Pac-Man style maze (מבוך אותיות):**
Maze game where the player collects Hebrew letters spelling a target word. Letters appear in the maze in random order. Player navigates a character using arrows/swipe → collects letters in the correct order → earns points. Incorrect order = letter bounces back. Teaches letter ordering and simple word spelling.

**ID Y12 — Hebrew Countdown Timer (שעון ספירה לאחור):**
Educational timer tool for classroom/home use. Teacher sets time (30s, 1min, 3min). Display is large, colorful, with animated countdown. At zero: celebration animation + Hebrew audio "הזמן נגמר!". Optional "tick" sound. Bonus: "מהירות ספירה" game — count from 20 to 1 faster than the timer.

**ID Y13 — Daily Facts Card (עובדה יומית):**
One surprising Hebrew fact per day for kids. Large card with emoji + illustration + 2-3 sentence fact in simple Hebrew. TTS reads it aloud. Categories: animals, science, Israel, space, human body. "השתף עם חבר" button. Teaches general knowledge + Hebrew reading.

**ID Y14 — Step-by-step Craft Guide (פרויקט יצירה):**
Guided craft activity with Hebrew instructions. Example: "איך לעשות ספינת נייר". Steps shown one by one with illustration + Hebrew text + TTS audio. "הבא" button advances. At the end: "כל הכבוד! עשית [שם הפרויקט]!". Teaches following instructions + Hebrew reading in a practical context.

**ID Y15 — Age Calculator (כמה אני בן/בת):**
Fun age calculator for kids. Child inputs birthday → system calculates exact age in years, months, days, hours, and seconds. Displayed with playful animations and Hebrew text ("אתה בן 7 שנים, 3 חודשים ו-12 ימים!"). Bonus: counts down to next birthday. Teaches math + reading numbers in Hebrew.

Generate **at least 5 more** original ideas beyond Y01–Y15, looking at yo-yoo content types not yet covered. Prioritise ideas that are unique to an Israeli/Hebrew educational context.

---

## Phase 4 — Prioritised Content Backlog

Rank all ideas by **Educational Impact ÷ Effort** (most valuable + easiest first).

```
## 🎮 GamesForMyKids × Yo-Yoo — New Content Backlog
Date: <today>
Reference: yo-yoo.co.il content catalog

---

### ⚡ Quick Wins (S effort, High impact)
| ID | Activity | Content Type | Style | Effort | Impact | Age |
|----|---------|-------------|-------|--------|--------|-----|
| Y02 | ... | spinner | D | S | 🔴 | all |
...

---

### 🚀 Big Bets (L–XL effort, High impact)
| ID | Activity | Content Type | Style | Effort | Impact | Age |
|----|---------|-------------|-------|--------|--------|-----|
...

---

### 🌱 Someday / Maybe (any effort, Low impact or experimental)
| ID | Activity | Content Type | Style | Effort | Impact | Age |
|----|---------|-------------|-------|--------|--------|-----|
...

---

### 📋 Full Activity Details
<paste all activity blocks from Phase 3 here>
```

---

## Phase 5 — Issue Creation (requires confirmation)

**Before creating anything**, print the list:

```
I'm about to create N GitHub issues for new Yo-Yoo-inspired content. Here's the list:

1. [D] <slug> — <Hebrew name> (<content type>)
2. [B] <slug> — <Hebrew name> (<content type>)
...

Shall I proceed? (yes / no / select numbers)
```

Only create issues **after explicit user confirmation**.

For each approved item:

```bash
gh issue create \
  --repo benshabbat/GamesForMyKids \
  --title "feat(game): <hebrew-name> / <english-slug> — <content type>" \
  --label "new-game" \
  --body "## Yo-Yoo inspiration
<original yo-yoo.co.il content type this is inspired by>

## Hebrew educational skin
<how the content is replaced with Hebrew/educational material>

## Experience loop
<3 sentences describing exactly how the activity plays>

## Example interaction
<one concrete example of a child's action and the result>

## Educational value
<what children learn — letters, vocabulary, math, creativity, etc.>

## Target age
<3–5 / 5–7 / 7–10 / all ages>

## Game style
Style <A/B/C/D> — <reason>

## Key files to create
\`\`\`
app/games/<slug>/
├── <Slug>Client.tsx
├── <slug>Store.ts
├── use<Slug>.ts
└── components/
    ├── <Slug>Screen.tsx
    └── <Slug>Menu.tsx
\`\`\`

## Acceptance criteria
- [ ] Activity is playable/usable end-to-end
- [ ] Hebrew TTS speaks each interaction correctly
- [ ] Works on mobile touch (iOS Safari + Android Chrome)
- [ ] RTL layout is correct
- [ ] Activity appears in home page category grid
- [ ] \`npx tsc --noEmit\` passes
- [ ] \`npm run build\` passes

## Effort estimate
<S / M / L / XL>

## Notes / open questions
<any design or technical considerations>
"
```

---

## Rules

- **Fun first, education second.** The activity must be genuinely enjoyable for a child. If the educational skin kills the fun, redesign.
- **No duplicates.** Read CUSTOM_GAME_TYPES and open issues carefully. Skip anything already tracked.
- **Hebrew-first always.** All UI text, TTS, labels, and instructions must be in Hebrew and RTL-correct.
- **Age-appropriate content.** Jokes and riddles must be appropriate for ages 3–10. Nothing scary, violent, or adult.
- **Audio is not optional.** Every new activity must use `useGameAudio` for TTS on key interactions.
- **Style D only for true custom mechanics.** If a game can be built with Style A/B/C, use those — they ship faster.
- **Utility tools are valid.** Spinners, dice, timers, and calculators are legitimate content even if not "games" — they drive return visits and classroom use.
- **Never create issues without user confirmation.**
- **Read-only advisory.** This skill does not modify code. To implement, use `/game-scaffolder` or implement manually following CLAUDE.md guides.
