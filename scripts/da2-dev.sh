#!/usr/bin/env bash
# da2-dev.sh — wrap `pnpm dev` with a tee'd log file (Stream 3 / P3.a).
#
# Usage:
#   ./scripts/da2-dev.sh
#
# What it does:
#   1. cd's to engine/
#   2. runs `pnpm dev` with stdout+stderr tee'd to engine/.dev-server.log
#   3. forwards pnpm's exit code (via `set -o pipefail`)
#
# Why:
#   The render smoke-check (scripts/da2-smoke-check.sh) reads this log
#   to detect transform / runtime errors after an HMR-provoking edit.
#   Use this script INSTEAD OF bare `pnpm dev` whenever you plan to run
#   the smoke-check; otherwise plain `pnpm dev` still works for normal
#   editing.
#
# The log file is sandbox-local (engine/.dev-server.log is gitignored)
# and is overwritten on every fresh start (no rotation — last run only).
#
# Resolves its own path so DA2 can be moved anywhere on disk.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DA2_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENGINE_DIR="$DA2_ROOT/engine"
LOG_FILE="$ENGINE_DIR/.dev-server.log"

if [[ ! -d "$ENGINE_DIR" ]]; then
  echo "✗ engine/ not found at $ENGINE_DIR" >&2
  exit 1
fi

echo "▶ DA2 dev — logging to $LOG_FILE"
echo "  (Smoke-check (scripts/da2-smoke-check.sh) tails this file.)"
echo

cd "$ENGINE_DIR"
pnpm dev 2>&1 | tee "$LOG_FILE"
