# Deck Arsenal 2

A deck production line built on
[open-slide](https://github.com/1weiho/open-slide).

Turns a production order into an editable, in-browser deck through
five stages — **order → memo → storyboard → compose → finalize** —
and emits minutes and one-pagers from the same memo as side
artifacts.

DA1 (the swiss-modern HTML pattern-stitching pipeline) lives parallel
and untouched. DA2 is the React-substrate replacement.

## Where to look

- `HANDOFF.md` — current state-of-the-work and live work streams.
  **Read this first** when picking up DA2 in a fresh session.
- `CLAUDE.md` — the operator manual: directory map, workflow, rules,
  phase ladder, slash commands, subagents, skills.
- `themes/taikyoku.md` — the Taikyoku theme contract (palette · type ·
  motion · tokens · 19-component index · voice · dark variant).
- `themes/taikyoku/COMPOSITION.md` — how compose-deck assembles decks
  from the component library (slide anatomy + named layouts +
  density floor).
- `themes/taikyoku/REFINEMENT.md` — the decision log (current rules
  on top, superseded history in the appendix).

## Status

Phases 1–11 + dark-mode token indirection are done. The pipeline runs
end-to-end on real decks (most recently the master-reference
catalogue, `Projects/2026-05-19_taikyoku-master-reference/`). Open
work is summarised in `HANDOFF.md` and listed under "Future" in
`CLAUDE.md`'s phase ladder.

## First-time setup

```bash
cd "Deck Arsenal 2/engine"
pnpm install     # first time only
pnpm dev         # turbo builds core + cli, then runs the demo on :5173
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Open the live deck: `./scripts/da2-open.sh
2026-05-19_taikyoku-master-reference`.

## Folder layout

See `CLAUDE.md` for the full directory map and the rules. One thing
worth highlighting up front: archived/throwaway decks live under
`Projects/_archive/<slug>/` and are off the dev server (open-slide
globs `Projects/*/index.tsx` one level deep). The live deck sits at
`Projects/<slug>/`.

## Portability

DA2 uses relative paths exclusively. The folder can be moved anywhere
on disk without breaking. References to DA1 are intentionally not
hard-coded; if you need to point at something in DA1, do it in prose,
not in a path.

## Engine pin

`engine/` is pinned to a specific open-slide release. The pin lives at
`engine/VERSION`. Upgrade:

```bash
./scripts/sync-engine.sh @open-slide/core@<new-tag>
```

The script clones fresh, checks out the tag, and swaps in while
preserving `engine/apps/demo/open-slide.config.ts` (the DA2 override).

Current pin: `@open-slide/core@1.3.0` (commit `409ed32`, 2026-05-13).

## Notable design notes

- `briefs/engine-investigation.md` — why DA2 puts slides under
  `Projects/` and themes under `themes/`, not inside the engine.
- `briefs/taikyoku-extensions.md` — the Phase 7–10 brief that produced
  the production-grade Taikyoku system.
