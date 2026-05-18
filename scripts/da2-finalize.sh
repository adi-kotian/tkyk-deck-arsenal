#!/usr/bin/env bash
# da2-finalize.sh — move browser-downloaded HTML/PDF into a project's exports/.
#
# Usage:
#   ./scripts/da2-finalize.sh <slug>
#
# Why open-slide's PDF doesn't share the slug's name:
#   - HTML export: open-slide calls downloadBlob(<slideId>.html) — slug is the filename.
#   - PDF export: open-slide calls window.print() — the browser uses
#     document.title as the filename. document.title comes from meta.title
#     in the slide, NOT the slideId. So PDF lands as "<deck title>.pdf".
#
# The script handles both. It looks in ~/Downloads in this order:
#   1. <slug>*.html / <slug>*.zip / <slug>*.pdf
#   2. <title>*.pdf where <title> is read from Projects/<slug>/order.md
#   3. (Fallback) newest PDF in Downloads modified after index.tsx — flagged
#      to the user so they can spot a mismatch.

set -euo pipefail

SLUG="${1:-}"
if [[ -z "$SLUG" ]]; then
  echo "Usage: $(basename "$0") <slug>" >&2
  echo "Example: $(basename "$0") 2026-05-19_taikyoku-master-reference" >&2
  exit 64
fi

# ─── Resolve paths (relative to script — DA2 is portable) ─────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DA2_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJ_DIR="$DA2_ROOT/Projects/$SLUG"
EXPORTS_DIR="$PROJ_DIR/exports"
DOWNLOADS="$HOME/Downloads"

# ─── Sanity ───────────────────────────────────────────────────────────────────
if [[ ! -d "$PROJ_DIR" ]]; then
  echo "✗ Project not found: $PROJ_DIR" >&2
  exit 1
fi

if [[ ! -f "$PROJ_DIR/index.tsx" ]]; then
  echo "✗ No index.tsx in $PROJ_DIR — compose the deck first." >&2
  exit 1
fi

# ─── Advisory: per-deck font subsetting (Phase 9) ─────────────────────────────
# If the deck imports the shared 14MB theme HomuraM (not a local subset),
# remind the user to subset before exporting. Non-fatal — finalize only
# moves files; subsetting must happen before the browser export.
if grep -qE "themes/taikyoku/assets/fonts/HomuraM" "$PROJ_DIR/index.tsx" 2>/dev/null \
   && [[ ! -f "$PROJ_DIR/assets/fonts/HomuraM-Medium.woff2" ]]; then
  echo "⚠ This deck imports the shared 14MB theme HomuraM fonts." >&2
  echo "  Run ./scripts/da2-subset-fonts.sh $SLUG and repoint imports to" >&2
  echo "  './assets/fonts/HomuraM-*.woff2' BEFORE the browser export (~97% smaller)." >&2
fi

if [[ ! -d "$DOWNLOADS" ]]; then
  echo "✗ ~/Downloads not found. Expected $DOWNLOADS to exist." >&2
  exit 1
fi

mkdir -p "$EXPORTS_DIR"

# ─── Read the deck title from order.md frontmatter ────────────────────────────
# Title is used as the PDF's filename by the browser (because open-slide's
# PDF export inherits document.title).
TITLE=""
if [[ -f "$PROJ_DIR/order.md" ]]; then
  TITLE=$(python3 - "$PROJ_DIR/order.md" <<'PY'
import re, sys, pathlib
try:
    text = pathlib.Path(sys.argv[1]).read_text()
    m = re.search(r'^---\s*\n(.*?)\n---', text, re.DOTALL | re.MULTILINE)
    if not m:
        sys.exit(0)
    fm = m.group(1)
    tm = re.search(r'^title:\s*[\"\']?(.+?)[\"\']?\s*$', fm, re.MULTILINE)
    if tm:
        print(tm.group(1).strip())
except Exception:
    pass
PY
)
fi

# ─── Helper: find most-recent file matching a glob in Downloads ───────────────
find_latest() {
  local pattern="$1"
  find "$DOWNLOADS" -maxdepth 1 -type f -name "$pattern" -print0 2>/dev/null \
    | xargs -0 ls -t 2>/dev/null \
    | head -n 1
}

# ─── Locate sources ───────────────────────────────────────────────────────────
HTML_SRC="$(find_latest "${SLUG}*.html")"
ZIP_SRC="$(find_latest "${SLUG}*.zip")"

# PDF: try slug pattern first, then title pattern, then newest-recent fallback
PDF_SRC="$(find_latest "${SLUG}*.pdf")"
PDF_VIA="slug"
if [[ -z "$PDF_SRC" && -n "$TITLE" ]]; then
  PDF_SRC="$(find_latest "${TITLE}*.pdf")"
  [[ -n "$PDF_SRC" ]] && PDF_VIA="title ('${TITLE}')"
fi
if [[ -z "$PDF_SRC" ]]; then
  # Fallback: newest PDF in Downloads modified after index.tsx
  IDX_MTIME=$(stat -f '%m' "$PROJ_DIR/index.tsx" 2>/dev/null || stat -c '%Y' "$PROJ_DIR/index.tsx" 2>/dev/null || echo 0)
  PDF_SRC=$(find "$DOWNLOADS" -maxdepth 1 -type f -name "*.pdf" -newer "$PROJ_DIR/index.tsx" 2>/dev/null \
    | xargs -I{} ls -t {} 2>/dev/null \
    | head -n 1)
  [[ -n "$PDF_SRC" ]] && PDF_VIA="newest-since-compose ($(basename "$PDF_SRC"))"
fi

# ─── Move what we found ───────────────────────────────────────────────────────
MOVED=()
WARNINGS=()

if [[ -n "$HTML_SRC" && -f "$HTML_SRC" ]]; then
  mv "$HTML_SRC" "$EXPORTS_DIR/deck.html"
  MOVED+=("deck.html  (from $(basename "$HTML_SRC"))")
elif [[ -n "$ZIP_SRC" && -f "$ZIP_SRC" ]]; then
  mv "$ZIP_SRC" "$EXPORTS_DIR/deck.zip"
  MOVED+=("deck.zip  (from $(basename "$ZIP_SRC"))")
  WARNINGS+=("HTML came as a .zip — deck has assets bundled.")
else
  WARNINGS+=("No HTML found in ~/Downloads matching '${SLUG}*.html' or '${SLUG}*.zip'. Click 'Download HTML' in the editor and re-run.")
fi

if [[ -n "$PDF_SRC" && -f "$PDF_SRC" ]]; then
  mv "$PDF_SRC" "$EXPORTS_DIR/deck.pdf"
  MOVED+=("deck.pdf  (from $(basename "$PDF_SRC"))  [matched via $PDF_VIA]")
  if [[ "$PDF_VIA" == newest-since-compose* ]]; then
    WARNINGS+=("PDF was matched by mtime fallback, not by slug or title. Verify the right file moved — if not, restore from your Trash and re-run with a renamed PDF.")
  fi
else
  WARNINGS+=("No PDF found in ~/Downloads. Looked for: '${SLUG}*.pdf'$( [[ -n "$TITLE" ]] && echo ", '${TITLE}*.pdf'" ), and newest *.pdf since index.tsx. Click 'Download PDF' (Save as PDF in print dialog) and re-run.")
fi

# ─── Update log ───────────────────────────────────────────────────────────────
if [[ ${#MOVED[@]} -gt 0 ]]; then
  TS="$(date +'%Y-%m-%d %H:%M')"
  {
    echo "$TS — finalized via /da2-finalize"
    for entry in "${MOVED[@]}"; do
      echo "  → $entry"
    done
  } >> "$PROJ_DIR/log.md"
fi

# ─── Report ───────────────────────────────────────────────────────────────────
echo "── /da2-finalize summary ──"
if [[ ${#MOVED[@]} -gt 0 ]]; then
  echo "Moved into $EXPORTS_DIR/:"
  for entry in "${MOVED[@]}"; do
    echo "  ✓ $entry"
  done
fi
if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo
  echo "Warnings:"
  for w in "${WARNINGS[@]}"; do
    echo "  ⚠ $w"
  done
fi

if [[ ${#MOVED[@]} -eq 0 ]]; then
  exit 1
fi
