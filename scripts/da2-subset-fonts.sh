#!/usr/bin/env bash
# da2-subset-fonts.sh — per-deck HomuraM subsetter (Phase 9).
#
# Usage:
#   ./scripts/da2-subset-fonts.sh <slug>
#
# What it does:
#   1. Scans every *.tsx under Projects/<slug>/ (excluding assets/) for the
#      unique Unicode codepoints the deck actually renders.
#   2. Adds a small safety base (ASCII printable + common JP punctuation /
#      kana) so headings, dates and counters never lose a glyph.
#   3. Subsets the three full theme woff2
#      (themes/taikyoku/assets/fonts/HomuraM-{Medium,SemiBold,Display}.woff2,
#      the source-of-truth, ~5MB each) down to just those glyphs and writes
#      them into Projects/<slug>/assets/fonts/ under the SAME filenames.
#   4. Reports the per-font + total size reduction.
#
# The deck then imports './assets/fonts/HomuraM-*.woff2' (its own subset)
# instead of the shared 14MB theme fonts. Truly rare glyphs not in the deck
# degrade to Noto Serif JP (the theme's documented fallback). Re-run after
# editing deck text. The theme fonts are never modified.

set -euo pipefail

SLUG="${1:-}"
if [[ -z "$SLUG" ]]; then
  echo "Usage: $(basename "$0") <slug>" >&2
  echo "Example: $(basename "$0") 2026-05-18_taikyoku-bilingual-ref" >&2
  exit 64
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DA2_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJ_DIR="$DA2_ROOT/Projects/$SLUG"
SRC_DIR="$DA2_ROOT/themes/taikyoku/assets/fonts"
DEST_DIR="$PROJ_DIR/assets/fonts"

if [[ ! -d "$PROJ_DIR" ]]; then
  echo "✗ Project not found: $PROJ_DIR" >&2
  exit 1
fi
for w in HomuraM-Medium HomuraM-SemiBold HomuraM-Display; do
  if [[ ! -f "$SRC_DIR/$w.woff2" ]]; then
    echo "✗ Source font missing: $SRC_DIR/$w.woff2 (run the Phase 8 conversion first)" >&2
    exit 1
  fi
done

if ! python3 -c "import fontTools.subset" 2>/dev/null; then
  echo "✗ fontTools not available. Install: pip3 install --user fonttools brotli" >&2
  exit 1
fi

mkdir -p "$DEST_DIR"

# ─── Collect the glyph set the deck uses ──────────────────────────────────────
CHARS_FILE="$(mktemp)"
trap 'rm -f "$CHARS_FILE"' EXIT

python3 - "$PROJ_DIR" "$CHARS_FILE" <<'PY'
import sys, pathlib
proj = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2])
chars = set()
for p in proj.rglob("*.tsx"):
    if "assets/" in str(p.relative_to(proj)):   # don't scan generated assets
        continue
    try:
        chars |= set(p.read_text(encoding="utf-8"))
    except Exception:
        pass
# Safety base: ASCII printable + common JP punctuation, kana, the middle dot.
for cp in range(0x20, 0x7F):
    chars.add(chr(cp))
chars |= set("、。「」『』・ー－〜％　／（）：；！？…“”‘’年月日")
for cp in range(0x3040, 0x30FF):   # hiragana + katakana
    chars.add(chr(cp))
chars.discard("\n"); chars.discard("\r"); chars.discard("\t")
out.write_text("".join(sorted(chars)), encoding="utf-8")
print(f"  glyph set: {len(chars)} unique codepoints")
PY

# ─── Subset each weight ───────────────────────────────────────────────────────
human() { # bytes -> human
  awk -v b="$1" 'BEGIN{ s="B K M G"; split(s,u," "); i=1;
    while(b>=1024 && i<4){ b/=1024; i++ } printf "%.1f%s", b, u[i] }'
}

echo "── da2-subset-fonts: $SLUG ──"
TOTAL_SRC=0; TOTAL_DST=0
for w in HomuraM-Medium HomuraM-SemiBold HomuraM-Display; do
  SRC="$SRC_DIR/$w.woff2"; DST="$DEST_DIR/$w.woff2"
  python3 -m fontTools.subset "$SRC" \
    --text-file="$CHARS_FILE" \
    --flavor=woff2 \
    --output-file="$DST" \
    --no-hinting --desubroutinize --name-IDs='' --notdef-outline >/dev/null
  S=$(wc -c < "$SRC"); D=$(wc -c < "$DST")
  TOTAL_SRC=$((TOTAL_SRC+S)); TOTAL_DST=$((TOTAL_DST+D))
  PCT=$(awk -v s="$S" -v d="$D" 'BEGIN{ printf "%.1f", (1-d/s)*100 }')
  printf "  %-18s %8s → %8s  (−%s%%)\n" "$w" "$(human "$S")" "$(human "$D")" "$PCT"
done
PCT=$(awk -v s="$TOTAL_SRC" -v d="$TOTAL_DST" 'BEGIN{ printf "%.1f", (1-d/s)*100 }')
echo "  ────────────────────────────────────────────"
printf "  %-18s %8s → %8s  (−%s%%)\n" "TOTAL" "$(human "$TOTAL_SRC")" "$(human "$TOTAL_DST")" "$PCT"
echo
echo "Subsets written to Projects/$SLUG/assets/fonts/."
echo "Point the deck's @font-face imports at './assets/fonts/HomuraM-*.woff2'."
