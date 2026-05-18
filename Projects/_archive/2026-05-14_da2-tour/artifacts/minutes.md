---
memo: ../memo.md
memo_version: 1
generated: 2026-05-14
status: draft
meeting_type: unmapped
attendees: []
---

> **Note:** This memo is project context, not a meeting record. The
> minutes below interpret the memo content as if it had been discussed
> and decided in a meeting. Treat as a scaffold for a future meeting,
> or edit liberally to match a meeting that actually happened.

## Meeting

- **Date:** ?
- **Attendees:** ?
- **Subject:** Deck Arsenal 2 — what it is and how to use it

## Decisions

- Adopt open-slide as the rendering core for Deck Arsenal 2; vendor at `engine/` pinned to `@open-slide/core@1.3.0`.
- Preserve DA1's five-stage gated workflow (order → memo → storyboard → compose → finalize) end-to-end in DA2.
- Reframe the memo as universal project context — the same document feeds the deck, meeting minutes, and the one-pager.
- Introduce `recipes/` as the new reusability primitive for storyboard structures (separate from themes, which govern visuals).
- Replace DA1's chat-driven `/deck-edit` with open-slide's click-to-comment inspector loop plus `apply-comments`.
- Adopt portable relative paths throughout DA2 so the directory can be moved without breaking internal references.

## Action items

- [ ] ? — Decide whether `pitch-classic` is the only "selling" recipe or whether a separate `sales-discovery` shape is warranted — ?
- [ ] ? — After Phase 5, evaluate whether the structured approval phrase (`approve memo` / `approve storyboard`) is too strict in practice — ?
- [ ] ? — After Phase 5, confirm whether the universal memo actually works for both minutes and one-pager artifacts, or whether each artifact needs its own context shape — ?
- [ ] ? — Land the Taikyoku theme and brand assets under `themes/` once the Phase 1–5 workflow is functional end-to-end — ?

## Parking lot

- Vertical/horizontal slide nesting (slidev-style). Open-slide's flat-array `Page[]` model doesn't support it natively; parked indefinitely.
- DA1 → DA2 deck migration. Past finalized decks stay in DA1 by design.
- Sample workflows for non-deck artifacts beyond minutes and one-pager (e.g., Slack drafts, internal blurbs).

## Sources cited

- [README.md](../../README.md)
- [CLAUDE.md](../../CLAUDE.md)
- [ENGINE_INVESTIGATION.md](../../ENGINE_INVESTIGATION.md)
