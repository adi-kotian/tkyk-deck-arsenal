# Scripts

Operational shell scripts for DA2.

| Script | Phase | Purpose |
| --- | --- | --- |
| `sync-engine.sh` | 1 | Upgrade vendored open-slide to a new pinned tag. |
| `da2-open.sh` | 3 | Check dev server on port 5173; open `/s/<slug>` in browser. |
| `da2-finalize.sh` | 4 | Move browser-downloaded HTML+PDF from `~/Downloads` to `Projects/<slug>/exports/`. |

`da2-new.sh` doesn't exist as a script — `/da2-new` is a Claude Code
slash command (at `.claude/commands/da2-new.md`) that orchestrates the
flow directly. No shell wrapper needed because the orchestration is
agent-shaped, not bash-shaped.

All scripts resolve their own path relative to themselves, so they work
regardless of where DA2 lives on disk.
