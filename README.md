# Deck Arsenal 2

A deck production line built on [open-slide](https://github.com/1weiho/open-slide).

Turns a production order into an editable, in-browser deck through five
gated stages — order → memo → storyboard → compose → finalize — and
produces minutes and one-pagers from the same memo as side artifacts.

DA1 (the swiss-modern HTML pattern-stitching pipeline) lives parallel and
untouched. DA2 is the React-substrate replacement currently being built
out in phases.

## Status

Phase 1 of 5 shipped. The directory skeleton is in place and the engine is
vendored. The workflow skills (memo, storyboard, compose-deck) are not
written yet — they ship in Phases 2–5. See `CLAUDE.md` for the phase list
and current state.

You can already:

- Run the engine: `cd engine && pnpm install && pnpm dev`.
- Drop a slide into a project folder manually as `Projects/<slug>/index.tsx`
  and see it render at `http://localhost:5173/s/<slug>`.
- Read `ENGINE_INVESTIGATION.md` for how the engine was wired up.

You cannot yet:

- Run `/da2-new` or `/da2-finalize` — slash commands don't exist.
- Have the memo / storyboard / compose subagents do anything — they don't
  exist.
- Use a recipe — none have been written.
- Use the Taikyoku theme — same.

## First-time setup

```bash
cd "Deck Arsenal 2/engine"
pnpm install     # first time only
pnpm dev         # turbo builds core + cli, then runs the demo on :5173
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Folder layout

See `CLAUDE.md` — the operator manual has the full directory map and the
rule list.

## Portability

DA2 uses relative paths exclusively for its internal references — the
folder can be moved anywhere on disk (sibling of DA1, into another tree,
elsewhere) without breaking. References to DA1 are intentionally not
hard-coded; if you want to reach into DA1 from a DA2 file, use prose, not
a path.

## Engine pin

`engine/` is pinned to a specific open-slide release. The pin lives in
`engine/VERSION`. To upgrade, run `./scripts/sync-engine.sh <new-tag>` —
the script clones fresh, checks out the requested tag, and swaps in while
preserving the `open-slide.config.ts` override.

Current pin: `@open-slide/core@1.3.0` (commit `409ed32`, 2026-05-13).
