"""
fix-canvas-migration.py
Fixes the output of migrate-canvas-arcade.py:
  1. Move factory call to FIRST statement of each wrapper function
  2. Add serveBall into pong's draw callback
  3. Restore useRef import in catch-fruit and frogger (still used for local refs)
  4. Fix flappy-bird's s.current collision
Run from: gamesformykids/ directory.
"""

import re
import pathlib

BASE = pathlib.Path(".")


def move_factory_call_first(content: str, func_name: str, factory_call_pattern: str) -> str:
    """
    Find `const { ... } = _useXxx();` anywhere in the function body,
    remove it, then insert it as the VERY FIRST statement after the function
    opening brace.
    """
    # Find and capture the factory call line(s)
    m = re.search(factory_call_pattern, content)
    if not m:
        print(f"  WARNING: factory call not found for {func_name}")
        return content

    factory_line = m.group(0)
    # Remove from current position
    content = content[:m.start()] + content[m.end():]

    # Find the function opening brace
    func_m = re.search(r"\nexport function " + func_name + r"\(\)", content)
    if not func_m:
        print(f"  WARNING: function {func_name} not found")
        return content

    open_brace = content.index("{", func_m.end())
    # Insert factory call right after '{'
    content = content[: open_brace + 1] + "\n" + factory_line + content[open_brace + 1 :]
    return content


def fix_pong():
    path = BASE / "app/games/pong/usePongGame.ts"
    content = path.read_text(encoding="utf-8")

    # 1. Move factory call to first line of function
    content = move_factory_call_first(
        content,
        "usePongGame",
        r"  const \{ st, canvasRef, handlers \} = _usePong\(\);\n",
    )

    # 2. Add serveBall inside draw callback (before `if (s.phase === 'playing')`)
    serve_ball_fn = (
        "\n    function serveBall(direction: 1 | -1) {\n"
        "      const spd = 4 + Math.min(s.playerScore + s.aiScore, 8) * 0.2;\n"
        "      const angle = (Math.random() - 0.5) * 1.0;\n"
        "      s.ballX = W / 2; s.ballY = H / 2;\n"
        "      s.ballVX = Math.sin(angle) * spd; s.ballVY = direction * Math.cos(angle) * spd;\n"
        "    }\n"
    )
    content = content.replace(
        "\n    if (s.phase === 'playing') {\n      s.ballX +=",
        serve_ball_fn + "\n    if (s.phase === 'playing') {\n      s.ballX +=",
    )

    # 3. Move the import type to the top imports section
    content = content.replace(
        "import { createCanvasArcadeHook } from '@/hooks/canvas';\n\nexport const W",
        "import { createCanvasArcadeHook } from '@/hooks/canvas';\nimport type { PhaseResult as Phase } from '@/lib/types';\n\nexport const W",
    )
    content = content.replace(
        "\nimport type { PhaseResult as Phase } from '@/lib/types';\n\nconst _usePong",
        "\nconst _usePong",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed pong")


def fix_meteor_dodge():
    path = BASE / "app/games/meteor-dodge/useMeteorDodgeGame.ts"
    content = path.read_text(encoding="utf-8")

    content = move_factory_call_first(
        content,
        "useMeteorDodgeGame",
        r"  const \{ st, canvasRef, handlers \} = _useMeteorDodge\(\);\n",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed meteor-dodge")


def fix_flappy_bird():
    """
    Special: original used `s = useRef(...)` (not `st`).
    In resetGame and flap: `const st = s.current` must become `const s = st.current`
    and all `st.xxx` inside those callbacks → `s.xxx`.
    Also: move factory call to first line.
    """
    path = BASE / "app/games/flappy-bird/useFlappyBirdGame.ts"
    content = path.read_text(encoding="utf-8")

    # Move factory call first
    content = move_factory_call_first(
        content,
        "useFlappyBirdGame",
        r"  const \{ st, canvasRef \} = _useFlappyBird\(\);\n",
    )

    # Fix resetGame callback: `const st = s.current;` → `const s = st.current;`
    # and `st.xxx` → `s.xxx` within resetGame
    def fix_callback(match):
        body = match.group(0)
        # Replace `const st = s.current;` → `const s = st.current;`
        # BUT s.current here refers to the OLD ref `s`; after migration `st` is the factory ref
        body = body.replace("const st = s.current;", "const s = st.current;")
        # Replace `st.xxx` with `s.xxx` (state property access, not the ref)
        # Use negative lookbehind to avoid replacing `_st.xxx` or similar
        body = re.sub(r"\bst\.(?!current\b)", "s.", body)
        return body

    # Fix the resetGame callback
    content = re.sub(
        r"  const resetGame = useCallback\(\(\) => \{.*?\}, \[\]\);",
        fix_callback,
        content,
        flags=re.DOTALL,
    )

    # Fix the flap callback
    content = re.sub(
        r"  const flap = useCallback\(\(\) => \{.*?\}, \[resetGame\]\);",
        fix_callback,
        content,
        flags=re.DOTALL,
    )

    # Fix handleInput callback if it also uses s.current
    content = re.sub(
        r"  const handleInput = useCallback\([^)]+\) => \{.*?\}, \[[^\]]*\]\);",
        fix_callback,
        content,
        flags=re.DOTALL,
    )

    # Remove the leftover `s.current → st.current` replacement artifacts
    # (the global replacement from the original script may have broken things)
    # Specifically: if `const st = st.current;` still appears, fix it
    content = content.replace("const st = st.current;", "const s = st.current;")

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed flappy-bird")


def fix_dino_runner():
    path = BASE / "app/games/dino-runner/useDinoRunnerGame.ts"
    content = path.read_text(encoding="utf-8")

    content = move_factory_call_first(
        content,
        "useDinoRunnerGame",
        r"  const \{ st, canvasRef \} = _useDinoRunner\(\);\n",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed dino-runner")


def fix_frogger():
    path = BASE / "app/games/frogger/useFroggerGame.ts"
    content = path.read_text(encoding="utf-8")

    # Restore useRef import (frogger uses it for touchRef)
    content = content.replace(
        "import { useEffect, useCallback } from 'react';",
        "import { useEffect, useRef, useCallback } from 'react';",
    )

    content = move_factory_call_first(
        content,
        "useFroggerGame",
        r"  const \{ st, canvasRef \} = _useFrogger\(\);\n",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed frogger")


def fix_stack():
    path = BASE / "app/games/stack/useStackGame.ts"
    content = path.read_text(encoding="utf-8")

    content = move_factory_call_first(
        content,
        "useStackGame",
        r"  const \{ st, canvasRef, saveGameResultRef \} = _useStack\(\);\n",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed stack")


def fix_jumper():
    path = BASE / "app/games/jumper/useJumperGame.ts"
    content = path.read_text(encoding="utf-8")

    content = move_factory_call_first(
        content,
        "useJumperGame",
        r"  const \{ st, canvasRef \} = _useJumper\(\);\n",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed jumper")


def fix_catch_fruit():
    path = BASE / "app/games/catch-fruit/useCatchFruitGame.ts"
    content = path.read_text(encoding="utf-8")

    # Restore useRef import (still used for dragging / pointerDown)
    content = content.replace(
        "import { useCallback } from 'react';",
        "import { useRef, useCallback } from 'react';",
    )

    content = move_factory_call_first(
        content,
        "useCatchFruitGame",
        r"  const \{ st, canvasRef \} = _useCatchFruit\(\);\n",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed catch-fruit")


def fix_space_defender():
    path = BASE / "app/games/space-defender/useSpaceDefenderGame.ts"
    content = path.read_text(encoding="utf-8")

    content = move_factory_call_first(
        content,
        "useSpaceDefenderGame",
        r"  const \{ st, canvasRef \} = _useSpaceDefender\(\);\n",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed space-defender")


def fix_brick_breaker():
    path = BASE / "app/games/brick-breaker/useBrickBreakerGame.ts"
    content = path.read_text(encoding="utf-8")

    content = move_factory_call_first(
        content,
        "useBrickBreakerGame",
        r"  const \{ st, canvasRef, handlers \} = _useBrickBreaker\(\);\n",
    )

    path.write_text(content, encoding="utf-8")
    print("✓ Fixed brick-breaker")


if __name__ == "__main__":
    fix_pong()
    fix_meteor_dodge()
    fix_flappy_bird()
    fix_dino_runner()
    fix_frogger()
    fix_stack()
    fix_jumper()
    fix_catch_fruit()
    fix_space_defender()
    fix_brick_breaker()
    print("\nAll fixes applied.")
