---
order: ./order.md
version: 1
status: approved
project_slug: da2-tour
deadline: flexible

audience:
  primary: "future-me and any collaborator brought into this directory"
  reading_for: "understand what changed from DA1, where files live, and how to drive the pipeline"

recipients: []     # internal doc, no distribution list for derived artifacts

sources:
  - "../README.md"
  - "../CLAUDE.md"
  - "../ENGINE_INVESTIGATION.md"

deck:
  preferred_recipe: explainer
  preferred_theme: null
  density_override: null
---

# Memo — Deck Arsenal 2 tour

## One-line pitch
Deck Arsenal 2 keeps DA1's five-stage gated pipeline but swaps the
rendering engine to open-slide — getting React expressiveness, an
in-browser inspector loop, and a memo that feeds non-deck artifacts.

## Core thesis
The workflow was right; the rendering substrate wasn't. DA1's discipline
(order → memo → storyboard → compose → finalize, each gated) survives in
DA2 intact. Open-slide replaces the vendored HTML pattern stitcher with
a React-per-page substrate that supports inspector-driven editing and
proper themes. The memo is reframed as universal project context so the
same document can feed minutes and one-pagers, not only decks.

## Key points

1. **Workflow continuity.** Five stages, explicit user approval between
   each. Filesystem is the state machine — file presence equals stage
   progress, no metadata store.

2. **Engine swap.** open-slide is vendored at `engine/` (pinned to
   `@open-slide/core@1.3.0`). The framework is untouched except for one
   config file (`open-slide.config.ts`) that redirects slide discovery
   to DA2's `Projects/` tree.

3. **Universal memo.** A single `memo.md` per project — same document
   feeds the deck (via `compose-deck`), meeting minutes (via
   `memo-to-minutes`), and a distributable one-pager (via
   `memo-to-one-pager`). Memo stores project context; artifacts apply
   transformations.

4. **Reusable storyboards via recipes.** Generic beat sequences live at
   `recipes/<name>.yaml`. A project's `storyboard.yaml` references a
   recipe plus the per-deck content. Reuse a structure across projects
   with different content.

5. **Inspector loop replaces /deck-edit.** Editing happens in the
   browser via open-slide's click-to-comment inspector, then
   `apply-comments` sweeps the markers. No chat-driven `/deck-edit`
   equivalent — the inspector is more precise.

6. **Portability.** Every internal path inside DA2 is relative. Move the
   folder anywhere on disk without breaking. References to DA1 live in
   prose, not as machine-read paths.

## Tone
Sharp, concrete. Reference shape: a good engineering README. Avoid
marketing voice ("revolutionary", "powerful"), sentences that start with
"Imagine", and any framing that disparages DA1 — DA2 is a successor, not
a replacement built on resentment of the predecessor.

## Out of scope
- The Taikyoku theme and brand assets (lands after Phase 5).
- Vertical/horizontal slide nesting (parked indefinitely; open-slide's
  flat-array model doesn't support it natively).
- DA1 → DA2 deck migration (past finalized decks stay in DA1).
- Sample workflows for non-deck artifacts (minutes/one-pager skills ship
  in Phase 5).

## Open questions
- [ ] Should `pitch-classic` be the only "selling" recipe, or do we want
      a separate `sales-discovery` shape?
- [ ] How strict is the approval gate? Currently "type the exact phrase";
      could be relaxed to fuzzy match if it becomes annoying in practice.
- [ ] Does the universal memo actually work for both minutes and
      one-pagers, or do those artifacts need their own context shapes?
      (Answered after Phase 5 ships.)
