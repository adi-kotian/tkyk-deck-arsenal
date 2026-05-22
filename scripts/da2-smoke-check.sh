#!/usr/bin/env bash
# da2-smoke-check.sh — P3.a render smoke-check (Stream 3).
#
# Usage:
#   ./scripts/da2-smoke-check.sh <slug>
#
# What it does:
#   1. Verifies engine/.dev-server.log exists (the dev server must have
#      been started via ./scripts/da2-dev.sh, which tees to this file).
#   2. Verifies Projects/<slug>/index.tsx exists.
#   3. Records the current log line count as a baseline cursor.
#   4. Touches Projects/<slug>/index.tsx to bump mtime.
#   5. **Curls the module URL** via Vite's /@fs/ path to FORCE a
#      transform attempt. Without this, Vite doesn't transform a touched
#      module unless a browser is actively connected and listening for
#      HMR — the original "touch + sleep" design failed silently when
#      no browser was open.
#   6. If the curl returns HTTP 500, that IS a transform error — Vite
#      embeds the failure in the response body. Exit 1 with the excerpt.
#   7. Otherwise sleep briefly, then tail the log from baseline and
#      grep for error patterns (catches HMR-broadcast runtime errors
#      that did make it to the server log).
#
# Why:
#   Transform-clean ≠ renders-clean (the Phase-11 count-up hook regression
#   blanked a deck while passing every transform check). This script
#   catches the transform-error class outright (via HTTP 500) and the
#   subset of runtime errors that propagate to the dev server log. P3.b
#   (headless render check via Playwright) catches the remainder; not
#   shipped in round 1.
#
# Patterns matched (case-insensitive) on the log tail:
#   error · transform error · [plugin:vite] · ReferenceError ·
#   SyntaxError · Pre-transform error · Failed to compile · Cannot find
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
LOG_FILE="$DA2_ROOT/engine/.dev-server.log"
DECK_FILE="$DA2_ROOT/Projects/$SLUG/index.tsx"
DEV_HOST="http://localhost:5173"

# ─── Sanity: log file exists ──────────────────────────────────────────────────
if [[ ! -f "$LOG_FILE" ]]; then
  echo "✗ Dev-server log not found: $LOG_FILE" >&2
  echo "  Run ./scripts/da2-dev.sh in another terminal first." >&2
  echo "  (Bare \`pnpm dev\` does not tee to the log file the smoke-check reads.)" >&2
  exit 2
fi

# ─── Sanity: deck exists ──────────────────────────────────────────────────────
if [[ ! -f "$DECK_FILE" ]]; then
  echo "✗ Deck not found: $DECK_FILE" >&2
  echo "  Expected layout: Projects/<slug>/index.tsx" >&2
  exit 1
fi

# ─── Record baseline cursor + touch ───────────────────────────────────────────
BASELINE=$(wc -l < "$LOG_FILE" | tr -d ' ')
touch "$DECK_FILE"
sleep 1

# ─── Force a transform attempt via /@fs/ ──────────────────────────────────────
# Vite serves any allow-listed file path via /@fs/<absolute-path>. Curling
# it triggers the full transform pipeline (Babel + plugins). On success
# Vite returns 200 with the transformed JS module; on a parse/transform
# error it returns 500 with the failure embedded in the response body.
ENCODED_PATH=$(printf '%s' "$DECK_FILE" | sed 's/ /%20/g')
RESP_FILE="$(mktemp -t da2-smoke-resp.XXXXXX)"
trap 'rm -f "$RESP_FILE"' EXIT

HTTP_STATUS=$(curl -s -o "$RESP_FILE" -w "%{http_code}" \
  "${DEV_HOST}/@fs${ENCODED_PATH}" || echo "000")

if [[ "$HTTP_STATUS" == "000" ]]; then
  echo "✗ render smoke-check FAILED ($SLUG · could not reach $DEV_HOST)" >&2
  echo "  Is the dev server actually up? Check ./scripts/da2-dev.sh output." >&2
  exit 1
fi

if [[ "$HTTP_STATUS" == "500" ]]; then
  echo "✗ render smoke-check FAILED ($SLUG · Vite transform error)" >&2
  echo "  HTTP 500 on $DEV_HOST/@fs/...$SLUG/index.tsx" >&2
  echo "  Response excerpt:" >&2
  # Trim out the HTML wrapper; pull the embedded JSON error message if present.
  if grep -q 'const error = ' "$RESP_FILE"; then
    grep 'const error = ' "$RESP_FILE" \
      | sed 's/.*const error = //;s/;.*$//' \
      | head -c 1200 \
      | sed 's/^/    /' >&2
  else
    head -c 1200 "$RESP_FILE" | sed 's/^/    /' >&2
  fi
  echo >&2
  exit 1
fi

if [[ "$HTTP_STATUS" != "200" ]]; then
  echo "✗ render smoke-check FAILED ($SLUG · unexpected HTTP $HTTP_STATUS)" >&2
  head -c 600 "$RESP_FILE" | sed 's/^/    /' >&2
  exit 1
fi

# ─── Let any HMR / runtime log lines flush ────────────────────────────────────
sleep 2

# ─── Tail from baseline, grep for errors ──────────────────────────────────────
TAIL_START=$((BASELINE + 1))
NEW_LINES=$(tail -n "+$TAIL_START" "$LOG_FILE")
ERROR_PATTERNS='error|transform error|\[plugin:vite\]|ReferenceError|SyntaxError|Pre-transform error|Failed to compile|Cannot find'
HITS=$(printf '%s\n' "$NEW_LINES" | grep -iE "$ERROR_PATTERNS" || true)

if [[ -n "$HITS" ]]; then
  echo "✗ render smoke-check FAILED ($SLUG · errors in dev-server log)" >&2
  echo "  Log excerpt:" >&2
  echo "$HITS" | head -20 | sed 's/^/    /' >&2
  exit 1
fi

NEW_LINE_COUNT=$(printf '%s\n' "$NEW_LINES" | wc -l | tr -d ' ')
echo "✓ render smoke-check clean ($SLUG · HTTP 200 · $NEW_LINE_COUNT new log line(s))"
exit 0
