"""
migrate-canvas-arcade.py
Migrates 10 canvas arcade games to use the createCanvasArcadeHook factory.
Run from: gamesformykids/ directory.
"""

import re
import pathlib


def find_matching_close(text: str, open_pos: int) -> int:
    """
    Given `open_pos` pointing at an opening '{' in `text`,
    return the index of the matching closing '}'.
    Handles nested braces and ignores braces inside strings/template literals.
    """
    depth = 0
    i = open_pos
    in_str: bool = False
    str_char: str = ""
    escaped: bool = False
    in_template: int = 0  # nesting depth of template literals

    while i < len(text):
        c = text[i]
        if escaped:
            escaped = False
        elif c == "\\" and in_str:
            escaped = True
        elif in_str:
            if c == str_char:
                in_str = False
        elif c == "`":
            in_template += 1
        elif in_template and c == "`":
            in_template -= 1
        elif c in ('"', "'"):
            in_str = True
            str_char = c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return -1


def extract_canvas_loop_body(content: str):
    """
    Find `const canvasRef = useCanvasLoop((ctx...)  => { ... });`
    and return (callback_body_str, canvas_call_start, canvas_call_end_exclusive).
    callback_body_str does NOT include the outer braces.
    """
    m = re.search(
        r"  const canvasRef = useCanvasLoop\(\(ctx(?:, dt)?\) => \{",
        content,
    )
    if not m:
        return None, -1, -1

    brace_open = m.end() - 1  # position of the opening '{'
    brace_close = find_matching_close(content, brace_open)
    if brace_close == -1:
        return None, -1, -1

    # After the closing '}' comes ');'  followed by optional whitespace / newline
    call_end = brace_close + 1
    while call_end < len(content) and content[call_end] in (" ", "\t"):
        call_end += 1
    if content[call_end : call_end + 2] == ");":
        call_end += 2

    body = content[brace_open + 1 : brace_close]
    return body, m.start(), call_end


def extract_use_ref_block(content: str):
    """
    Find `  const st = useRef({...});` (may span multiple lines) and return
    (block_str, start, end_exclusive).
    """
    m = re.search(r"  const (?:st|s) = useRef\(\{", content)
    if not m:
        return None, -1, -1

    brace_open = m.end() - 1
    brace_close = find_matching_close(content, brace_open)
    if brace_close == -1:
        return None, -1, -1

    # Skip trailing  '  });'  or  '  })  as MutableRefObject<...>);'
    end = brace_close + 1
    while end < len(content) and content[end] in (" ", "\t"):
        end += 1
    # might be   '  as XXX'
    if content[end:].startswith(" as "):
        paren_end = content.find(");", end)
        if paren_end != -1:
            end = paren_end + 2
    elif content[end : end + 2] == ");":
        end += 2

    block = content[m.start() : end]
    return block, m.start(), end


# ─── Shared helpers ────────────────────────────────────────────────────────────

def fix_draw_body(body: str, state_var: str = "s") -> str:
    """
    Transform a raw useCanvasLoop callback body for use in factory draw config:
    1.  Remove `const s = st.current;`  (or `const st = s.current;` etc.)
    2.  Change `const curr = st.current;` → `const curr = s;`
    3.  Change `saveGameResultRef.current` → `saveRef.current`
    4.  Keep everything else (including emoji) verbatim.
    """
    # Remove the first `const X = Y.current;\n` line (state alias at top of loop)
    body = re.sub(r"^\n?    const (?:s|st|curr2?) = (?:s|st)\.current;\n", "", body, count=1)

    # Also handle `const curr = st.current;` anywhere (rename to use `s`)
    body = body.replace("const curr = st.current;", "const curr = s;")
    body = body.replace("const curr = s.current;", "const curr = s;")

    # Rename saveGameResultRef → saveRef
    body = body.replace("saveGameResultRef.current", "saveRef.current")

    return body


# ─── Per-game migrations ───────────────────────────────────────────────────────

BASE = pathlib.Path(".")


def migrate_pong():
    path = BASE / "app/games/pong/usePongGame.ts"
    content = path.read_text(encoding="utf-8")

    # --- imports ---
    content = re.sub(
        r"import \{ useEffect, useRef, useCallback \} from 'react';",
        "import { useEffect, useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # --- extract loop body ---
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in pong"

    draw_body = fix_draw_body(body)

    # Move serveBall inside draw (it was a module-level helper in the function);
    # the original function has `function serveBall` BEFORE useCanvasLoop, so
    # it's already captured inside loop body indirectly — actually it's OUTSIDE
    # the loop in the original source.  We leave it as a nested helper inside draw.

    # --- build factory config ---
    factory = (
        "\nconst _usePong = createCanvasArcadeHook({\n"
        "  gameType: 'pong',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    playerX: W / 2 - PAD_W / 2, aiX: W / 2 - PAD_W / 2,\n"
        "    ballX: W / 2, ballY: H / 2, ballVX: 3, ballVY: 4,\n"
        "    playerScore: 0, aiScore: 0, frame: 0, startTime: 0,\n"
        "    particles: [] as { x: number; y: number; vx: number; vy: number; life: number }[],\n"
        "  }),\n"
        "  onPointerX: (s, x) => { s.playerX = Math.max(0, Math.min(W - PAD_W, x - PAD_W / 2)); },\n"
        f"  draw: (ctx, s, _dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    # --- strip the serveBall declaration from inside the function (it moves into draw) ---
    # serveBall in original is inside the hook, before useCanvasLoop
    content = re.sub(
        r"  function serveBall\(direction: 1 \| -1\) \{[^}]+\}\n\n",
        "",
        content,
    )

    # --- strip saveGameResultRef line ---
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n",
        "",
        content,
    )

    # --- strip st useRef block ---
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # --- re-find loop (positions shifted) ---
    body2, loop_start2, loop_end2 = extract_canvas_loop_body(content)
    assert body2 is not None

    # --- insert factory before function, replace loop with factory call ---
    func_m = re.search(r"\nexport function usePongGame\(\)", content)
    assert func_m

    # Replace the canvas loop with the factory hook call
    replacement_call = "  const { st, canvasRef, handlers } = _usePong();"
    content = content[:loop_start2] + replacement_call + content[loop_end2:]

    # Insert factory before the function
    content = content[:func_m.start()] + factory + content[func_m.start():]

    # --- fix startGame (remove startTime from st.current since st.current is now used) ---
    # startGame now needs to set startTime on st.current
    # Already correct since it uses s = st.current

    # --- fix return statement: map handlers ---
    content = content.replace(
        "    canvasRef, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleCanvasClick,",
        "    canvasRef, startGame, handleMouseMove: handlers.onMouseMove, handleTouchMove: handlers.onTouchMove, handleTouchStart, handleCanvasClick,",
    )

    # Remove handleMouseMove and handleTouchMove declarations (replaced by factory)
    content = re.sub(
        r"  const handleMouseMove = useCallback\(\(e: React\.MouseEvent<HTMLCanvasElement>\) => \{[^}]+\}, \[\]\);\n\n",
        "",
        content,
    )
    content = re.sub(
        r"  const handleTouchMove = useCallback\(\(e: React\.TouchEvent<HTMLCanvasElement>\) => \{[^}]+\}, \[\]\);\n\n",
        "",
        content,
    )

    # Replace handleTouchStart to use handlers.onTouchMove
    content = content.replace(
        "    handleTouchMove(e);",
        "    handlers.onTouchMove(e);",
    )

    # handleTouchStart now needs `handlers` and `st` in its deps
    content = content.replace(
        "  }, [startGame, handleTouchMove]);",
        "  }, [startGame, handlers, st]);",
    )

    # Fix nudgeLeft/nudgeRight: they reference st
    content = content.replace(
        "    nudgeLeft:  () => { const s = st.current; s.playerX = Math.max(0, s.playerX - 45); },",
        "    nudgeLeft:  () => { const s = st.current; s.playerX = Math.max(0, s.playerX - 45); },",
    )

    path.write_text(content, encoding="utf-8")
    print(f"✓ Migrated pong")


def migrate_meteor_dodge():
    path = BASE / "app/games/meteor-dodge/useMeteorDodgeGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useEffect, useRef, useCallback \} from 'react';",
        "import { useEffect, useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n",
        "",
        content,
    )

    # strip useRef block
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in meteor-dodge"
    draw_body = fix_draw_body(body)

    initial_state = (
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    playerX: W / 2,\n"
        "    meteors: [] as Meteor[], stars: [] as StarPick[],\n"
        "    score: 0, best: 0, frame: 0, nextMeteor: 50, nextStar: 120,\n"
        "    bgStars: Array.from({ length: 50 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.5 + Math.random() * 1.5, twinkle: Math.random() * Math.PI * 2 })),\n"
        "    invincible: 0, startTime: 0,\n"
        "  }),\n"
    )

    factory = (
        "\nconst _useMeteorDodge = createCanvasArcadeHook({\n"
        "  gameType: 'meteor-dodge',\n"
        "  width: W,\n"
        "  height: H,\n"
        + initial_state
        + "  onPointerX: (s, x) => { s.playerX = Math.max(PLAYER_R, Math.min(W - PLAYER_R, x)); },\n"
        f"  draw: (ctx, s, _dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useMeteorDodgeGame\(\)", content)
    assert func_m

    replacement_call = "  const { st, canvasRef, handlers } = _useMeteorDodge();"
    content = content[:loop_start] + replacement_call + content[loop_end:]

    content = content[:func_m.start()] + factory + content[func_m.start():]

    # Remove handleMouseMove / handleTouchMove (replaced by handlers)
    content = re.sub(
        r"  const handleMouseMove = useCallback\(\(e: React\.MouseEvent<HTMLCanvasElement>\) => \{[^}]+\}, \[\]\);\n\n",
        "",
        content,
    )
    content = re.sub(
        r"  const handleTouchMove = useCallback\(\(e: React\.TouchEvent<HTMLCanvasElement>\) => \{[^}]+\}, \[\]\);\n\n",
        "",
        content,
    )

    # handleTouchStart now uses handlers.onTouchMove
    content = content.replace(
        "    handleTouchMove(e);",
        "    handlers.onTouchMove(e);",
    )
    content = re.sub(
        r"  \}, \[startGame, handleTouchMove\]\);",
        "  }, [startGame, handlers, st]);",
        content,
    )

    # fix deps in keyboard useEffect (closes over st ref)
    content = re.sub(
        r"  \}, \[\]\);\n\n  const nudgeLeft",
        "  }, [st]);\n\n  const nudgeLeft",
        content,
    )

    # fix return
    content = content.replace(
        "return { canvasRef, startGame, handleMouseMove, handleTouchMove, handleCanvasClick, handleTouchStart,",
        "return { canvasRef, startGame, handleMouseMove: handlers.onMouseMove, handleTouchMove: handlers.onTouchMove, handleCanvasClick, handleTouchStart,",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated meteor-dodge")


def migrate_flappy_bird():
    path = BASE / "app/games/flappy-bird/useFlappyBirdGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useRef, useCallback \} from 'react';",
        "import { useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n\n?",
        "",
        content,
    )

    # The ref in flappy-bird is `const s = useRef(...)` with `st = s.current` in the loop
    # Strip the `const s = useRef({...});` block
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in flappy-bird"

    # In flappy-bird the loop uses `const st = s.current;` — fix to `const st = s;`
    draw_body = body.replace("const st = s.current;", "const st = s;")
    draw_body = draw_body.replace("saveGameResultRef.current", "saveRef.current")

    factory = (
        "\nconst _useFlappyBird = createCanvasArcadeHook({\n"
        "  gameType: 'flappy-bird',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    birdY: H / 2,\n"
        "    birdVY: 0,\n"
        "    pipes: [] as Pipe[],\n"
        "    score: 0,\n"
        "    frame: 0,\n"
        "    bgOffset: 0,\n"
        "    startTime: 0,\n"
        "  }),\n"
        f"  draw: (ctx, s, _dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useFlappyBirdGame\(\)", content)
    assert func_m

    replacement_call = "  const { st, canvasRef } = _useFlappyBird();"
    content = content[:loop_start] + replacement_call + content[loop_end:]
    content = content[:func_m.start()] + factory + content[func_m.start():]

    # The flappy-bird wrapper uses `const s = useRef(...)` as ref name.
    # After factory migration, `s` is removed. All references to `s.current` in
    # the hook (resetGame, flap) should become `st.current`.
    content = re.sub(r"\b(?<!\.)s\.current\b", "st.current", content)

    # fix return
    content = content.replace(
        "  return { canvasRef, flap, handleInput, phase, best, score };",
        "  return { canvasRef, flap, handleInput, phase, best, score };",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated flappy-bird")


def migrate_dino_runner():
    path = BASE / "app/games/dino-runner/useDinoRunnerGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useEffect, useRef, useCallback \} from 'react';",
        "import { useEffect, useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n\n?",
        "",
        content,
    )

    # strip useRef block
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in dino-runner"
    draw_body = fix_draw_body(body)

    factory = (
        "\nconst _useDinoRunner = createCanvasArcadeHook({\n"
        "  gameType: 'dino-runner',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    dinoY: GROUND_Y - DINO_H,\n"
        "    dinoVY: 0,\n"
        "    onGround: true,\n"
        "    obstacles: [] as Obstacle[],\n"
        "    clouds: [{ x: 100, y: 40 }, { x: 280, y: 25 }, { x: 360, y: 55 }] as Cloud[],\n"
        "    score: 0,\n"
        "    frame: 0,\n"
        "    speed: BASE_SPEED,\n"
        "    nextObstacle: 80,\n"
        "    startTime: 0,\n"
        "  }),\n"
        f"  draw: (ctx, s, _dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useDinoRunnerGame\(\)", content)
    assert func_m

    replacement_call = "  const { st, canvasRef } = _useDinoRunner();"
    content = content[:loop_start] + replacement_call + content[loop_end:]
    content = content[:func_m.start()] + factory + content[func_m.start():]

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated dino-runner")


def migrate_frogger():
    path = BASE / "app/games/frogger/useFroggerGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useEffect, useRef, useCallback \} from 'react';",
        "import { useEffect, useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n",
        "",
        content,
    )

    # strip useRef block
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in frogger"
    draw_body = fix_draw_body(body)

    factory = (
        "\nconst _useFrogger = createCanvasArcadeHook({\n"
        "  gameType: 'frogger',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    fCol: 4, fRow: 8,\n"
        "    lives: 3, score: 0, best: 0, level: 1,\n"
        "    frame: 0, dead: false, deadTimer: 0, startTime: 0,\n"
        "    lanes: makeLanes(),\n"
        "  }),\n"
        f"  draw: (ctx, s, _dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useFroggerGame\(\)", content)
    assert func_m

    replacement_call = "  const { st, canvasRef } = _useFrogger();"
    content = content[:loop_start] + replacement_call + content[loop_end:]
    content = content[:func_m.start()] + factory + content[func_m.start():]

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated frogger")


def migrate_stack():
    path = BASE / "app/games/stack/useStackGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useEffect, useRef, useCallback \} from 'react';",
        "import { useEffect, useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line (stack uses it in drop(), not draw — so we keep it
    # accessible via factory return)
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n\n?",
        "",
        content,
    )

    # strip useRef block
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body (stack's draw does NOT use saveRef)
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in stack"
    draw_body = fix_draw_body(body)

    factory = (
        "\nconst _useStack = createCanvasArcadeHook({\n"
        "  gameType: 'stack',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    blocks: [] as Block[],\n"
        "    curX: 0, curW: INIT_W,\n"
        "    curDir: 1 as 1 | -1,\n"
        "    curSpeed: 2.5,\n"
        "    camOffset: 0,\n"
        "    score: 0, best: 0,\n"
        "    colorIdx: 0,\n"
        "    frame: 0,\n"
        "    startTime: 0,\n"
        "  }),\n"
        f"  draw: (ctx, s, _dt, _saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useStackGame\(\)", content)
    assert func_m

    # The `drop` callback uses saveGameResultRef — it comes from factory return
    replacement_call = "  const { st, canvasRef, saveGameResultRef } = _useStack();"
    content = content[:loop_start] + replacement_call + content[loop_end:]
    content = content[:func_m.start()] + factory + content[func_m.start():]

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated stack")


def migrate_jumper():
    path = BASE / "app/games/jumper/useJumperGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useEffect, useRef, useCallback \} from 'react';",
        "import { useEffect, useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n\n?",
        "",
        content,
    )

    # strip useRef block
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in jumper"
    draw_body = fix_draw_body(body)

    factory = (
        "\nconst _useJumper = createCanvasArcadeHook({\n"
        "  gameType: 'jumper',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    px: W / 2, py: H - 100,\n"
        "    pvx: 0, pvy: 0,\n"
        "    camY: 0,\n"
        "    maxCamY: 0,\n"
        "    platforms: generateInitial() as Array<Platform & { id: number }>,\n"
        "    score: 0, best: 0,\n"
        "    frame: 0,\n"
        "    leftDown: false, rightDown: false,\n"
        "    nextPlatY: H - 60 - INIT_PLATS * (PLAT_GAP * 0.75),\n"
        "    startTime: 0,\n"
        "  }),\n"
        f"  draw: (ctx, s, _dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useJumperGame\(\)", content)
    assert func_m

    replacement_call = "  const { st, canvasRef } = _useJumper();"
    content = content[:loop_start] + replacement_call + content[loop_end:]
    content = content[:func_m.start()] + factory + content[func_m.start():]

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated jumper")


def migrate_catch_fruit():
    """
    catch-fruit has mouse-down drag semantics, so we don't use onPointerX.
    We still use the factory for useGameCompletion + useRef + useCanvasLoop.
    The custom pointer handlers remain in the wrapper hook.
    """
    path = BASE / "app/games/catch-fruit/useCatchFruitGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useRef, useCallback \} from 'react';",
        "import { useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n",
        "",
        content,
    )

    # strip useRef block (multi-line)
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in catch-fruit"
    draw_body = fix_draw_body(body)

    factory = (
        "\nconst _useCatchFruit = createCanvasArcadeHook({\n"
        "  gameType: 'catch-fruit',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    basketX: W / 2 - BASKET_W / 2,\n"
        "    items: [] as FallingItem[],\n"
        "    score: 0, lives: 3, timeLeft: GAME_DURATION, frame: 0, nextItem: 40, startTime: 0,\n"
        "    bgStars: Array.from({ length: 8 }, () => ({ x: Math.random() * W, y: Math.random() * H * 0.7, r: 2 + Math.random() * 3 })),\n"
        "  }),\n"
        f"  draw: (ctx, s, dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useCatchFruitGame\(\)", content)
    assert func_m

    # The wrapper keeps the custom pointer handlers; st comes from factory
    replacement_call = "  const { st, canvasRef } = _useCatchFruit();"
    content = content[:loop_start] + replacement_call + content[loop_end:]
    content = content[:func_m.start()] + factory + content[func_m.start():]

    # pointer handlers reference canvasRef — but now canvasRef is from factory return.
    # They use `canvasRef.current` to get the bounding rect. This still works since
    # canvasRef is in scope via _useCatchFruit().
    # The handleMouseMove / handleTouchMove still need [canvasRef] in deps.
    # canvasRef type is React.RefObject<HTMLCanvasElement | null> — same as before.

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated catch-fruit")


def migrate_space_defender():
    """
    space-defender: touch = move AND shoot. We keep custom pointer handlers.
    Factory handles useGameCompletion + useRef + useCanvasLoop.
    """
    path = BASE / "app/games/space-defender/useSpaceDefenderGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useEffect, useRef, useCallback \} from 'react';",
        "import { useEffect, useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n",
        "",
        content,
    )

    # strip useRef block
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in space-defender"
    draw_body = fix_draw_body(body)

    factory = (
        "\nconst _useSpaceDefender = createCanvasArcadeHook({\n"
        "  gameType: 'space-defender',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    shipX: W / 2,\n"
        "    bullets: [] as Bullet[],\n"
        "    asteroids: [] as Asteroid[],\n"
        "    score: 0, lives: 3, timeLeft: GAME_DURATION, frame: 0, nextAsteroid: 60, startTime: 0,\n"
        "    stars: Array.from({ length: 40 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.5 + Math.random() * 2, twinkle: Math.random() * Math.PI * 2 })),\n"
        "    lastShot: 0,\n"
        "  }),\n"
        f"  draw: (ctx, s, dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useSpaceDefenderGame\(\)", content)
    assert func_m

    replacement_call = "  const { st, canvasRef } = _useSpaceDefender();"
    content = content[:loop_start] + replacement_call + content[loop_end:]
    content = content[:func_m.start()] + factory + content[func_m.start():]

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated space-defender")


def migrate_brick_breaker():
    """
    brick-breaker: canvas loop calls startGame(nextLevel) for level progression.
    Solution: module-level mutable ref `_brickStartNextLevel` that the wrapper sets
    each render, allowing the draw config to trigger level changes.
    """
    path = BASE / "app/games/brick-breaker/useBrickBreakerGame.ts"
    content = path.read_text(encoding="utf-8")

    # imports
    content = re.sub(
        r"import \{ useEffect, useRef, useCallback \} from 'react';",
        "import { useEffect, useCallback } from 'react';",
        content,
    )
    content = content.replace(
        "import { useCanvasLoop } from '@/hooks/canvas';",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';",
    )
    content = content.replace(
        "import { useGameCompletion } from '@/hooks/shared/progress';\n", ""
    )

    # strip saveGameResultRef line
    content = re.sub(
        r"  const \{ saveGameResultRef \} = useGameCompletion\('[^']+'\);\n\n?",
        "",
        content,
    )

    # strip useRef block
    _, ref_start, ref_end = extract_use_ref_block(content)
    content = content[:ref_start] + content[ref_end:]

    # extract loop body
    body, loop_start, loop_end = extract_canvas_loop_body(content)
    assert body is not None, "Could not find useCanvasLoop in brick-breaker"
    draw_body = fix_draw_body(body)

    # Replace `startGame(nextLevel)` inside draw with `_brickStartNextLevel(nextLevel)`
    draw_body = draw_body.replace(
        "          else { startGame(nextLevel); }",
        "          else { _brickStartNextLevel(nextLevel); }",
    )

    factory = (
        "\n// Module-level ref so the draw config can trigger level progression\n"
        "// (brick-breaker advances levels from inside the canvas loop).\n"
        "let _brickStartNextLevel: (level: number) => void = () => {};\n"
        "\nconst _useBrickBreaker = createCanvasArcadeHook({\n"
        "  gameType: 'brick-breaker',\n"
        "  width: W,\n"
        "  height: H,\n"
        "  initialState: () => ({\n"
        "    phase: 'menu' as Phase,\n"
        "    padX: W / 2 - PAD_W / 2,\n"
        "    ballX: W / 2, ballY: PAD_Y - BALL_R - 2, ballVX: 3, ballVY: -4, launched: false,\n"
        "    bricks: makeBricks(), score: 0, lives: 3, level: 1, frame: 0,\n"
        "    startTime: 0,\n"
        "    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],\n"
        "  }),\n"
        "  onPointerX: (s, x) => { s.padX = Math.max(0, Math.min(W - PAD_W, x - PAD_W / 2)); },\n"
        f"  draw: (ctx, s, _dt, saveRef) => {{{draw_body}}},\n"
        "});\n"
    )

    func_m = re.search(r"\nexport function useBrickBreakerGame\(\)", content)
    assert func_m

    replacement_call = "  const { st, canvasRef, handlers } = _useBrickBreaker();"
    content = content[:loop_start] + replacement_call + content[loop_end:]
    content = content[:func_m.start()] + factory + content[func_m.start():]

    # Wire _brickStartNextLevel in the wrapper hook (after startGame is defined)
    # Find the startGame useCallback and insert the wire after it
    content = content.replace(
        "  }, []);\n\n  const handleClick",
        "  }, []);\n  // Wire level-progression callback so draw config can call it\n  _brickStartNextLevel = startGame;\n\n  const handleClick",
    )

    # Remove movePaddle (replaced by factory onPointerX) but keep handleTouchStart/handleMouseMove
    # Actually keep the existing handlers since they use movePaddle which does the same as onPointerX
    # The factory's handlers.onMouseMove / handlers.onTouchMove are equivalent to movePaddle
    # BUT handleTouchStart calls handleClick() too, so we keep it.
    # Let's just replace handleMouseMove and handleTouchMove with the factory ones
    # in the return object, and keep handleTouchStart custom.

    # Remove movePaddle since it's replaced by onPointerX
    content = re.sub(
        r"  const movePaddle = useCallback\([^)]+\) => \{[^}]+\}, \[[^\]]*\]\);\n\n",
        "",
        content,
    )

    # handleMouseMove now delegates to factory
    content = re.sub(
        r"  const handleMouseMove = useCallback\(\(e: React\.MouseEvent<HTMLCanvasElement>\) => \{[^}]+\}, \[[^\]]*\]\);\n\n",
        "",
        content,
    )
    # handleTouchMove now delegates to factory (keep handleTouchStart which calls handleClick)
    content = re.sub(
        r"  const handleTouchMove = useCallback\(\(e: React\.TouchEvent<HTMLCanvasElement>\) => \{[^}]+\}, \[[^\]]*\]\);\n\n",
        "",
        content,
    )

    # handleTouchStart uses movePaddle — replace with handlers.onTouchMove
    content = content.replace(
        "    movePaddle(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());",
        "    handlers.onTouchMove(e);",
    )
    # handleTouchStart deps
    content = re.sub(
        r"  \}, \[handleClick, movePaddle\]\);",
        "  }, [handleClick, handlers]);",
        content,
    )

    # fix return
    content = content.replace(
        "  return { canvasRef, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleClick, nudgeLeft, nudgeRight, phase, score, best, lives, level };",
        "  return { canvasRef, startGame, handleMouseMove: handlers.onMouseMove, handleTouchMove: handlers.onTouchMove, handleTouchStart, handleClick, nudgeLeft, nudgeRight, phase, score, best, lives, level };",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Migrated brick-breaker")


if __name__ == "__main__":
    migrate_pong()
    migrate_meteor_dodge()
    migrate_flappy_bird()
    migrate_dino_runner()
    migrate_frogger()
    migrate_stack()
    migrate_jumper()
    migrate_catch_fruit()
    migrate_space_defender()
    migrate_brick_breaker()
    print("\nAll migrations complete.")
