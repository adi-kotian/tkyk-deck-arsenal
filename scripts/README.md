# Scripts

Operational shell scripts for DA2.

| Script | Phase | Purpose |
| --- | --- | --- |
| `sync-engine.sh` | 1 | Upgrade vendored open-slide to a new pinned tag. |
| `da2-open.sh` | 3 | Check dev server on port 5173; open `/s/<slug>` in browser. |
| `da2-finalize.sh` | 4 | Move browser-downloaded HTML+PDF from `~/Downloads` to `Projects/<slug>/exports/`. |
| `da2-subset-fonts.sh` | 9 | Scan a deck for used codepoints + safety base; subset the three theme HomuraM woff2 into `Projects/<slug>/assets/fonts/` (~97% reduction proven on the bilingual reference deck). |
| `da2-dev.sh` | Stream 3 | Wrap `pnpm dev` with stdout+stderr tee'd to `engine/.dev-server.log`. Use this instead of bare `pnpm dev` when you plan to run the smoke-check. |
| `da2-smoke-check.sh` | Stream 3 | P3.a render smoke-check. Touches `Projects/<slug>/index.tsx` to provoke HMR, sleeps 3 s, greps the dev-server log tail for transform / runtime errors. Exit 0 on clean, exit 1 with the offending lines on failure. Called by the `apply-comments-triage` skill after any `fix:` sweep. |
| `da2-cleanup-commits.sh` | (one-off) | Apply the 2026-05-19 Cowork flatten as 8 granular commits. Safe to re-run; each step no-ops if already committed. |

`da2-new.sh` doesn't exist as a script — `/da2-new` is a Claude Code
slash command (at `.claude/commands/da2-new.md`) that orchestrates the
flow directly. No shell wrapper needed because the orchestration is
agent-shaped, not bash-shaped.

All scripts resolve their own path relative to themselves, so they work
regardless of where DA2 lives on disk.
