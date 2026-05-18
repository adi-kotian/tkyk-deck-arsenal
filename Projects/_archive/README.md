# Projects/_archive — historical decks

Decks that were validation spikes, reference builds, or one-off tours
during Phases 2–11. **They are off the dev server's discovery path** —
open-slide's `slidesDir: '../../../Projects'` only globs
`Projects/*/index.tsx` one level deep, so anything under
`Projects/_archive/<slug>/` is not served at `/s/<slug>`. Master-
reference (one level up) is the sole live deck.

## What lives here

| Slug | Why it existed | Findings live in |
| --- | --- | --- |
| `2026-05-14_smoke` | Phase 1 smoke test of the pipeline scaffold. | `CLAUDE.md` (former phase status) |
| `2026-05-14_da2-tour` | Phase 2 reference: order → memo → storyboard → compose on the default-fallback theme. | `CLAUDE.md` (former Phase 2–3 status) |
| `2026-05-15_da2-retrospective` | Phase 6.3 reference: same content as `da2-tour` but rendered against the synthesis-baseline Taikyoku theme. Frozen — uses Archivo caps + sentence-case headlines (pre-Phase-7). | `themes/taikyoku/REFINEMENT.md` Phase 6.1 entry |
| `2026-05-15_sleep-hygiene` | An ad-hoc spike from the same date. | n/a |
| `2026-05-18_taikyoku-bilingual-ref` | Phase 8 Japanese-rendering reference. 5 pages → 10 pages after the mono-language reshuffle. **Carries 367 KB of subset HomuraM woff2.** | `REFINEMENT.md` Phase 8 |
| `2026-05-18_taikyoku-dark-spike` | Phase 9 increment 3: the dark-variant feasibility spike. Canonical dark palette reference. | `REFINEMENT.md` Phase 9 → Increment 3 |
| `2026-05-18_taikyoku-gallery` | Phase 9 component-library gallery (33 pages, one per component × variant). | `REFINEMENT.md` Phase 9 → Increment 2 |
| `2026-05-19_taikyoku-darkmode-check` | Validation deck for the dark-mode token-indirection refactor. | `REFINEMENT.md` → "Future phase — Dark-mode token indirection" |
| `2026-05-19_taikyoku-seed-pack` | Phase 10 integration capstone: a real semi-fictional Taikyoku deck through the full pipeline. | `REFINEMENT.md` → Phase 10 |

## Why archive instead of delete

Every deck above embodies a decision the team made. The decisions are
all recorded in `themes/taikyoku/REFINEMENT.md`, but the rendered
artefact is the cheapest possible way to *see* what each decision
produced. Keep them on disk; keep them off the dev server.

## How to resurrect one

Move it back up:

```bash
mv "Projects/_archive/<slug>" "Projects/<slug>"
```

Open-slide will pick it up on next page load. Reverse the move when
done.

## Don't add new work here

`Projects/_archive/` is read-only by convention. New projects start at
`Projects/<YYYY-MM-DD_slug>/`. If a live deck becomes throwaway, move
it down here and update this README.
