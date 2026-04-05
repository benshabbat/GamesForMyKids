import os
import tempfile

# Derive base from the script's own location — no hardcoded personal paths
_SCRIPTS_DIR = os.path.dirname(os.path.realpath(__file__))
_WORKSPACE_ROOT = os.path.realpath(os.path.join(_SCRIPTS_DIR, '..'))
base = os.path.join(_WORKSPACE_ROOT, 'app', 'games')

if not os.path.isdir(base):
    raise SystemExit(f'ERROR: expected games directory not found: {base}')

base_real = os.path.realpath(base)


def _safe_path(root: str, candidate: str) -> str | None:
    """Return realpath if candidate is inside root, else None (path-traversal guard)."""
    real = os.path.realpath(candidate)
    if os.path.commonpath([root, real]) != root:
        return None
    return real


def _atomic_write(path: str, text: str) -> None:
    """Write text to path atomically via a temp file in the same directory."""
    dir_ = os.path.dirname(path)
    fd, tmp = tempfile.mkstemp(dir=dir_, suffix='.tmp')
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as fh:
            fh.write(text)
        os.replace(tmp, path)
    except Exception:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


files = [
    ('arithmetic/data/questions.ts', 'rand',
     '\nfunction rand(min: number, max: number) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}',
     "import { randInt as rand } from '@/lib/utils';"),
    ('emoji-math/useEmojiMathGame.ts', 'rnd',
     '\nfunction rnd(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }',
     "import { randInt as rnd } from '@/lib/utils';"),
    ('math-race/useMathRaceGame.ts', 'rnd',
     '\nfunction rnd(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }',
     "import { randInt as rnd } from '@/lib/utils';"),
]

for rel, alias, func_text, import_line in files:
    candidate = os.path.join(base, rel.replace('/', os.sep))
    path = _safe_path(base_real, candidate)
    if path is None or os.path.islink(candidate):
        print(f'SKIP (unsafe path): {rel}')
        continue
    try:
        c = open(path, encoding='utf-8').read()
    except OSError as e:
        print(f'READ ERROR {rel}: {e}')
        continue
    if func_text in c:
        c = c.replace(func_text, '')
        if import_line not in c:
            lines = c.split('\n')
            last_import = 0
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    last_import = i
            lines.insert(last_import + 1, import_line)
            c = '\n'.join(lines)
        _atomic_write(path, c)
        print(f'OK: {rel}')
    else:
        print(f'FAIL: {rel}')
        idx = c.find(f'function {alias}')
        if idx >= 0:
            print(f'  found: {repr(c[idx:idx+80])}')
