#!/usr/bin/env bash
# sync-engine.sh — upgrade or pin the vendored open-slide engine.
#
# Usage:
#   ./scripts/sync-engine.sh                        # show current pin and available tags
#   ./scripts/sync-engine.sh @open-slide/core@1.4.0 # upgrade to a specific tag
#
# What it does:
#   1. Clones open-slide fresh into a temp directory
#   2. Checks out the requested tag
#   3. Drops the .git directory
#   4. Preserves the DA2 override at engine/apps/demo/open-slide.config.ts
#   5. Swaps the new tree in for engine/
#   6. Writes engine/VERSION with the new tag + commit
#
# The script does NOT install dependencies. After it succeeds, you must:
#   cd engine/apps/demo && pnpm install
#
# All paths are relative so DA2 can be moved anywhere on disk.

set -euo pipefail

REPO_URL="https://github.com/1weiho/open-slide.git"

# Resolve DA2 root regardless of where the script is invoked from.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DA2_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENGINE_DIR="$DA2_ROOT/engine"
CONFIG_OVERRIDE="$ENGINE_DIR/apps/demo/open-slide.config.ts"

# ─── Show current state if invoked with no args ───────────────────────────────
if [[ $# -eq 0 ]]; then
  if [[ -f "$ENGINE_DIR/VERSION" ]]; then
    echo "Current pin:"
    cat "$ENGINE_DIR/VERSION"
  else
    echo "No engine pinned yet. engine/VERSION not found."
  fi
  echo
  echo "Recent tags (from remote):"
  git ls-remote --tags --sort=-version:refname "$REPO_URL" \
    | awk '{print $2}' | sed 's@refs/tags/@@' | grep -v '\^{}$' | head -10
  echo
  echo "To upgrade: $0 <tag>"
  echo "Example:    $0 @open-slide/core@1.4.0"
  exit 0
fi

NEW_TAG="$1"

# ─── Sanity checks ────────────────────────────────────────────────────────────
if [[ ! -d "$ENGINE_DIR" ]]; then
  echo "ERROR: engine/ not found at $ENGINE_DIR" >&2
  exit 1
fi

if [[ ! -f "$CONFIG_OVERRIDE" ]]; then
  echo "ERROR: missing config override at $CONFIG_OVERRIDE" >&2
  echo "Refusing to swap — your slidesDir/themesDir overrides would be lost." >&2
  exit 1
fi

# ─── Stage new engine in a temp dir ───────────────────────────────────────────
TMP_ROOT="$(mktemp -d)"
STAGED="$TMP_ROOT/staged"
trap 'rm -rf "$TMP_ROOT"' EXIT

echo "Cloning open-slide to $STAGED ..."
git clone --quiet "$REPO_URL" "$STAGED"

echo "Checking out $NEW_TAG ..."
cd "$STAGED"
if ! git fetch --tags --quiet 2>/dev/null; then
  echo "WARN: could not fetch tags; the tag may still resolve from the initial clone."
fi
git checkout --quiet "$NEW_TAG"
NEW_SHA="$(git rev-parse HEAD)"
NEW_DATE="$(git log -1 --format=%cs)"
cd "$DA2_ROOT"
rm -rf "$STAGED/.git"

# ─── Preserve the override ────────────────────────────────────────────────────
echo "Preserving DA2 override at engine/apps/demo/open-slide.config.ts ..."
cp "$CONFIG_OVERRIDE" "$TMP_ROOT/open-slide.config.ts.preserved"

# ─── Swap ─────────────────────────────────────────────────────────────────────
OLD_BACKUP="$DA2_ROOT/engine.old.$(date +%Y%m%d-%H%M%S)"
echo "Moving current engine aside to $OLD_BACKUP ..."
mv "$ENGINE_DIR" "$OLD_BACKUP"

echo "Installing new engine into engine/ ..."
mv "$STAGED" "$ENGINE_DIR"

echo "Restoring DA2 override ..."
cp "$TMP_ROOT/open-slide.config.ts.preserved" "$CONFIG_OVERRIDE"

# ─── Write VERSION ────────────────────────────────────────────────────────────
cat > "$ENGINE_DIR/VERSION" <<EOF
tag:    $NEW_TAG
commit: $NEW_SHA
date:   $NEW_DATE
source: $REPO_URL

This file pins the vendored engine. Do not edit by hand. Update via
scripts/sync-engine.sh after deliberately choosing a new tag from
https://github.com/1weiho/open-slide/tags
EOF

echo
echo "✓ Engine upgraded to $NEW_TAG (commit $NEW_SHA, $NEW_DATE)"
echo "✓ Old engine preserved at $(basename "$OLD_BACKUP")"
echo "✓ Override restored"
echo
echo "Next: cd engine/apps/demo && pnpm install"
echo
echo "If anything looks wrong, restore the previous engine with:"
echo "  rm -rf engine && mv $(basename "$OLD_BACKUP") engine"
