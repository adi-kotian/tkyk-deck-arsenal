#!/usr/bin/env bash
# da2-open.sh — open a deck in the in-browser editor.
#
# Usage:
#   ./scripts/da2-open.sh <slug>
#
# What it does:
#   1. Checks whether the dev server is up on localhost:5173.
#   2. If yes: opens http://localhost:5173/s/<slug> in the default browser.
#   3. If no: prints clear instructions to start the server, exits non-zero.
#
# Does NOT auto-start the dev server. Starting it in the background here
# would orphan a process, capture no logs, and create port conflicts on
# repeat runs. The user starts `pnpm dev` in a dedicated terminal once
# per session.
#
# Resolves its own path so DA2 can be moved anywhere on disk.

set -euo pipefail

SLUG="${1:-}"
if [[ -z "$SLUG" ]]; then
  echo "Usage: $(basename "$0") <slug>" >&2
  echo "Example: $(basename "$0") 2026-05-19_taikyoku-master-reference" >&2
  exit 64
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DA2_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SLIDE_DIR="$DA2_ROOT/Projects/$SLUG"

# ─── Sanity: project exists ───────────────────────────────────────────────────
if [[ ! -d "$SLIDE_DIR" ]]; then
  echo "✗ Project not found: $SLIDE_DIR" >&2
  echo "  Expected layout: Projects/<slug>/" >&2
  exit 1
fi

if [[ ! -f "$SLIDE_DIR/index.tsx" ]]; then
  echo "✗ No index.tsx in $SLIDE_DIR" >&2
  echo "  Run /da2-advance to compose the slide first." >&2
  exit 1
fi

# ─── Detect dev server ────────────────────────────────────────────────────────
PORT=5173
URL="http://localhost:${PORT}/s/${SLUG}"

if ! command -v lsof > /dev/null 2>&1; then
  # Fallback: try netcat if lsof not available
  if ! { exec 3<>/dev/tcp/localhost/${PORT}; } 2>/dev/null; then
    SERVER_UP=0
  else
    exec 3<&-; exec 3>&-
    SERVER_UP=1
  fi
else
  if lsof -ti:${PORT} > /dev/null 2>&1; then
    SERVER_UP=1
  else
    SERVER_UP=0
  fi
fi

if [[ "$SERVER_UP" -eq 0 ]]; then
  echo "✗ Dev server is not running on localhost:${PORT}." >&2
  echo >&2
  echo "  Start it in a separate terminal:" >&2
  echo "    cd \"$DA2_ROOT/engine\"" >&2
  echo "    pnpm dev" >&2
  echo >&2
  echo "  Then re-run: $(basename "$0") $SLUG" >&2
  exit 2
fi

# ─── Open the URL ─────────────────────────────────────────────────────────────
echo "✓ Dev server up. Opening $URL ..."

if command -v open > /dev/null 2>&1; then
  # macOS
  open "$URL"
elif command -v xdg-open > /dev/null 2>&1; then
  # Linux
  xdg-open "$URL" > /dev/null 2>&1
elif command -v start > /dev/null 2>&1; then
  # Windows (Git Bash, WSL)
  start "$URL"
else
  echo "  (No 'open' command found. Visit manually: $URL)"
fi
