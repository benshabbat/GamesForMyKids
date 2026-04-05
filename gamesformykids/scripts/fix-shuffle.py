import os
import re
import tempfile

# Derive base from the script's own location — no hardcoded personal paths
_SCRIPTS_DIR = os.path.dirname(os.path.realpath(__file__))
_WORKSPACE_ROOT = os.path.realpath(os.path.join(_SCRIPTS_DIR, '..'))
base = os.path.join(_WORKSPACE_ROOT, 'app', 'games')

if not os.path.isdir(base):
    raise SystemExit(f'ERROR: expected games directory not found: {base}')


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
        os.replace(tmp, path)  # atomic on POSIX; best-effort on Windows
    except Exception:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


# Fisher-Yates variant (most common, 17 files)
FY_FUNC = (
    '\nfunction shuffle<T>(arr: T[]): T[] {\n'
    '  const a = [...arr];\n'
    '  for (let i = a.length - 1; i > 0; i--) {\n'
    '    const j = Math.floor(Math.random() * (i + 1));\n'
    '    [a[i], a[j]] = [a[j], a[i]];\n'
    '  }\n'
    '  return a;\n'
    '}'
)

# Sort-based variant (7 files)
SORT_FUNC = (
    '\nfunction shuffle<T>(arr: T[]): T[] {\n'
    '  return [...arr].sort(() => Math.random() - 0.5);\n'
    '}'
)

IMPORT_LINE = "import { shuffle } from '@/lib/utils';"

ok = 0
fail = 0
base_real = os.path.realpath(base)
for root, dirs, fnames in os.walk(base):
    # Skip symlinked directories (path-traversal guard)
    dirs[:] = [d for d in dirs if not os.path.islink(os.path.join(root, d))]
    for f in fnames:
        if not f.endswith('.ts'):
            continue
        candidate = os.path.join(root, f)
        path = _safe_path(base_real, candidate)
        if path is None:
            print(f'SKIP (outside base): {candidate}')
            continue
        # Skip symlinked files
        if os.path.islink(candidate):
            continue
        try:
            c = open(path, encoding='utf-8').read()
        except OSError as e:
            print(f'READ ERROR {candidate}: {e}')
            continue

        changed = False
        if FY_FUNC in c:
            c = c.replace(FY_FUNC, '')
            changed = True
        elif SORT_FUNC in c:
            c = c.replace(SORT_FUNC, '')
            changed = True

        if changed:
            if IMPORT_LINE not in c:
                lines = c.split('\n')
                last_import = 0
                for i, line in enumerate(lines):
                    if line.startswith('import '):
                        last_import = i
                lines.insert(last_import + 1, IMPORT_LINE)
                c = '\n'.join(lines)
            _atomic_write(path, c)
            rel = path[len(base_real)+1:]
            print(f'OK: {rel}')
            ok += 1
        elif 'function shuffle' in c:
            rel = path[len(base_real)+1:]
            print(f'FAIL (unmatched): {rel}')
            idx = c.find('function shuffle')
            print(f'  -> {repr(c[idx:idx+120])}')
            fail += 1

print(f'\nDone: {ok} ok, {fail} failed')
