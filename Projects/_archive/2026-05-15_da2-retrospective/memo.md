---
order: ./order.md
version: 1
status: approved
project_slug: da2-retrospective
deadline: flexible

audience:
  primary: "future-me and any collaborator who joins after the build"
  reading_for: "understand DA2's substrate, what survived from DA1, what shipped per phase, and what's deferred"

recipients: []

sources:
  - "../CLAUDE.md"
  - "../README.md"
  - "../ENGINE_INVESTIGATION.md"

deck:
  preferred_recipe: executive-pitch
  preferred_theme: taikyoku
  density_override: null
---

# Memo — DA2 build retrospective

## One-line pitch
Six phases turned DA1's pattern-stitcher into a React-substrate
pipeline with the same workflow, an in-browser inspector for editing,
a universal memo that feeds non-deck artifacts, and a restrained
Taikyoku theme that proves the substrate can carry brand identity.

## Core thesis
The workflow was right; the substrate wasn't. By vendoring open-slide
as the engine, redirecting its discovery to `Projects/<slug>/`, and
keeping every gate (order → memo → storyboard → compose → finalize)
exactly as DA1 had them, DA2 gained React expressiveness and the
inspector loop without trading away the discipline that made DA1
shippable. The Taikyoku theme is the proof — same workflow renders a
restrained editorial deck just as cleanly as it rendered the default
fallback.

## Key points

1. **Workflow continuity.** Five gated stages, explicit approval
   between each, filesystem-as-state-machine. Identical to DA1.

2. **Engine vendored, not modified.** `engine/` holds open-slide pinned
   at `@open-slide/core@1.3.0`. The only file we change inside it is
   `apps/demo/open-slide.config.ts` to redirect slidesDir to
   `Projects/`. Upgrades go through `scripts/sync-engine.sh`.

3. **Universal memo.** A single `memo.md` per project feeds the deck
   (via `compose-deck`), meeting minutes (`memo-to-minutes`), and a
   distributable one-pager (`memo-to-one-pager`). Three artifacts from
   one canonical context.

4. **Recipes as reusable structures.** `recipes/<name>.yaml` defines a
   beat sequence. Three ship: `pitch-classic`, `explainer`,
   `executive-pitch`. The storyboard references a recipe; the
   composer instantiates it.

5. **Inspector loop replaces chat editing.** Editing happens in the
   browser via open-slide's click-to-comment inspector; the
   `apply-comments` skill sweeps markers. DA1's `/deck-edit` is
   retired.

6. **Theme as a markdown contract.** `themes/<id>.md` follows
   open-slide's format: palette, type scale, layout rules, fixed
   components with inline tsx, motion vocabulary. Taikyoku is a
   synthesis — Aurora's structural restraint, deck-arsenal motion
   trimmed by half, brand palette only.

## Tone
Sharp, retrospective, honest. Reference shape: an engineering
retrospective post-mortem in a magazine. Avoid: victory lap framing,
minimising what we deferred.

## Out of scope
- The kanji seal / 大局 wordmark / status pill — deferred to a future
  "Taikyoku Full" theme.
- Video backgrounds — brand brief defers to v2.
- Vertical/horizontal slide nesting — parked; open-slide doesn't
  support it natively.
- Dark theme variant of Taikyoku — deferred to v2.
- DA1 → DA2 migration of past finalized decks. DA1 stays where it is.

## Open questions
- [ ] Does the universal memo hold up when run against a real meeting
      memo, or do minutes need their own context shape? (To be
      answered after running it on a real meeting.)
- [ ] Is the structured-approval phrase strict enough in practice, or
      should it relax to fuzzy match?
- [ ] When does it make sense to add a "Taikyoku Full" theme with the
      brand-brief's full vocabulary (kanji, wordmark, pill, funnel,
      red/magenta accents)?
